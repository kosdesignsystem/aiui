import type { AspectRatio, CameraFacing, CaptureResult, FlashMode, PreviewLayout } from './camera';

export interface CameraAdapter {
  initialize(): Promise<void>;
  startPreview(target: unknown): Promise<void>;
  stopPreview(): Promise<void>;
  capturePhoto(ratio: AspectRatio): Promise<CaptureResult>;
  setFacing(facing: CameraFacing): Promise<void>;
  setFlash(mode: FlashMode): Promise<void>;
  setZoom(value: number): Promise<void>;
  setWhiteBalance(value: number): Promise<void>;
  setExposure(value: number): Promise<void>;
  getPreviewLayout(): PreviewLayout | null;
  dispose(): Promise<void>;
}
