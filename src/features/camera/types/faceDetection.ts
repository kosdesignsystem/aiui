import type { DetectionFrame, FaceBounds } from './camera';

export interface FaceDetectionAdapter {
  readonly id: string;
  isAvailable(): Promise<boolean>;
  initialize(): Promise<void>;
  detect(frame: DetectionFrame): Promise<FaceBounds[]>;
  dispose(): Promise<void>;
}

export interface FaceDetectionStrategySelection {
  preferred: string;
  actual: string;
  fallbackUsed: boolean;
}
