import { Platform } from 'react-native';
import type { PlatformCapabilities } from '../types/camera';

export const getPlatformCapabilities = (): PlatformCapabilities => {
  if (Platform.OS === 'web') {
    const supportsMedia = typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia;
    return {
      flash: { state: 'unsupported', reason: 'Torch control is not reliable on mobile browsers.' },
      zoom: { state: 'partial', reason: 'Digital zoom may be emulated via CSS crop only.' },
      whiteBalance: { state: 'fallback', reason: 'Applied as post-process filter when hardware control unavailable.' },
      exposure: { state: 'fallback', reason: 'Applied as visual compensation when capture API has no exposure controls.' },
      faceDetection: {
        state: supportsMedia ? 'fallback' : 'blocked',
        reason: supportsMedia
          ? 'Uses Shape Detection when available and falls back to TensorFlow.js.'
          : 'Camera stream unavailable.',
      },
      cameraSwitch: { state: supportsMedia ? 'partial' : 'blocked', reason: 'Depends on available facingMode constraints.' },
    };
  }

  return {
    flash: { state: 'supported' },
    zoom: { state: 'supported' },
    whiteBalance: { state: 'partial', reason: 'Depends on device support surface.' },
    exposure: { state: 'partial', reason: 'Depends on camera format and device support.' },
    faceDetection: { state: 'supported' },
    cameraSwitch: { state: 'supported' },
  };
};
