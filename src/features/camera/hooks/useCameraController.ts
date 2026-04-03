import { useCallback, useMemo, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { WebCameraAdapter } from '../adapters/WebCameraAdapter';
import { NativeCameraAdapter } from '../adapters/NativeCameraAdapter';
import { DEFAULT_CONTROLS } from '../constants/camera';
import type { AspectRatio, CameraFacing, CaptureResult, FlashMode } from '../types/camera';
import type { CameraAdapter } from '../types/cameraAdapter';

const createAdapter = (): CameraAdapter => (Platform.OS === 'web' ? new WebCameraAdapter() : new NativeCameraAdapter());

export const useCameraController = () => {
  const adapterRef = useRef<CameraAdapter>(createAdapter());
  const [flashMode, setFlashMode] = useState<FlashMode>('off');
  const [facing, setFacing] = useState<CameraFacing>('back');
  const [zoom, setZoom] = useState(DEFAULT_CONTROLS.zoom);
  const [whiteBalance, setWhiteBalance] = useState(DEFAULT_CONTROLS.whiteBalance);
  const [exposure, setExposure] = useState(DEFAULT_CONTROLS.exposure);
  const [isCapturing, setCapturing] = useState(false);

  const setPreviewTarget = useCallback(async (target: unknown) => {
    await adapterRef.current.startPreview(target);
  }, []);

  const switchCamera = useCallback(async () => {
    const next: CameraFacing = facing === 'back' ? 'front' : 'back';
    setFacing(next);
    await adapterRef.current.setFacing(next);
  }, [facing]);

  const cycleFlashMode = useCallback(async () => {
    const next: FlashMode = flashMode === 'off' ? 'on' : flashMode === 'on' ? 'auto' : 'off';
    setFlashMode(next);
    await adapterRef.current.setFlash(next);
  }, [flashMode]);

  const capturePhoto = useCallback(async (ratio: AspectRatio): Promise<CaptureResult | null> => {
    if (isCapturing) return null;
    setCapturing(true);
    try {
      return await adapterRef.current.capturePhoto(ratio);
    } finally {
      setCapturing(false);
    }
  }, [isCapturing]);

  const updateZoom = useCallback(async (value: number) => {
    setZoom(value);
    await adapterRef.current.setZoom(value);
  }, []);

  const updateWhiteBalance = useCallback(async (value: number) => {
    setWhiteBalance(value);
    await adapterRef.current.setWhiteBalance(value);
  }, []);

  const updateExposure = useCallback(async (value: number) => {
    setExposure(value);
    await adapterRef.current.setExposure(value);
  }, []);

  return useMemo(
    () => ({
      facing,
      flashMode,
      zoom,
      whiteBalance,
      exposure,
      isCapturing,
      setPreviewTarget,
      switchCamera,
      cycleFlashMode,
      capturePhoto,
      updateZoom,
      updateWhiteBalance,
      updateExposure,
      adapter: adapterRef.current,
    }),
    [
      cycleFlashMode,
      exposure,
      facing,
      flashMode,
      isCapturing,
      setPreviewTarget,
      switchCamera,
      updateExposure,
      updateWhiteBalance,
      updateZoom,
      whiteBalance,
      zoom,
    ],
  );
};
