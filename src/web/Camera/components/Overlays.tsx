import type { FaceOverlayBounds } from '../types';

type OverlayProps = {
  visible: boolean;
};

export function GridOverlay() {
  return <div className="camera-screen__grid" aria-hidden="true" />;
}

export function ROIOverlay({ visible }: OverlayProps) {
  return <div className={`camera-screen__roi${visible ? ' is-visible' : ''}`} aria-hidden="true" />;
}

export function FaceOverlay({ visible, faces }: OverlayProps & { faces: FaceOverlayBounds[] }) {
  return (
    <>
      {faces.map((face) => (
        <div
          key={face.id}
          className={`camera-screen__face-oval${visible ? ' is-visible' : ''}`}
          style={{
            left: `${face.left * 100}%`,
            top: `${face.top * 100}%`,
            width: `${face.width * 100}%`,
            height: `${face.height * 100}%`,
          }}
          aria-hidden="true"
        />
      ))}
    </>
  );
}
