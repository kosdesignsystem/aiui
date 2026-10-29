"""Export actual GigaAM with browser-compatible waveform preprocessing and INT8 linear layers."""
import argparse
import hashlib
import json
import math
import os
from pathlib import Path
import subprocess
import sys

MODEL = 'v3_e2e_ctc'
REVISION = '7447938d791c4f3e643386ee22c33777004293a5'


def export(output, cache):
    import torch
    import gigaam
    from torch import nn
    import torch.nn.functional as F
    torch.set_num_threads(4)
    model = gigaam.load_model(MODEL, device='cpu', fp16_encoder=False, download_root=str(cache))
    pre = model.preprocessor
    mel = pre.featurizer[0]
    nfft, hop = pre.n_fft, pre.hop_length

    class WaveformCTC(nn.Module):
        def __init__(self):
            super().__init__()
            self.encoder = model.encoder
            self.head = model.head
            positions = torch.arange(nfft).float()
            frequencies = torch.arange(nfft // 2 + 1).float().unsqueeze(1)
            angle = 2 * math.pi * frequencies * positions / nfft
            window = mel.spectrogram.window
            self.register_buffer('real_filters', (torch.cos(angle) * window).unsqueeze(1))
            self.register_buffer('imag_filters', (-torch.sin(angle) * window).unsqueeze(1))
            self.register_buffer('mel_filters', mel.mel_scale.fb.T.unsqueeze(0))

        def features(self, audio):
            if pre.center:
                audio = F.pad(audio, (nfft // 2, nfft // 2), mode='reflect')
            real = F.conv1d(audio.unsqueeze(1), self.real_filters, stride=hop)
            imag = F.conv1d(audio.unsqueeze(1), self.imag_filters, stride=hop)
            return torch.log(torch.clamp(self.mel_filters @ (real * real + imag * imag), 1e-9, 1e9))

        def forward(self, audio):
            features = self.features(audio)
            lengths = torch.ones(1, dtype=torch.int64) * features.shape[-1]
            encoded, lengths = self.encoder(features, lengths)
            return self.head(encoded).argmax(-1), lengths

    wrapped = WaveformCTC().eval()
    sample = gigaam.load_audio(str(cache / 'example.wav')).unsqueeze(0)
    with torch.inference_mode():
        expected, _ = pre(sample, torch.tensor([sample.shape[-1]]))
        diff = (expected - wrapped.features(sample)).abs()
        # Tiny log-mel errors in quiet bins are expected from float32 convolution DFT.
        assert diff.mean() < 0.002, float(diff.mean())
        token_ids, lengths = wrapped(sample)
        ids = token_ids[0, :int(lengths[0])].tolist()
        filtered = [value for i,value in enumerate(ids) if value != 256 and (i == 0 or value != ids[i-1])]
        text = model.decoding.tokenizer.decode(filtered)
        print('PyTorch wrapper:', text, flush=True)
    tokenizer = model.decoding.tokenizer.model
    (output / 'tokens.json').write_text(json.dumps({'pieces':[tokenizer.id_to_piece(i) for i in range(tokenizer.vocab_size())], 'blank':256, 'model':MODEL, 'sampleRate':16000, 'reference':text}, ensure_ascii=False))
    with wrapped.encoder.onnx_export_mode(), torch.inference_mode():
        torch.onnx.export(wrapped, (sample,), str(output / 'model.fp32.onnx'),
                          input_names=['audio'], output_names=['tokens','lengths'],
                          dynamic_axes={'audio':{1:'samples'}, 'tokens':{1:'frames'}},
                          opset_version=17, dynamo=False)
    print('Exported fp32', flush=True)


def quantize(output):
    import onnx
    from onnxruntime.quantization import quantize_dynamic, QuantType
    original = output / 'model.fp32.onnx'
    graph = onnx.load(str(original))
    # Keep the mel projection in float32, quantize encoder linear layers only.
    excluded = [node.name for node in graph.graph.node if node.op_type == 'MatMul' and 'encoder' not in node.name and 'head' not in node.name]
    del graph
    quantize_dynamic(str(original), str(output / 'model.int8.onnx'), weight_type=QuantType.QInt8,
                     op_types_to_quantize=['MatMul'], per_channel=True, nodes_to_exclude=excluded)
    print('Quantized', flush=True)


def package(output, cache):
    import numpy as np
    import onnxruntime as ort
    import wave
    with wave.open(str(cache / 'example.wav')) as wav:
        assert wav.getnchannels() == 1 and wav.getframerate() == 16000
        audio = np.frombuffer(wav.readframes(wav.getnframes()), dtype=np.int16).astype(np.float32) / 32768
    opts = ort.SessionOptions(); opts.intra_op_num_threads = 4
    session = ort.InferenceSession(str(output / 'model.int8.onnx'), opts, providers=['CPUExecutionProvider'])
    ids, length = session.run(None, {'audio':audio[None,:]})
    tokens = json.loads((output/'tokens.json').read_text())
    ids = ids[0,:int(length[0])].tolist()
    kept = [value for i,value in enumerate(ids) if value != tokens['blank'] and (i == 0 or value != ids[i-1])]
    text = ''.join(tokens['pieces'][i] for i in kept).replace('▁',' ').strip()
    print('ONNX INT8:',text,flush=True)
    assert text and len(text) > len(tokens['reference']) * .7
    # Individual files stay below GitHub's per-file limit; browser joins them in memory.
    model = output / 'model.int8.onnx'
    parts=[]
    with model.open('rb') as source:
        while data := source.read(24 * 1024 * 1024):
            name=f'model-{len(parts):02}.bin';(output/name).write_bytes(data)
            parts.append({'path':name,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest()})
    manifest={'model':MODEL, 'revision':REVISION, 'quantization':'INT8 MatMul', 'parts':parts,
              'bytes':model.stat().st_size, 'referenceOnnx':text}
    (output/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
    # Do not deploy the much larger intermediate exports.
    allowed = {'manifest.json', 'tokens.json'} | {part['path'] for part in parts}
    for path in output.iterdir():
        if path.is_file() and path.name not in allowed:
            path.unlink()


def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('--output', default='public/models/gigaam-v3')
    parser.add_argument('--cache', default=os.path.expanduser('~/.cache/gigaam'))
    parser.add_argument('--stage', choices=['export','quantize','package'])
    args=parser.parse_args(); output=Path(args.output).resolve();cache=Path(args.cache).resolve()
    output.mkdir(parents=True,exist_ok=True);cache.mkdir(parents=True,exist_ok=True)
    if args.stage:
        return {'export':lambda:export(output,cache),'quantize':lambda:quantize(output),'package':lambda:package(output,cache)}[args.stage]()
    import urllib.request
    example=cache/'example.wav'
    if not example.exists():
        urllib.request.urlretrieve('https://cdn.chatwm.opensmodel.sberdevices.ru/GigaAM/example.wav',str(example))
    for stage in ['export','quantize','package']:
        subprocess.run([sys.executable,__file__,'--output',str(output),'--cache',str(cache),'--stage',stage],check=True)

if __name__=='__main__':
    main()
