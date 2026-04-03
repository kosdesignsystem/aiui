import { useState } from 'react';
import type { CaptureResult } from '../types/camera';

export const useLastCapturedPhoto = () => {
  const [lastPhoto, setLastPhoto] = useState<CaptureResult | null>(null);
  return { lastPhoto, setLastPhoto };
};
