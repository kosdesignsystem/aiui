import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';
import { TOOLS_PANEL_FADE_MS } from '../constants/camera';
import type { PlatformCapabilities, ToolType } from '../types/camera';

interface Props {
  open: boolean;
  activeTool: ToolType | null;
  capabilities: PlatformCapabilities;
  values: { zoom: number; whiteBalance: number; exposure: number };
  onToggleTool: (tool: ToolType) => void;
  onZoom: (value: number) => void;
  onWhiteBalance: (value: number) => void;
  onExposure: (value: number) => void;
}

const ToolButton = ({
  label,
  active,
  disabled,
  onPress,
}: {
  label: string;
  active: boolean;
  disabled: boolean;
  onPress: () => void;
}) => (
  <Pressable onPress={onPress} disabled={disabled} style={[styles.toolBtn, active && styles.activeBtn, disabled && styles.disabled]}>
    <Text style={styles.toolText}>{label}</Text>
  </Pressable>
);

const Slider = ({ value, onChange }: { value: number; onChange: (value: number) => void }) => (
  <View style={styles.sliderRow}>
    {[0, 0.25, 0.5, 0.75, 1].map((step) => (
      <Pressable key={step} style={[styles.tick, value >= step && styles.tickOn]} onPress={() => onChange(step)} />
    ))}
  </View>
);

export const ToolsPanel = ({
  open,
  activeTool,
  capabilities,
  values,
  onToggleTool,
  onZoom,
  onWhiteBalance,
  onExposure,
}: Props) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: open ? 1 : 0,
      duration: TOOLS_PANEL_FADE_MS,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [open, opacity]);

  if (!open) return null;

  return (
    <Animated.View style={[styles.root, { opacity }]}>
      <View style={styles.toolsRow}>
        <ToolButton
          label="Zoom"
          active={activeTool === 'zoom'}
          disabled={capabilities.zoom.state === 'unsupported' || capabilities.zoom.state === 'blocked'}
          onPress={() => onToggleTool('zoom')}
        />
        <ToolButton
          label="WB"
          active={activeTool === 'whiteBalance'}
          disabled={capabilities.whiteBalance.state === 'unsupported' || capabilities.whiteBalance.state === 'blocked'}
          onPress={() => onToggleTool('whiteBalance')}
        />
        <ToolButton
          label="EV"
          active={activeTool === 'exposure'}
          disabled={capabilities.exposure.state === 'unsupported' || capabilities.exposure.state === 'blocked'}
          onPress={() => onToggleTool('exposure')}
        />
      </View>
      {activeTool === 'zoom' && <Slider value={values.zoom} onChange={onZoom} />}
      {activeTool === 'whiteBalance' && <Slider value={values.whiteBalance} onChange={onWhiteBalance} />}
      {activeTool === 'exposure' && <Slider value={Math.max(0, Math.min(1, (values.exposure + 1) / 2))} onChange={(v) => onExposure(v * 2 - 1)} />}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 160,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.48)',
    padding: 12,
  },
  toolsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  toolBtn: {
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  activeBtn: {
    backgroundColor: '#f5db27',
  },
  disabled: {
    opacity: 0.5,
  },
  toolText: {
    color: '#fff',
    fontWeight: '600',
  },
  sliderRow: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tick: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.28)',
  },
  tickOn: {
    backgroundColor: '#fff',
  },
});
