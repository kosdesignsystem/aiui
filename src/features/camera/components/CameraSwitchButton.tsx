import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

export const CameraSwitchButton = ({ onPress, disabled }: { onPress: () => void; disabled?: boolean }) => (
  <Pressable style={[styles.btn, disabled && styles.disabled]} disabled={disabled} onPress={onPress}>
    <Text style={styles.label}>Switch</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  btn: { padding: 12, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.22)' },
  label: { color: '#fff', fontWeight: '700' },
  disabled: { opacity: 0.4 },
});
