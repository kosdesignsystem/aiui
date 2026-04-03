import type { FaceDetectionResult } from '../types';
import type { FaceDetectionAdapter } from './faceDetectionAdapter';

type WindowWithFaceDetector = Window & {
  FaceDetector?: new (options?: { maxDetectedFaces?: number; fastMode?: boolean }) => {
    detect: (source: CanvasImageSource) => Promise<Array<{ boundingBox: DOMRectReadOnly }>>;
  };
};

export class NativeBrowserFaceDetectionAdapter implements FaceDetectionAdapter {
  readonly id = 'native-browser-face-detector';
  private detector: { detect: (source: CanvasImageSource) => Promise<Array<{ boundingBox: DOMRectReadOnly }>> } | null = null;

  async isAvailable(): Promise<boolean> {
    return typeof window !== 'undefined' && Boolean((window as WindowWithFaceDetector).FaceDetector);
  }

  async initialize(): Promise<void> {
    const FaceDetectorCtor = (window as WindowWithFaceDetector).FaceDetector;
    if (!FaceDetectorCtor) {
      throw new Error('FaceDetector API unavailable');
    }

    this.detector = new FaceDetectorCtor({ maxDetectedFaces: 5, fastMode: true });
  }

  async detect(video: HTMLVideoElement): Promise<FaceDetectionResult[]> {
    if (!this.detector || video.videoWidth === 0 || video.videoHeight === 0) {
      return [];
    }

    const result = await this.detector.detect(video);
    return result
      .map((face) => ({
        bounds: {
          x: face.boundingBox.x / video.videoWidth,
          y: face.boundingBox.y / video.videoHeight,
          width: face.boundingBox.width / video.videoWidth,
          height: face.boundingBox.height / video.videoHeight,
        },
      }))
      .filter((face) => face.bounds.width > 0 && face.bounds.height > 0);
  }

  async dispose(): Promise<void> {
    this.detector = null;
  }
}
