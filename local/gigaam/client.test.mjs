// Browser adapter tests with explicit Worker/audio stubs. Real WASM is tested separately.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { build } from 'esbuild';
const bundle = await build({ stdin: { contents: "export * from './src/web/Notes/gigaam'; export {cancelBrowserGigaam} from './src/web/Notes/gigaam-web-engine';", resolveDir: process.cwd(), loader:'ts' }, bundle:true, write:false, format:'esm', platform:'node', define:{'import.meta.url':JSON.stringify(new URL('../../src/web/Notes/gigaam-web-engine.ts',import.meta.url).href)} });
const { GigaamRecording, cancelBrowserGigaam, encodeWav } = await import(`data:text/javascript;base64,${Buffer.from(bundle.outputFiles[0].text).toString('base64')}`);
function setup({ getStream, holdResult=false }={}) {
  cancelBrowserGigaam();
  globalThis.document={baseURI:'https://kosdesignsystem.github.io/aiui/ae/'};
  let stopped=false, sent, instance; const history=[];
  const stream={getTracks:()=>[{stop(){stopped=true;}}]};
  Object.defineProperty(globalThis,'navigator',{configurable:true,value:{mediaDevices:{getUserMedia:getStream|| (async()=>stream)}}});
  globalThis.Worker=class {
    constructor(){instance=this;}
    postMessage(message) {
      if(message.type==='init')queueMicrotask(()=>this.onmessage?.({data:{type:'ready'}}));
      else { sent=message; history.push(message); if(!holdResult)queueMicrotask(()=>this.onmessage?.({data:{type:'result',id:message.id,text:'Привет, мир!'}})); }
    }
    terminate(){this.terminated=true;}
  };
  globalThis.AudioContext=class {
    sampleRate=48000;state='running';destination={};
    async resume(){} async close(){this.state='closed';}
    createMediaStreamSource(){return {connect(){},disconnect(){}};}
    createGain(){return {gain:{value:1},connect(){},disconnect(){}};}
    createScriptProcessor(){const node={connect(){},disconnect(){}};globalThis.audioNode=node;return node;}
  };
  globalThis.OfflineAudioContext=class {
    constructor(channels,length){this.length=length;} destination={};
    createBuffer(){return {copyToChannel(){}};}
    createBufferSource(){return {connect(){},start(){}};}
    async startRendering(){return {getChannelData:()=>new Float32Array(this.length)};}
  };
  const phases=[],texts=[],errors=[],partials=[];
  const recording=new GigaamRecording({onPhase:p=>phases.push(p),onText:t=>texts.push(t),onPartial:t=>partials.push(t),onError:e=>errors.push(e)});
  return {recording,phases,texts,errors,stream,stopped:()=>stopped,sent:()=>sent,history,partials,reply:(text)=>instance.onmessage({data:{type:'result',id:sent.id,text}})};
}
const feed=()=>globalThis.audioNode.onaudioprocess({inputBuffer:{getChannelData:()=>new Float32Array(48000)}});
test('WAV helper remains compatible with optional Python experiments',async()=>{
 const view=new DataView(await encodeWav([new Float32Array([-1,0,1])],48000).arrayBuffer());assert.equal(view.getUint32(24,true),48000);assert.equal(view.getInt16(44,true),-32768);
});
test('browser adapter sends 16kHz audio to Worker and closes microphone',async()=>{
 const s=setup();await s.recording.start();feed();await s.recording.stop();assert.deepEqual(s.texts,['Привет, мир!']);assert.equal(s.sent().audio.byteLength,16000*4);assert.ok(s.stopped());cancelBrowserGigaam();
});
test('cancel during browser inference never appends late text',async()=>{
 const s=setup({holdResult:true});await s.recording.start();feed();const stopped=s.recording.stop();
 while(!s.sent())await new Promise(resolve=>setImmediate(resolve));
 s.recording.cancel();await stopped;assert.deepEqual(s.texts,[]);assert.ok(s.stopped());
});
test('late microphone permission after cancellation releases stream',async()=>{
 let permission;const s=setup({getStream:()=>new Promise(resolve=>{permission=resolve;})});const started=s.recording.start();
 while(!permission)await new Promise(resolve=>setImmediate(resolve));
 s.recording.cancel();permission(s.stream);await started;assert.ok(s.stopped());assert.deepEqual(s.texts,[]);
});
test('denied microphone permission is visible',async()=>{
 const s=setup({getStream:async()=>{throw new DOMException('denied','NotAllowedError');}});await s.recording.start();assert.match(s.errors[0],/Разрешите/);cancelBrowserGigaam();
});

test('partial text arrives while microphone keeps recording; final replaces the same hypothesis',async()=>{
 const s=setup();await s.recording.start();feed();
 while(!s.partials.length)await new Promise(resolve=>setImmediate(resolve));
 assert.deepEqual(s.partials,['Привет, мир!']);assert.deepEqual(s.texts,[]);assert.equal(s.stopped(),false);
 await s.recording.stop();assert.deepEqual(s.texts,['Привет, мир!']);assert.equal(s.history.length,1);cancelBrowserGigaam();
});
test('slow inference skips stale snapshots and final includes audio captured during processing',async()=>{
 const s=setup({holdResult:true});await s.recording.start();feed();
 while(s.history.length<1)await new Promise(resolve=>setImmediate(resolve));
 feed();feed();assert.equal(s.history.length,1);
 const finished=s.recording.stop();s.reply('Первый фрагмент');
 while(s.history.length<2)await new Promise(resolve=>setImmediate(resolve));
 assert.equal(s.sent().audio.byteLength,3*16000*4);
 s.reply('Полная фраза');await finished;
 assert.deepEqual(s.texts,['Полная фраза']);assert.deepEqual(s.partials,['Первый фрагмент','Полная фраза']);cancelBrowserGigaam();
});
