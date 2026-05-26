import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import type { FlashMode } from '../types/camera';

export const FlashControl = ({ mode, onPress, disabled }: { mode: FlashMode; onPress: () => void; disabled?: boolean }) => (
  <Pressable onPress={onPress} disabled={disabled} style={[styles.btn, disabled && styles.disabled]}>
    <Text style={styles.label}>Flash: {mode.toUpperCase()}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  btn: { padding: 8, borderRadius: 12, backgroundColor: 'rgba(0,0,0,0.35)' },
  disabled: { opacity: 0.4 },
  label: { color: '#fff', fontSize: 12, fontWeight: '700' },
});
