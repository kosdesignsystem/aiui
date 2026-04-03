import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import type { FaceBounds } from '../types/camera';

export const FaceOvalOverlay = ({ faces, opacity }: { faces: FaceBounds[]; opacity: Animated.Value }) => (
  <Animated.View pointerEvents="none" style={[styles.root, { opacity }]}> 
    {faces.map((face, index) => (
      <View
        key={`${face.trackingId ?? index}-${Math.round(face.x)}`}
        style={[styles.oval, { left: face.x, top: face.y, width: face.width, height: face.height }]}
      />
    ))}
  </Animated.View>
);

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
  },
  oval: {
    position: 'absolute',
    borderColor: '#f5db27',
    borderWidth: 2,
    borderRadius: 999,
  },
});
