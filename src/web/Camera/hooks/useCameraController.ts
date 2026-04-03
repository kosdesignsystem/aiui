import type { RefObject } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FallbackFaceDetectionAdapter } from '../adapters/fallbackFaceDetectionAdapter';
import { NativeBrowserFaceDetectionAdapter } from '../adapters/nativeBrowserFaceDetectionAdapter';
import { buildCapabilities } from '../services/capabilityService';
import { CameraService } from '../services/cameraService';
import { FaceDetectionService } from '../services/faceDetectionService';
import type { AspectRatioOption, CameraCapabilities, CameraFacingMode, FaceOverlayBounds, FlashMode } from '../types';

const DEFAULT_CAPABILITIES: CameraCapabilities = {
  camera: { state: 'unsupported' },
  flash: { state: 'unsupported' },
  switchCamera: { state: 'unsupported' },
  zoom: { state: 'unsupported' },
  whiteBalance: { state: 'unsupported' },
  exposure: { state: 'unsupported' },
  faceDetection: { state: 'unsupported' },
};

export function useCameraController(videoRef: RefObject<HTMLVideoElement>) {
  const cameraService = useMemo(() => new CameraService(), []);
  const faceService = useMemo(
    () => new FaceDetectionService([new NativeBrowserFaceDetectionAdapter(), new FallbackFaceDetectionAdapter()]),
    [],
  );

  const [facingMode, setFacingMode] = useState<CameraFacingMode>('back');
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [error, setError] = useState('');
  const [flashMode, setFlashMode] = useState<FlashMode>('off');
  const [autoFlashArmed, setAutoFlashArmed] = useState(false);
  const [faces, setFaces] = useState<FaceOverlayBounds[]>([]);
  const [capabilities, setCapabilities] = useState<CameraCapabilities>(DEFAULT_CAPABILITIES);
  const [faceAdapterId, setFaceAdapterId] = useState<string | null>(null);
  const requestIdRef = useRef(0);

  const cycleFlashMode = useCallback(() => {
    setFlashMode((current) => (current === 'off' ? 'auto' : current === 'auto' ? 'on' : 'off'));
  }, []);

  const detectBrightness = useCallback(() => {
    const video = videoRef.current;
    if (!video || video.readyState < 2) {
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = 24;
    canvas.height = 24;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) {
      return;
    }

    context.drawImage(video, 0, 0, 24, 24);
    const pixels = context.getImageData(0, 0, 24, 24).data;
    let luma = 0;
    for (let i = 0; i < pixels.length; i += 4) {
      luma += 0.2126 * pixels[i] + 0.7152 * pixels[i + 1] + 0.0722 * pixels[i + 2];
    }

    const average = luma / (pixels.length / 4);
    setAutoFlashArmed(average < 72);
  }, [videoRef]);

  const startCamera = useCallback(async () => {
    const requestId = ++requestIdRef.current;
    setStatus('loading');
    setError('');

    try {
      const stream = await cameraService.startCamera(facingMode);
      if (requestId !== requestIdRef.current) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }

      const video = videoRef.current;
      if (!video) {
        throw new Error('Video element unavailable');
      }

      video.srcObject = stream;
      await video.play();

      const track = stream.getVideoTracks()[0] ?? null;
      setCapabilities(buildCapabilities(track));
      setStatus('ready');
      detectBrightness();

      const selectedAdapter = await faceService.initialize();
      if (requestId !== requestIdRef.current) {
        return;
      }
      setFaceAdapterId(selectedAdapter);
      faceService.start(video, setFaces);
    } catch (reason) {
      setStatus('error');
      setError(reason instanceof Error ? reason.message : 'Unable to access camera');
      setFaces([]);
    }
  }, [cameraService, detectBrightness, faceService, facingMode, videoRef]);

  useEffect(() => {
    void startCamera();

    return () => {
      void faceService.dispose();
      cameraService.stopCamera();
    };
  }, [cameraService, faceService, startCamera]);

  useEffect(() => {
    if (status !== 'ready') {
      return;
    }

    const timer = window.setInterval(detectBrightness, 1100);
    return () => window.clearInterval(timer);
  }, [detectBrightness, status]);

  const switchCamera = useCallback(async () => {
    if (capabilities.switchCamera.state === 'unsupported') {
      return;
    }

    await faceService.dispose();
    setFaces([]);
    setFacingMode((current) => (current === 'back' ? 'front' : 'back'));
  }, [capabilities.switchCamera.state, faceService]);

  const capturePhoto = useCallback(
    async (ratio: AspectRatioOption): Promise<Blob | null> => {
      const video = videoRef.current;
      if (!video) {
        return null;
      }

      try {
        return await cameraService.capturePhoto(video, ratio, flashMode, autoFlashArmed);
      } catch {
        return null;
      }
    },
    [autoFlashArmed, cameraService, flashMode, videoRef],
  );

  return {
    status,
    error,
    flashMode,
    autoFlashArmed,
    faces,
    capabilities,
    faceAdapterId,
    facingMode,
    cycleFlashMode,
    switchCamera,
    capturePhoto,
  };
}
