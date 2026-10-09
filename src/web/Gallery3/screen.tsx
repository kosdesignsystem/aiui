import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { PhotoScreen } from '../Gallery/screen';
import { allPhotos } from '../Gallery2/photos';
import { GalleryChrome } from './screen.parts';
import './screen.scss';

type TileRect = {
	left: number;
	top: number;
	width: number;
	height: number;
};

const GRID_TRANSITION_DURATION = 320;
const GRID_TRANSITION_EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';

export function GalleryScreen() {
	const hostRef = useRef<HTMLDivElement | null>(null);
	const previousTileRectsRef = useRef<Map<HTMLElement, TileRect> | null>(null);
	const tileAnimationsRef = useRef<Animation[]>([]);
	const [density, setDensity] = useState(3);

	const stopTileAnimations = () => {
		tileAnimationsRef.current.forEach((animation) => animation.cancel());
		tileAnimationsRef.current = [];
	};

	const handleDensityChange = (nextDensity: number) => {
		if (nextDensity === density) {
			return;
		}

		const tiles = hostRef.current?.querySelectorAll<HTMLElement>('.gallery-screen__thumb');
		const previousTileRects = new Map<HTMLElement, TileRect>();

		tiles?.forEach((tile) => {
			const { left, top, width, height } = tile.getBoundingClientRect();
			previousTileRects.set(tile, { left, top, width, height });
		});

		previousTileRectsRef.current = previousTileRects;
		stopTileAnimations();
		setDensity(nextDensity);
	};

	useLayoutEffect(() => {
		const previousTileRects = previousTileRectsRef.current;
		previousTileRectsRef.current = null;

		if (!previousTileRects || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			return;
		}

		const animations: Animation[] = [];

		previousTileRects.forEach((previousRect, tile) => {
			if (!tile.isConnected) {
				return;
			}

			const nextRect = tile.getBoundingClientRect();
			if (!nextRect.width || !nextRect.height) {
				return;
			}

			const deltaX = previousRect.left - nextRect.left;
			const deltaY = previousRect.top - nextRect.top;
			const scaleX = previousRect.width / nextRect.width;
			const scaleY = previousRect.height / nextRect.height;

			if (
				Math.abs(deltaX) < 0.5 &&
				Math.abs(deltaY) < 0.5 &&
				Math.abs(scaleX - 1) < 0.005 &&
				Math.abs(scaleY - 1) < 0.005
			) {
				return;
			}

			const animation = tile.animate(
				[
					{
						transformOrigin: '0 0',
						transform: `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${scaleX}, ${scaleY})`,
					},
					{
						transformOrigin: '0 0',
						transform: 'translate3d(0, 0, 0) scale(1)',
					},
				],
				{
					duration: GRID_TRANSITION_DURATION,
					easing: GRID_TRANSITION_EASING,
				},
			);

			animations.push(animation);
		});

		tileAnimationsRef.current = animations;

		return stopTileAnimations;
	}, [density]);

	return (
		<div
			ref={hostRef}
			className="gallery3-host"
			data-density={density}
			style={{ '--gallery3-columns': density } as CSSProperties}
		>
			<PhotoScreen
				className="gallery3-photo-screen"
				title="Все фото"
				photos={allPhotos}
				showMarks={false}
				renderOverlayControls={({ activePhoto, closeViewer, viewerPhase }) => (
					<GalleryChrome
						active="all"
						density={density}
						onDensityChange={handleDensityChange}
						viewerPhoto={activePhoto}
						viewerPhase={viewerPhase}
						onViewerClose={closeViewer}
					/>
				)}
			/>
		</div>
	);
}
