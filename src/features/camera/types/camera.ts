export type FlashMode = 'off' | 'on' | 'auto';
export type AspectRatio = '4:3' | '1:1' | '9:16';
export type CameraFacing = 'front' | 'back';

export type CapabilityState =
  | 'supported'
  | 'unsupported'
  | 'partial'
  | 'fallback'
  | 'blocked';

export interface CameraFeatureAvailability {
  state: CapabilityState;
  reason?: string;
}

export interface PlatformCapabilities {
  flash: CameraFeatureAvailability;
  zoom: CameraFeatureAvailability;
  whiteBalance: CameraFeatureAvailability;
  exposure: CameraFeatureAvailability;
  faceDetection: CameraFeatureAvailability;
  cameraSwitch: CameraFeatureAvailability;
}

export interface CaptureResult {
  id: string;
  uri: string;
  width: number;
  height: number;
  aspectRatio: AspectRatio;
  timestamp: number;
}

export interface PreviewLayout {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface NormalizedFaceBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface FaceBounds extends NormalizedFaceBounds {
  confidence?: number;
  trackingId?: string;
}

export type ToolType = 'zoom' | 'whiteBalance' | 'exposure';

export interface CameraControlState {
  flashMode: FlashMode;
  zoom: number;
  whiteBalance: number;
  exposure: number;
  ratio: AspectRatio;
  facing: CameraFacing;
}

export interface DetectionFrame {
  width: number;
  height: number;
  timestamp: number;
  imageData?: ImageData;
}
