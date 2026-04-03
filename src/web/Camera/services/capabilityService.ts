import type { CameraCapabilities } from '../types';

export function buildCapabilities(track: MediaStreamTrack | null): CameraCapabilities {
  const mediaSupported = Boolean(navigator.mediaDevices?.getUserMedia);
  const capabilities = track?.getCapabilities?.();
  const torchSupported = Boolean(capabilities && 'torch' in capabilities);
  const zoomSupported = Boolean(capabilities && 'zoom' in capabilities);

  const faceDetectorSupported = typeof window !== 'undefined' && 'FaceDetector' in window;

  return {
    camera: mediaSupported ? { state: 'supported' } : { state: 'unsupported', reason: 'Browser lacks media stream support.' },
    flash: torchSupported
      ? { state: 'supported' }
      : { state: 'partial', reason: 'Torch depends on hardware + browser; shutter flash fallback only.' },
    switchCamera: mediaSupported ? { state: 'partial', reason: 'Depends on available device cameras.' } : { state: 'unsupported' },
    zoom: zoomSupported ? { state: 'supported' } : { state: 'fallback', reason: 'Uses CSS preview zoom fallback.' },
    whiteBalance: { state: 'fallback', reason: 'Applied as CSS filter when hardware control is unavailable.' },
    exposure: { state: 'fallback', reason: 'Applied as CSS brightness compensation.' },
    faceDetection: faceDetectorSupported
      ? { state: 'supported' }
      : { state: 'fallback', reason: 'Uses MediaPipe fallback for iOS Safari and other browsers.' },
  };
}
