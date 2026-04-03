import { useEffect, useMemo, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { NativeFaceDetectionAdapter } from '../adapters/NativeFaceDetectionAdapter';
import { WebFaceDetectionAdapter } from '../adapters/WebFaceDetectionAdapter';
import { WebFallbackFaceDetectionAdapter } from '../adapters/WebFallbackFaceDetectionAdapter';
import { FaceDetectionService } from '../services/faceDetectionService';
import { mapFaceToPreview } from '../utils/previewMapper';
import type { AspectRatio, FaceBounds, PreviewLayout } from '../types/camera';
import { useOverlayVisibility } from './useOverlayVisibility';

interface UseFaceDetectionInput {
  ratio: AspectRatio;
  facing: 'front' | 'back';
  previewLayout: PreviewLayout | null;
  webVideoRef?: React.RefObject<HTMLVideoElement>;
}

export const useFaceDetection = ({ ratio, facing, previewLayout, webVideoRef }: UseFaceDetectionInput) => {
  const [faceBounds, setFaceBounds] = useState<FaceBounds[]>([]);
  const { opacity, triggerVisible } = useOverlayVisibility();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const service = useMemo(() => {
    const adapters = Platform.OS === 'web'
      ? [new WebFaceDetectionAdapter(), new WebFallbackFaceDetectionAdapter()]
      : [new NativeFaceDetectionAdapter()];

    return new FaceDetectionService(adapters);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const getFrame = () => {
      if (Platform.OS !== 'web') return null;
      const video = webVideoRef?.current;
      if (!video || !previewLayout) return null;
      if (!video.videoWidth || !video.videoHeight) return null;

      if (!canvasRef.current) canvasRef.current = document.createElement('canvas');
      const canvas = canvasRef.current;
      canvas.width = 320;
      canvas.height = Math.round((video.videoHeight / video.videoWidth) * 320);
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return null;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      return { width: canvas.width, height: canvas.height, timestamp: Date.now(), imageData };
    };

    void service.initialize().then(() => {
      if (cancelled) return;
      service.start(getFrame, (faces) => {
        if (!previewLayout) return;
        if (faces.length === 0) return;
        triggerVisible();
        setFaceBounds(
          faces.map((face) => mapFaceToPreview(face, previewLayout, ratio, facing === 'front')),
        );
      });
    });

    return () => {
      cancelled = true;
      void service.dispose();
    };
  }, [facing, previewLayout, ratio, service, triggerVisible, webVideoRef]);

  return { faceBounds, faceOpacity: opacity };
};
