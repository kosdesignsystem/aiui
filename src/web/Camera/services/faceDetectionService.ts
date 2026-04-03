import type { FaceOverlayBounds } from '../types';
import type { FaceDetectionAdapter } from '../adapters/faceDetectionAdapter';

export class FaceDetectionService {
  private adapter: FaceDetectionAdapter | null = null;
  private timer: number | null = null;
  private inFlight = false;

  constructor(private readonly adapters: FaceDetectionAdapter[], private readonly intervalMs = 260) {}

  async initialize(): Promise<string | null> {
    for (const adapter of this.adapters) {
      try {
        if (!(await adapter.isAvailable())) {
          continue;
        }
        await adapter.initialize();
        this.adapter = adapter;
        return adapter.id;
      } catch {
        await adapter.dispose();
      }
    }

    return null;
  }

  start(video: HTMLVideoElement, onFaces: (faces: FaceOverlayBounds[]) => void): void {
    if (!this.adapter || this.timer !== null) {
      return;
    }

    this.timer = window.setInterval(async () => {
      if (this.inFlight || video.readyState < 2) {
        return;
      }

      this.inFlight = true;
      try {
        const detections = await this.adapter!.detect(video);
        const mapped = detections.map((detection, index) => ({
          id: `${index}`,
          left: detection.bounds.x,
          top: detection.bounds.y,
          width: detection.bounds.width,
          height: detection.bounds.height,
        }));
        onFaces(mapped);
      } catch {
        onFaces([]);
      } finally {
        this.inFlight = false;
      }
    }, this.intervalMs);
  }

  stop(): void {
    if (this.timer !== null) {
      window.clearInterval(this.timer);
      this.timer = null;
    }
  }

  async dispose(): Promise<void> {
    this.stop();
    if (this.adapter) {
      await this.adapter.dispose();
      this.adapter = null;
    }
  }
}
