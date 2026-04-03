import type { AspectRatio } from '../types/camera';

export const FACE_DETECTION_INTERVAL_MS = 180;
export const OVERLAY_SHOW_DURATION_MS = 200;
export const OVERLAY_HIDE_DELAY_MS = 2200;
export const OVERLAY_HIDE_DURATION_MS = 200;
export const TOOLS_PANEL_FADE_MS = 120;
export const CAMERA_SWITCH_FLIP_MS = 200;

export const SUPPORTED_RATIOS: AspectRatio[] = ['4:3', '1:1', '9:16'];

export const DEFAULT_CONTROLS = {
  zoom: 0,
  whiteBalance: 0.5,
  exposure: 0,
} as const;
