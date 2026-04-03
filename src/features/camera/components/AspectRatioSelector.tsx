import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SUPPORTED_RATIOS } from '../constants/camera';
import type { AspectRatio } from '../types/camera';

export const AspectRatioSelector = ({ value, onChange }: { value: AspectRatio; onChange: (ratio: AspectRatio) => void }) => (
  <View style={styles.row}>
    {SUPPORTED_RATIOS.map((ratio) => (
      <Pressable key={ratio} onPress={() => onChange(ratio)} style={[styles.button, value === ratio && styles.active]}>
        <Text style={styles.label}>{ratio}</Text>
      </Pressable>
    ))}
  </View>
);

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 8 },
  button: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.24)' },
  active: { backgroundColor: '#f5db27' },
  label: { color: '#fff', fontWeight: '700' },
});
