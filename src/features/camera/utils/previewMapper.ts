import type { AspectRatio, FaceBounds, NormalizedFaceBounds, PreviewLayout } from '../types/camera';

const ratioToValue = (ratio: AspectRatio): number => {
  switch (ratio) {
    case '1:1':
      return 1;
    case '9:16':
      return 9 / 16;
    case '4:3':
    default:
      return 4 / 3;
  }
};

export const toNormalizedFaceBounds = (
  raw: { x: number; y: number; width: number; height: number },
  frameWidth: number,
  frameHeight: number,
): NormalizedFaceBounds => ({
  x: raw.x / frameWidth,
  y: raw.y / frameHeight,
  width: raw.width / frameWidth,
  height: raw.height / frameHeight,
});

export const mapFaceToPreview = (
  normalized: NormalizedFaceBounds,
  layout: PreviewLayout,
  ratio: AspectRatio,
  mirrored: boolean,
): FaceBounds => {
  const previewRatio = ratioToValue(ratio);
  const layoutRatio = layout.width / layout.height;

  let visibleWidth = layout.width;
  let visibleHeight = layout.height;
  let offsetX = 0;
  let offsetY = 0;

  if (layoutRatio > previewRatio) {
    visibleWidth = layout.height * previewRatio;
    offsetX = (layout.width - visibleWidth) / 2;
  } else {
    visibleHeight = layout.width / previewRatio;
    offsetY = (layout.height - visibleHeight) / 2;
  }

  const xNorm = mirrored ? 1 - normalized.x - normalized.width : normalized.x;

  return {
    x: offsetX + xNorm * visibleWidth,
    y: offsetY + normalized.y * visibleHeight,
    width: normalized.width * visibleWidth,
    height: normalized.height * visibleHeight,
  };
};
