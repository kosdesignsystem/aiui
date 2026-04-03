import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import type { CameraFacing } from '../types/camera';

export const CameraPreview = ({
  onReady,
  facing,
}: {
  onReady: (target: Camera) => void;
  facing: CameraFacing;
}) => {
  const position = useMemo(() => (facing === 'front' ? 'front' : 'back'), [facing]);
  const device = useCameraDevice(position);

  if (!device) return null;

  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive
      photo
      ref={onReady}
    />
  );
};
