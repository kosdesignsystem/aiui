# Camera Feature (React Native + Web)

This module contains a production-oriented camera architecture with adapter boundaries for:

- Native camera preview/capture (`react-native-vision-camera`)
- Web camera preview/capture (`navigator.mediaDevices.getUserMedia`)
- Face detection strategy chain (Shape Detection API first, TensorFlow.js fallback)

## Why this solves iOS Web constraints

`window.FaceDetector` is not required. On web, adapters are tried in this order:

1. `WebFaceDetectionAdapter` (Shape Detection API where available)
2. `WebFallbackFaceDetectionAdapter` (TensorFlow.js + BlazeFace)

This means iOS browsers can still run face detection through the TFJS fallback path.

## Integration

Use `CameraScreen` from `src/features/camera/screens/CameraScreen.tsx`.
