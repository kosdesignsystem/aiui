import { useMemo, useState } from 'react';
import type { ToolType } from '../types/camera';

export const useToolsPanel = () => {
  const [isOpen, setOpen] = useState(false);
  const [activeTool, setActiveTool] = useState<ToolType | null>(null);

  const togglePanel = () => {
    setOpen((prev) => {
      if (prev) setActiveTool(null);
      return !prev;
    });
  };

  const toggleTool = (tool: ToolType) => {
    setOpen(true);
    setActiveTool((current) => (current === tool ? null : tool));
  };

  return useMemo(
    () => ({
      isOpen,
      activeTool,
      togglePanel,
      toggleTool,
    }),
    [activeTool, isOpen],
  );
};
