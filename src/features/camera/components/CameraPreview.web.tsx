import React, { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

export const CameraPreview = ({ onReady }: { onReady: (target: HTMLVideoElement) => void }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      onReady(videoRef.current);
    }
  }, [onReady]);

  return (
    <View style={styles.root}>
      {React.createElement('video', {
        ref: videoRef,
        style: styles.video,
        muted: true,
        autoPlay: true,
        playsInline: true,
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  video: { width: '100%', height: '100%', objectFit: 'cover' as const },
});
