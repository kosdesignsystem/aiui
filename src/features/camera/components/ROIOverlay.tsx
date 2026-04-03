import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export const ROIOverlay = ({ opacity }: { opacity: Animated.Value }) => (
  <Animated.View pointerEvents="none" style={[styles.root, { opacity }]}> 
    <View style={styles.square} />
  </Animated.View>
);

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    width: '58%',
    aspectRatio: 1,
    borderColor: '#f5db27',
    borderWidth: 2,
    borderRadius: 12,
  },
});
