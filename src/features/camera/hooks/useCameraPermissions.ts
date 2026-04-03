import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

interface PermissionState {
  loading: boolean;
  granted: boolean;
  blocked: boolean;
}

export const useCameraPermissions = () => {
  const [state, setState] = useState<PermissionState>({ loading: true, granted: false, blocked: false });

  useEffect(() => {
    const request = async () => {
      try {
        if (Platform.OS === 'web') {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
          stream.getTracks().forEach((track) => track.stop());
          setState({ loading: false, granted: true, blocked: false });
          return;
        }

        const { Camera } = await import('react-native-vision-camera');
        const status = await Camera.requestCameraPermission();
        setState({ loading: false, granted: status === 'granted', blocked: status === 'denied' });
      } catch {
        setState({ loading: false, granted: false, blocked: true });
      }
    };

    void request();
  }, []);

  return state;
};
