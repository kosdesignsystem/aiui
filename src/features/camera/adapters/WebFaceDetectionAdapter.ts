import { toNormalizedFaceBounds } from '../utils/previewMapper';
import type { DetectionFrame, FaceBounds } from '../types/camera';
import type { FaceDetectionAdapter } from '../types/faceDetection';

type BrowserFaceDetector = {
  detect(image: CanvasImageSource): Promise<Array<{ boundingBox: DOMRectReadOnly }>>;
};

export class WebFaceDetectionAdapter implements FaceDetectionAdapter {
  readonly id = 'web-shape-detection';
  private detector: BrowserFaceDetector | null = null;

  async isAvailable() {
    return typeof window !== 'undefined' && 'FaceDetector' in window;
  }

  async initialize() {
    const FaceDetectorCtor = (window as Window & { FaceDetector: new () => BrowserFaceDetector }).FaceDetector;
    this.detector = new FaceDetectorCtor();
  }

  async detect(frame: DetectionFrame): Promise<FaceBounds[]> {
    if (!this.detector || !frame.imageData) return [];
    const bitmap = await createImageBitmap(frame.imageData);
    const detections = await this.detector.detect(bitmap);
    bitmap.close();

    return detections.map((item) =>
      toNormalizedFaceBounds(
        {
          x: item.boundingBox.x,
          y: item.boundingBox.y,
          width: item.boundingBox.width,
          height: item.boundingBox.height,
        },
        frame.width,
        frame.height,
      ),
    );
  }

  async dispose() {
    this.detector = null;
  }
}
