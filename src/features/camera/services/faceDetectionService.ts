import { FACE_DETECTION_INTERVAL_MS } from '../constants/camera';
import type { DetectionFrame, FaceBounds } from '../types/camera';
import type { FaceDetectionAdapter } from '../types/faceDetection';

export class FaceDetectionService {
  private timer: ReturnType<typeof setInterval> | null = null;
  private inFlight = false;
  private adapters: FaceDetectionAdapter[];
  private activeAdapter: FaceDetectionAdapter | null = null;

  constructor(adapters: FaceDetectionAdapter[]) {
    this.adapters = adapters;
  }

  async initialize() {
    for (const adapter of this.adapters) {
      const available = await adapter.isAvailable();
      if (!available) continue;
      await adapter.initialize();
      this.activeAdapter = adapter;
      return adapter.id;
    }

    return null;
  }

  start(getFrame: () => DetectionFrame | null, onFaces: (faces: FaceBounds[]) => void) {
    if (!this.activeAdapter || this.timer) return;
    this.timer = setInterval(async () => {
      if (this.inFlight) return;
      const frame = getFrame();
      if (!frame) return;
      this.inFlight = true;
      try {
        const faces = await this.activeAdapter!.detect(frame);
        onFaces(faces);
      } finally {
        this.inFlight = false;
      }
    }, FACE_DETECTION_INTERVAL_MS);
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  async dispose() {
    this.stop();
    if (this.activeAdapter) {
      await this.activeAdapter.dispose();
      this.activeAdapter = null;
    }
  }
}
