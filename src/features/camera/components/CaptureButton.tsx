import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

export const CaptureButton = ({ onPress, disabled }: { onPress: () => void; disabled?: boolean }) => (
  <Pressable onPress={onPress} disabled={disabled} style={[styles.outer, disabled && styles.disabled]}>
    <View style={styles.inner} />
  </Pressable>
);

const styles = StyleSheet.create({
  outer: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: '#fff',
  },
  disabled: { opacity: 0.6 },
});
