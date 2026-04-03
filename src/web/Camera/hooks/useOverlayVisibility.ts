import { useCallback, useEffect, useRef, useState } from 'react';

const HIDE_DELAY_MS = 2200;

export function useOverlayVisibility() {
  const [visible, setVisible] = useState(false);
  const hideTimerRef = useRef<number | null>(null);

  const trigger = useCallback(() => {
    setVisible(true);
    if (hideTimerRef.current !== null) {
      window.clearTimeout(hideTimerRef.current);
    }

    hideTimerRef.current = window.setTimeout(() => {
      setVisible(false);
      hideTimerRef.current = null;
    }, HIDE_DELAY_MS);
  }, []);

  useEffect(
    () => () => {
      if (hideTimerRef.current !== null) {
        window.clearTimeout(hideTimerRef.current);
      }
    },
    [],
  );

  return { visible, trigger };
}
