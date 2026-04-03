import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';
import { CAMERA_SWITCH_FLIP_MS } from '../constants/camera';
import { useAspectRatio } from '../hooks/useAspectRatio';
import { useCameraController } from '../hooks/useCameraController';
import { useCameraPermissions } from '../hooks/useCameraPermissions';
import { useFaceDetection } from '../hooks/useFaceDetection';
import { useLastCapturedPhoto } from '../hooks/useLastCapturedPhoto';
import { useOverlayVisibility } from '../hooks/useOverlayVisibility';
import { usePlatformCapabilities } from '../hooks/usePlatformCapabilities';
import { useToolsPanel } from '../hooks/useToolsPanel';
import { AspectRatioSelector } from '../components/AspectRatioSelector';
import { CameraPreview } from '../components/CameraPreview';
import { CameraSwitchButton } from '../components/CameraSwitchButton';
import { CaptureButton } from '../components/CaptureButton';
import { FaceOvalOverlay } from '../components/FaceOvalOverlay';
import { FlashControl } from '../components/FlashControl';
import { GridOverlay } from '../components/GridOverlay';
import { ROIOverlay } from '../components/ROIOverlay';
import { ThumbnailPreview } from '../components/ThumbnailPreview';
import { ToolsPanel } from '../components/ToolsPanel';

export const CameraScreen = () => {
  const permission = useCameraPermissions();
  const capabilities = usePlatformCapabilities();
  const [showGrid, setShowGrid] = useState(true);
  const [previewLayout, setPreviewLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const { ratio, setRatio } = useAspectRatio('4:3');
  const { lastPhoto, setLastPhoto } = useLastCapturedPhoto();
  const tools = useToolsPanel();
  const roiOverlay = useOverlayVisibility();
  const flipAnim = useRef(new Animated.Value(1)).current;
  const webVideoRef = useRef<HTMLVideoElement>(null);

  const camera = useCameraController();
  const { faceBounds, faceOpacity } = useFaceDetection({
    ratio,
    facing: camera.facing,
    previewLayout,
    webVideoRef,
  });

  const switchCamera = useCallback(async () => {
    Animated.sequence([
      Animated.timing(flipAnim, { toValue: 0, duration: CAMERA_SWITCH_FLIP_MS / 2, easing: Easing.out(Easing.ease), useNativeDriver: true }),
      Animated.timing(flipAnim, { toValue: 1, duration: CAMERA_SWITCH_FLIP_MS / 2, easing: Easing.out(Easing.ease), useNativeDriver: true }),
    ]).start();

    await camera.switchCamera();
  }, [camera, flipAnim]);

  const onCapture = useCallback(async () => {
    roiOverlay.triggerVisible();
    const photo = await camera.capturePhoto(ratio);
    if (photo) setLastPhoto(photo);
  }, [camera, ratio, roiOverlay, setLastPhoto]);

  const previewTransform = useMemo(() => [{ scaleX: flipAnim }], [flipAnim]);

  if (permission.loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#fff" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>Camera permission is required.</Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <Animated.View
        style={[styles.previewContainer, { transform: previewTransform }]}
        onLayout={(event) => setPreviewLayout(event.nativeEvent.layout)}
      >
        <CameraPreview
          facing={camera.facing}
          onReady={(target) => {
            if (target instanceof HTMLVideoElement) webVideoRef.current = target;
            void camera.setPreviewTarget(target);
          }}
        />
        {showGrid && <GridOverlay />}
        <ROIOverlay opacity={roiOverlay.opacity} />
        <FaceOvalOverlay faces={faceBounds} opacity={faceOpacity} />
      </Animated.View>

      <View style={styles.topBar}>
        <Pressable onPress={tools.togglePanel}><Text style={styles.icon}>☰</Text></Pressable>
        <FlashControl mode={camera.flashMode} onPress={camera.cycleFlashMode} disabled={capabilities.flash.state !== 'supported'} />
        <Pressable onPress={() => setShowGrid((v) => !v)}><Text style={styles.icon}>#</Text></Pressable>
      </View>

      <ToolsPanel
        open={tools.isOpen}
        activeTool={tools.activeTool}
        capabilities={capabilities}
        values={{ zoom: camera.zoom, whiteBalance: camera.whiteBalance, exposure: camera.exposure }}
        onToggleTool={tools.toggleTool}
        onZoom={camera.updateZoom}
        onWhiteBalance={camera.updateWhiteBalance}
        onExposure={camera.updateExposure}
      />

      <View style={styles.controls}>
        <ThumbnailPreview photo={lastPhoto} />
        <CaptureButton onPress={onCapture} disabled={camera.isCapturing} />
        <CameraSwitchButton onPress={switchCamera} disabled={capabilities.cameraSwitch.state === 'blocked'} />
      </View>

      <View style={styles.bottomBar}>
        <AspectRatioSelector value={ratio} onChange={setRatio} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#040714' },
  previewContainer: { flex: 1, overflow: 'hidden' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' },
  message: { color: '#fff', fontSize: 16 },
  topBar: {
    position: 'absolute',
    top: 40,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controls: {
    position: 'absolute',
    bottom: 72,
    left: 24,
    right: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
  },
  icon: { color: '#fff', fontSize: 24 },
});
