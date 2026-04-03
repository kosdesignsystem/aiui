import React from 'react';
import { StyleSheet, View } from 'react-native';

export const GridOverlay = () => (
  <View pointerEvents="none" style={styles.root}>
    <View style={[styles.vLine, { left: '33.33%' }]} />
    <View style={[styles.vLine, { left: '66.66%' }]} />
    <View style={[styles.hLine, { top: '33.33%' }]} />
    <View style={[styles.hLine, { top: '66.66%' }]} />
  </View>
);

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
  },
  vLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  hLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
});
