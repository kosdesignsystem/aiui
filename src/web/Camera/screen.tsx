import { useEffect, useRef, useState } from 'react';
import { App } from '../../ui/App';
import { CameraControls } from './components/CameraControls';
import { CameraPreview } from './components/CameraPreview';
import { FaceOverlay, GridOverlay, ROIOverlay } from './components/Overlays';
import { ToolsPanel } from './components/ToolsPanel';
import { useCameraController } from './hooks/useCameraController';
import { useOverlayVisibility } from './hooks/useOverlayVisibility';
import type { AspectRatioOption, ToolKey } from './types';
import './screen.scss';

export function CameraScreen() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [gridEnabled, setGridEnabled] = useState(true);
  const [ratio, setRatio] = useState<AspectRatioOption>('4:3');
  const [toolsOpen, setToolsOpen] = useState(false);
  const [activeTool, setActiveTool] = useState<ToolKey | null>(null);
  const [toolValues, setToolValues] = useState<Record<ToolKey, number>>({ zoom: 0, whiteBalance: 50, exposure: 50 });
  const [switchPhase, setSwitchPhase] = useState<'out' | 'in' | null>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const thumbnailRef = useRef<string | null>(null);
  const roiOverlay = useOverlayVisibility();
  const faceOverlay = useOverlayVisibility();

  const camera = useCameraController(videoRef);

  useEffect(() => {
    if (camera.faces.length > 0) {
      faceOverlay.trigger();
    }
  }, [camera.faces.length, faceOverlay]);

  useEffect(
    () => () => {
      if (thumbnailRef.current) {
        URL.revokeObjectURL(thumbnailRef.current);
      }
    },
    [],
  );

  const handleCapture = async () => {
    roiOverlay.trigger();
    const blob = await camera.capturePhoto(ratio);
    if (!blob) {
      return;
    }

    const url = URL.createObjectURL(blob);
    if (thumbnailRef.current) {
      URL.revokeObjectURL(thumbnailRef.current);
    }

    thumbnailRef.current = url;
    setThumbnailUrl(url);
  };

  const handleSwitchCamera = () => {
    if (camera.capabilities.switchCamera.state === 'unsupported') {
      return;
    }

    setSwitchPhase('out');
    window.setTimeout(async () => {
      await camera.switchCamera();
      setSwitchPhase('in');
      window.setTimeout(() => setSwitchPhase(null), 100);
    }, 100);
  };

  const handleToolChange = (tool: ToolKey, value: number) => {
    setToolValues((current) => ({ ...current, [tool]: value }));
  };

  return (
    <App>
      <div className="camera-screen">
        <CameraControls
          flashMode={camera.flashMode}
          autoFlashArmed={camera.autoFlashArmed}
          capabilities={camera.capabilities}
          hasThumbnail={Boolean(thumbnailUrl)}
          thumbnailUrl={thumbnailUrl}
          ratio={ratio}
          canSwitchCamera={camera.capabilities.switchCamera.state !== 'unsupported'}
          onFlashClick={camera.cycleFlashMode}
          onGridClick={() => setGridEnabled((current) => !current)}
          gridEnabled={gridEnabled}
          onToolsToggle={() => setToolsOpen((current) => !current)}
          onCapture={() => void handleCapture()}
          onSwitchCamera={handleSwitchCamera}
          onRatioChange={setRatio}
        />

        <CameraPreview
          videoRef={videoRef}
          ratio={ratio}
          facingMode={camera.facingMode}
          switchingPhase={switchPhase}
          filters={{
            zoom: 1 + toolValues.zoom / 200,
            whiteBalance: 0.8 + toolValues.whiteBalance / 100,
            exposure: 0.7 + toolValues.exposure / 100,
          }}
        >
          {gridEnabled ? <GridOverlay /> : null}
          <ROIOverlay visible={roiOverlay.visible} />
          <FaceOverlay visible={faceOverlay.visible} faces={camera.faces} />

          {camera.status === 'loading' ? <div className="camera-screen__overlay">Starting camera…</div> : null}
          {camera.status === 'error' ? <div className="camera-screen__overlay is-error">{camera.error}</div> : null}
          <div className="camera-screen__capability-note">
            Face detection: {camera.faceAdapterId ?? 'Unavailable'}
            {camera.capabilities.faceDetection.reason ? ` · ${camera.capabilities.faceDetection.reason}` : ''}
          </div>
        </CameraPreview>

        <ToolsPanel
          open={toolsOpen}
          activeTool={activeTool}
          capabilities={camera.capabilities}
          values={toolValues}
          onToggleTool={(tool) => setActiveTool((current) => (current === tool ? null : tool))}
          onChange={handleToolChange}
        />
      </div>
    </App>
  );
}
