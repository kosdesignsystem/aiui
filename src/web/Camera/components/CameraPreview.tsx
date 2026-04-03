import type { ReactNode, RefObject } from 'react';
import type { AspectRatioOption, CameraFacingMode } from '../types';

type CameraPreviewProps = {
  videoRef: RefObject<HTMLVideoElement>;
  ratio: AspectRatioOption;
  facingMode: CameraFacingMode;
  switchingPhase: 'out' | 'in' | null;
  filters: {
    whiteBalance: number;
    exposure: number;
    zoom: number;
  };
  children: ReactNode;
};

const ratioClassMap: Record<AspectRatioOption, string> = {
  '4:3': 'is-ratio-4-3',
  '1:1': 'is-ratio-1-1',
  '9:16': 'is-ratio-9-16',
};

export function CameraPreview({ videoRef, ratio, facingMode, switchingPhase, filters, children }: CameraPreviewProps) {
  return (
    <section
      className={`camera-screen__preview ${ratioClassMap[ratio]}${switchingPhase ? ` is-switching-${switchingPhase}` : ''}`}
      aria-label="Camera preview"
    >
      <video
        ref={videoRef}
        className={`camera-screen__video${facingMode === 'front' ? ' is-mirrored' : ''}`}
        autoPlay
        muted
        playsInline
        style={{
          transform: `scale(${filters.zoom})`,
          filter: `brightness(${filters.exposure}) saturate(${filters.whiteBalance})`,
        }}
      />
      {children}
    </section>
  );
}
