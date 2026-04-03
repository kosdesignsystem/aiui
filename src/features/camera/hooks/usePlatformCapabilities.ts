import { useMemo } from 'react';
import { getPlatformCapabilities } from '../services/capabilityService';

export const usePlatformCapabilities = () => {
  return useMemo(() => getPlatformCapabilities(), []);
};
