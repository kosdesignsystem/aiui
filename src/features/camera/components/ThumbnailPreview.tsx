import React from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';
import type { CaptureResult } from '../types/camera';

interface Props {
  photo: CaptureResult | null;
}

export const ThumbnailPreview = ({ photo }: Props) => {
  return (
    <Animated.View style={[styles.container, { opacity: photo ? 1 : 0 }]}>
      <View style={styles.mask}>
        {photo ? (
          <Image
            source={{ uri: photo.uri }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : null}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 72,
    height: 72,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  mask: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#111',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
