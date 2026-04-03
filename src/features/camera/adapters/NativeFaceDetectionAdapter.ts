import type { DetectionFrame, FaceBounds } from '../types/camera';
import type { FaceDetectionAdapter } from '../types/faceDetection';

export class NativeFaceDetectionAdapter implements FaceDetectionAdapter {
  readonly id = 'native-vision-camera';

  async isAvailable() {
    return true;
  }

  async initialize() {
    return;
  }

  async detect(_frame: DetectionFrame): Promise<FaceBounds[]> {
    return [];
  }

  async dispose() {
    return;
  }
}
