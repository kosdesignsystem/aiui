import type { AspectRatioOption, CameraFacingMode, FlashMode } from '../types';

const ratioMap: Record<AspectRatioOption, number> = {
  '4:3': 4 / 3,
  '1:1': 1,
  '9:16': 9 / 16,
};

export class CameraService {
  private stream: MediaStream | null = null;

  async startCamera(facingMode: CameraFacingMode): Promise<MediaStream> {
    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error('getUserMedia API is unavailable in this browser');
    }

    this.stopCamera();

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: { ideal: facingMode === 'front' ? 'user' : 'environment' },
      },
    });

    this.stream = stream;
    return stream;
  }

  stopCamera(): void {
    this.stream?.getTracks().forEach((track) => track.stop());
    this.stream = null;
  }

  getTrack(): MediaStreamTrack | null {
    return this.stream?.getVideoTracks()?.[0] ?? null;
  }

  async setTorch(enabled: boolean): Promise<void> {
    const track = this.getTrack();
    if (!track) {
      return;
    }

    await track.applyConstraints({ advanced: [{ torch: enabled }] as MediaTrackConstraintSet[] });
  }

  async capturePhoto(video: HTMLVideoElement, ratio: AspectRatioOption, flashMode: FlashMode, shouldUseAutoFlash: boolean): Promise<Blob> {
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      throw new Error('Video frame unavailable');
    }

    const shouldFlash = flashMode === 'on' || (flashMode === 'auto' && shouldUseAutoFlash);
    if (shouldFlash) {
      await this.pulseTorch();
    }

    const canvas = document.createElement('canvas');
    const { sx, sy, sw, sh, outputWidth, outputHeight } = this.getCrop(video, ratio);
    canvas.width = outputWidth;
    canvas.height = outputHeight;

    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('2d canvas context unavailable');
    }

    context.drawImage(video, sx, sy, sw, sh, 0, 0, outputWidth, outputHeight);

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.92));
    if (!blob) {
      throw new Error('Image capture failed');
    }

    return blob;
  }

  private async pulseTorch(): Promise<void> {
    const track = this.getTrack();
    if (!track) {
      return;
    }

    try {
      await this.setTorch(true);
      await new Promise((resolve) => window.setTimeout(resolve, 120));
      await this.setTorch(false);
    } catch {
      // Device may ignore torch constraints.
    }
  }

  private getCrop(video: HTMLVideoElement, ratio: AspectRatioOption) {
    const sourceWidth = video.videoWidth;
    const sourceHeight = video.videoHeight;
    const targetRatio = ratioMap[ratio];
    const sourceRatio = sourceWidth / sourceHeight;

    let sx = 0;
    let sy = 0;
    let sw = sourceWidth;
    let sh = sourceHeight;

    if (sourceRatio > targetRatio) {
      sw = sourceHeight * targetRatio;
      sx = (sourceWidth - sw) / 2;
    } else {
      sh = sourceWidth / targetRatio;
      sy = (sourceHeight - sh) / 2;
    }

    return {
      sx,
      sy,
      sw,
      sh,
      outputWidth: Math.round(sw),
      outputHeight: Math.round(sh),
    };
  }
}
