export type CameraFacingMode = 'front' | 'back';
export type FlashMode = 'off' | 'on' | 'auto';
export type AspectRatioOption = '4:3' | '1:1' | '9:16';
export type ToolKey = 'zoom' | 'whiteBalance' | 'exposure';

export type CapabilityState = 'supported' | 'unsupported' | 'fallback' | 'partial';

export type Capability = {
  state: CapabilityState;
  reason?: string;
};

export type CameraCapabilities = {
  camera: Capability;
  flash: Capability;
  switchCamera: Capability;
  zoom: Capability;
  whiteBalance: Capability;
  exposure: Capability;
  faceDetection: Capability;
};

export type NormalizedBounds = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type FaceDetectionResult = {
  bounds: NormalizedBounds;
  score?: number;
};

export type FaceOverlayBounds = {
  id: string;
  left: number;
  top: number;
  width: number;
  height: number;
};
