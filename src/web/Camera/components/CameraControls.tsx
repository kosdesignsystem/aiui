import type { AspectRatioOption, CameraCapabilities, FlashMode } from '../types';

type CameraControlsProps = {
  flashMode: FlashMode;
  autoFlashArmed: boolean;
  capabilities: CameraCapabilities;
  hasThumbnail: boolean;
  thumbnailUrl: string | null;
  ratio: AspectRatioOption;
  canSwitchCamera: boolean;
  onFlashClick: () => void;
  onGridClick: () => void;
  gridEnabled: boolean;
  onToolsToggle: () => void;
  onCapture: () => void;
  onSwitchCamera: () => void;
  onRatioChange: (ratio: AspectRatioOption) => void;
};

const ratioOptions: AspectRatioOption[] = ['4:3', '1:1', '9:16'];

export function CameraControls(props: CameraControlsProps) {
  const {
    flashMode,
    autoFlashArmed,
    capabilities,
    hasThumbnail,
    thumbnailUrl,
    ratio,
    canSwitchCamera,
    onFlashClick,
    onGridClick,
    gridEnabled,
    onToolsToggle,
    onCapture,
    onSwitchCamera,
    onRatioChange,
  } = props;

  return (
    <>
      <header className="camera-screen__top">
        <button type="button" className="camera-screen__icon-button" onClick={onToolsToggle}>
          ☰
        </button>
        <div className="camera-screen__top-right">
          <button
            type="button"
            className="camera-screen__icon-button"
            onClick={onFlashClick}
            disabled={capabilities.flash.state === 'unsupported'}
          >
            {flashMode === 'off' ? '⚡︎' : flashMode === 'auto' ? (autoFlashArmed ? '⚡︎A*' : '⚡︎A') : '⚡︎ON'}
          </button>
          <button type="button" className={`camera-screen__icon-button${gridEnabled ? ' is-active' : ''}`} onClick={onGridClick}>
            #
          </button>
        </div>
      </header>

      <div className="camera-screen__ratio">
        {ratioOptions.map((option) => (
          <button
            key={option}
            type="button"
            className={`camera-screen__ratio-button${ratio === option ? ' is-active' : ''}`}
            onClick={() => onRatioChange(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <footer className="camera-screen__controls">
        <div className={`camera-screen__thumb${hasThumbnail ? ' has-photo' : ''}`}>
          {thumbnailUrl ? <img src={thumbnailUrl} alt="Latest capture" /> : null}
        </div>
        <button type="button" className="camera-screen__shutter" onClick={onCapture} aria-label="Capture photo" />
        <button
          type="button"
          className="camera-screen__switch"
          onClick={onSwitchCamera}
          disabled={!canSwitchCamera}
          aria-label="Switch camera"
        >
          ↻
        </button>
      </footer>
    </>
  );
}
