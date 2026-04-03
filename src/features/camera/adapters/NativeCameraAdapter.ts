import type { Camera, PhotoFile } from 'react-native-vision-camera';
import type { AspectRatio, CameraFacing, CaptureResult, FlashMode, PreviewLayout } from '../types/camera';
import type { CameraAdapter } from '../types/cameraAdapter';

export class NativeCameraAdapter implements CameraAdapter {
  private ref: Camera | null = null;
  private facing: CameraFacing = 'back';
  private previewLayout: PreviewLayout | null = null;

  async initialize() {
    return;
  }

  async startPreview(target: unknown) {
    this.ref = target as Camera;
  }

  async stopPreview() {
    return;
  }

  async capturePhoto(ratio: AspectRatio): Promise<CaptureResult> {
    if (!this.ref) throw new Error('Camera ref unavailable');
    const photo = (await this.ref.takePhoto({
      flash: 'off',
      qualityPrioritization: 'quality',
    })) as PhotoFile;

    return {
      id: `${Date.now()}`,
      uri: `file://${photo.path}`,
      width: photo.width,
      height: photo.height,
      aspectRatio: ratio,
      timestamp: Date.now(),
    };
  }

  async setFacing(facing: CameraFacing) {
    this.facing = facing;
  }

  async setFlash(_mode: FlashMode) {
    return;
  }

  async setZoom(value: number) {
    if (!this.ref) return;
    this.ref.zoom = Math.max(1, value * 10);
  }

  async setWhiteBalance(_value: number) {
    return;
  }

  async setExposure(value: number) {
    if (!this.ref) return;
    this.ref.exposure = value;
  }

  getPreviewLayout() {
    return this.previewLayout;
  }

  setPreviewLayout(layout: PreviewLayout) {
    this.previewLayout = layout;
  }

  async dispose() {
    this.ref = null;
  }
}
