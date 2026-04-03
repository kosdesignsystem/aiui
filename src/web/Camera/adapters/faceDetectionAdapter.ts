import type { FaceDetectionResult } from '../types';

export interface FaceDetectionAdapter {
  readonly id: string;
  isAvailable(): Promise<boolean>;
  initialize(): Promise<void>;
  detect(video: HTMLVideoElement): Promise<FaceDetectionResult[]>;
  dispose(): Promise<void>;
}
