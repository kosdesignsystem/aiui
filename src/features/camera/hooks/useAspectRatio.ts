import { useState } from 'react';
import type { AspectRatio } from '../types/camera';

export const useAspectRatio = (initial: AspectRatio = '4:3') => {
  const [ratio, setRatio] = useState<AspectRatio>(initial);
  return { ratio, setRatio };
};
