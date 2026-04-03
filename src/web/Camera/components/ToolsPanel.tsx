import type { CameraCapabilities, ToolKey } from '../types';

type ToolPanelProps = {
  open: boolean;
  activeTool: ToolKey | null;
  capabilities: CameraCapabilities;
  values: Record<ToolKey, number>;
  onToggleTool: (tool: ToolKey) => void;
  onChange: (tool: ToolKey, value: number) => void;
};

const labels: Record<ToolKey, string> = {
  zoom: 'Zoom',
  whiteBalance: 'WB',
  exposure: 'Exp',
};

const capabilityMap: Record<ToolKey, keyof CameraCapabilities> = {
  zoom: 'zoom',
  whiteBalance: 'whiteBalance',
  exposure: 'exposure',
};

export function ToolsPanel({ open, activeTool, capabilities, values, onToggleTool, onChange }: ToolPanelProps) {
  return (
    <div className={`camera-screen__tools${open ? ' is-open' : ''}`}>
      <div className="camera-screen__tools-row">
        {(Object.keys(labels) as ToolKey[]).map((tool) => {
          const capability = capabilities[capabilityMap[tool]];
          const disabled = capability.state === 'unsupported';
          return (
            <button
              type="button"
              key={tool}
              className={`camera-screen__tool-button${activeTool === tool ? ' is-active' : ''}`}
              onClick={() => onToggleTool(tool)}
              disabled={disabled}
              title={capability.reason}
            >
              {labels[tool]}
            </button>
          );
        })}
      </div>

      {activeTool ? (
        <div className="camera-screen__slider-wrap">
          <input
            type="range"
            min={0}
            max={100}
            value={values[activeTool]}
            onChange={(event) => onChange(activeTool, Number(event.target.value))}
            aria-label={`${labels[activeTool]} control`}
          />
        </div>
      ) : null}
    </div>
  );
}
