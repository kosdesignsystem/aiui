import { useCallback, useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import {
  OVERLAY_HIDE_DELAY_MS,
  OVERLAY_HIDE_DURATION_MS,
  OVERLAY_SHOW_DURATION_MS,
} from '../constants/camera';

export const useOverlayVisibility = () => {
  const opacity = useRef(new Animated.Value(0)).current;
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHideTimer = useCallback(() => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  }, []);

  const triggerVisible = useCallback(() => {
    clearHideTimer();
    Animated.timing(opacity, {
      toValue: 1,
      duration: OVERLAY_SHOW_DURATION_MS,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    hideTimer.current = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: OVERLAY_HIDE_DURATION_MS,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
      hideTimer.current = null;
    }, OVERLAY_HIDE_DELAY_MS);
  }, [clearHideTimer, opacity]);

  useEffect(() => clearHideTimer, [clearHideTimer]);

  return { opacity, triggerVisible, clearHideTimer };
};
