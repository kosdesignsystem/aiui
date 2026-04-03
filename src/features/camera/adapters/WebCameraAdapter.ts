import type { AspectRatio, CameraFacing, CaptureResult, FlashMode, PreviewLayout } from '../types/camera';
import type { CameraAdapter } from '../types/cameraAdapter';

const ratioSize = (ratio: AspectRatio, sourceW: number, sourceH: number) => {
  const target = ratio === '1:1' ? 1 : ratio === '9:16' ? 9 / 16 : 4 / 3;
  const source = sourceW / sourceH;
  if (source > target) {
    const width = sourceH * target;
    return { cropW: width, cropH: sourceH, offsetX: (sourceW - width) / 2, offsetY: 0 };
  }
  const height = sourceW / target;
  return { cropW: sourceW, cropH: height, offsetX: 0, offsetY: (sourceH - height) / 2 };
};

export class WebCameraAdapter implements CameraAdapter {
  private stream: MediaStream | null = null;
  private video: HTMLVideoElement | null = null;
  private facing: CameraFacing = 'back';

  async initialize() {
    return;
  }

  async startPreview(target: unknown) {
    this.video = target as HTMLVideoElement;
    this.stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: this.facing === 'front' ? 'user' : { ideal: 'environment' } },
      audio: false,
    });

    this.video.srcObject = this.stream;
    this.video.playsInline = true;
    this.video.muted = true;
    await this.video.play();
  }

  async stopPreview() {
    this.stream?.getTracks().forEach((track) => track.stop());
    this.stream = null;
  }

  async capturePhoto(ratio: AspectRatio): Promise<CaptureResult> {
    if (!this.video) throw new Error('Preview is not initialized');
    const width = this.video.videoWidth;
    const height = this.video.videoHeight;
    const { cropW, cropH, offsetX, offsetY } = ratioSize(ratio, width, height);
    const canvas = document.createElement('canvas');
    canvas.width = cropW;
    canvas.height = cropH;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('2D canvas unavailable');
    ctx.drawImage(this.video, offsetX, offsetY, cropW, cropH, 0, 0, cropW, cropH);

    return {
      id: `${Date.now()}`,
      uri: canvas.toDataURL('image/jpeg', 0.95),
      width: cropW,
      height: cropH,
      aspectRatio: ratio,
      timestamp: Date.now(),
    };
  }

  async setFacing(facing: CameraFacing) {
    this.facing = facing;
    if (!this.video) return;
    await this.stopPreview();
    await this.startPreview(this.video);
  }

  async setFlash(_mode: FlashMode) {
    return;
  }

  async setZoom(value: number) {
    const track = this.stream?.getVideoTracks()[0];
    const caps = track?.getCapabilities?.() as MediaTrackCapabilities | undefined;
    if (!track || !caps?.zoom) return;
    const normalized = caps.zoom.min + (caps.zoom.max - caps.zoom.min) * value;
    await track.applyConstraints({ advanced: [{ zoom: normalized }] });
  }

  async setWhiteBalance(_value: number) {
    return;
  }

  async setExposure(_value: number) {
    return;
  }

  getPreviewLayout(): PreviewLayout | null {
    if (!this.video) return null;
    return {
      x: 0,
      y: 0,
      width: this.video.clientWidth,
      height: this.video.clientHeight,
    };
  }

  async dispose() {
    await this.stopPreview();
    this.video = null;
  }
}
