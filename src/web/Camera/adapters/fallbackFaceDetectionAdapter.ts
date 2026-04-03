import type { FaceDetectionResult } from '../types';
import type { FaceDetectionAdapter } from './faceDetectionAdapter';

type MediaPipeFaceDetection = {
  boundingBox?: {
    originX: number;
    originY: number;
    width: number;
    height: number;
  };
  categories?: Array<{ score?: number }>;
};

type MediaPipeFaceDetector = {
  detectForVideo(video: HTMLVideoElement, timestampMs: number): { detections: MediaPipeFaceDetection[] };
  close?: () => void;
};

type MediaPipeVisionModule = {
  FilesetResolver: {
    forVisionTasks(wasmPath: string): Promise<unknown>;
  };
  FaceDetector: {
    createFromOptions(
      vision: unknown,
      options: {
        baseOptions: { modelAssetPath: string; delegate?: 'GPU' | 'CPU' };
        runningMode: 'VIDEO';
        minDetectionConfidence?: number;
      },
    ): Promise<MediaPipeFaceDetector>;
  };
};

const MEDIAPIPE_VERSION = '0.10.14';

export class FallbackFaceDetectionAdapter implements FaceDetectionAdapter {
  readonly id = 'mediapipe-fallback-face-detector';
  private detector: MediaPipeFaceDetector | null = null;

  async isAvailable(): Promise<boolean> {
    return typeof window !== 'undefined';
  }

  async initialize(): Promise<void> {
    const visionModule = (await import(
      /* @vite-ignore */ `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${MEDIAPIPE_VERSION}`
    )) as MediaPipeVisionModule;

    const vision = await visionModule.FilesetResolver.forVisionTasks(
      `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${MEDIAPIPE_VERSION}/wasm`,
    );

    this.detector = await visionModule.FaceDetector.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          'https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/latest/blaze_face_short_range.tflite',
        delegate: 'GPU',
      },
      runningMode: 'VIDEO',
      minDetectionConfidence: 0.55,
    });
  }

  async detect(video: HTMLVideoElement): Promise<FaceDetectionResult[]> {
    if (!this.detector || video.videoWidth === 0 || video.videoHeight === 0) {
      return [];
    }

    const output = this.detector.detectForVideo(video, performance.now());
    return (output.detections ?? [])
      .map((face) => {
        if (!face.boundingBox) {
          return null;
        }

        return {
          bounds: {
            x: face.boundingBox.originX / video.videoWidth,
            y: face.boundingBox.originY / video.videoHeight,
            width: face.boundingBox.width / video.videoWidth,
            height: face.boundingBox.height / video.videoHeight,
          },
          score: face.categories?.[0]?.score,
        };
      })
      .filter((face): face is FaceDetectionResult => Boolean(face));
  }

  async dispose(): Promise<void> {
    this.detector?.close?.();
    this.detector = null;
  }
}
