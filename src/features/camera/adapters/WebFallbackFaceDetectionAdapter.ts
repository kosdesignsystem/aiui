import { toNormalizedFaceBounds } from '../utils/previewMapper';
import type { DetectionFrame, FaceBounds } from '../types/camera';
import type { FaceDetectionAdapter } from '../types/faceDetection';

type BlazeFaceModel = {
  estimateFaces(input: ImageData, returnTensors: boolean): Promise<Array<{ topLeft: [number, number]; bottomRight: [number, number]; probability?: number[] }>>;
};

export class WebFallbackFaceDetectionAdapter implements FaceDetectionAdapter {
  readonly id = 'web-tfjs-blazeface';
  private model: BlazeFaceModel | null = null;

  async isAvailable() {
    return typeof window !== 'undefined' && typeof WebAssembly !== 'undefined';
  }

  async initialize() {
    const tf = await import('@tensorflow/tfjs-core');
    await import('@tensorflow/tfjs-backend-webgl');
    await tf.setBackend('webgl');
    await tf.ready();
    const blazeface = await import('@tensorflow-models/blazeface');
    this.model = (await blazeface.load()) as unknown as BlazeFaceModel;
  }

  async detect(frame: DetectionFrame): Promise<FaceBounds[]> {
    if (!this.model || !frame.imageData) return [];
    const detections = await this.model.estimateFaces(frame.imageData, false);

    return detections.map((detection) => {
      const [x1, y1] = detection.topLeft;
      const [x2, y2] = detection.bottomRight;
      return {
        ...toNormalizedFaceBounds(
          {
            x: x1,
            y: y1,
            width: x2 - x1,
            height: y2 - y1,
          },
          frame.width,
          frame.height,
        ),
        confidence: detection.probability?.[0],
      };
    });
  }

  async dispose() {
    this.model = null;
  }
}
