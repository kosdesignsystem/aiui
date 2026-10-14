import {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
	type CSSProperties,
	type PointerEvent as ReactPointerEvent,
} from 'react';
import albumsBackdrop from '../../assets/gallery/gallery3-albums-backdrop.png';
import { App } from '../../ui/App';
import type { GalleryAlbum, GalleryPhoto } from '../Gallery/model';
import { PhotoScreen } from '../Gallery/screen';
import { allPhotos, favoritePhotos } from '../Gallery2/photos';
import { GalleryChrome } from './screen.parts';
import './screen.scss';

const ALBUM_PHOTO_COUNT = 52;
const PREVIEW_TILE_COUNT = 36;

function selectAlbumPhotos(start: number, step: number) {
	return Array.from(
		{ length: Math.min(ALBUM_PHOTO_COUNT, allPhotos.length) },
		(_, index) => allPhotos[(start + index * step) % allPhotos.length],
	);
}

const albums: GalleryAlbum[] = [
	{ id: 'all', title: 'Все', photos: allPhotos },
	{ id: 'favorites', title: 'Избранные', photos: favoritePhotos },
	{ id: 'production', title: 'Делишки', photos: selectAlbumPhotos(0, 3) },
	{ id: 'documents', title: 'Коллеги', photos: selectAlbumPhotos(1, 3) },
	{ id: 'travel', title: 'Путешествия', photos: selectAlbumPhotos(2, 3) },
];

function getPreviewPhotos(photos: GalleryPhoto[]) {
	return photos.slice(0, PREVIEW_TILE_COUNT);
}

export function AlbumsScreen() {
	const [activeIndex, setActiveIndex] = useState(0);
	const [activeAlbumId, setActiveAlbumId] = useState<string | null>(null);
	const [isEntering, setIsEntering] = useState(true);
	const [isExpanding, setIsExpanding] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const [density, setDensity] = useState(3);
	const [viewerPhoto, setViewerPhoto] = useState<GalleryPhoto | null>(null);
	const [viewerPhase, setViewerPhase] = useState<'opening' | 'open' | 'closing' | null>(null);
	const viewerCloseRef = useRef<(() => void) | null>(null);
	const activeCardRef = useRef<HTMLButtonElement | null>(null);
	const albumShellRef = useRef<HTMLDivElement | null>(null);
	const albumCloseAnimationRef = useRef<Animation | null>(null);
	const dragStartXRef = useRef<number | null>(null);
	const suppressClickRef = useRef(false);

	const selectedAlbum = albums[activeIndex];
	const activeAlbum = useMemo(
		() => albums.find((album) => album.id === activeAlbumId) ?? null,
		[activeAlbumId],
	);

	const handleViewerStateChange = useCallback(
		({
			activePhoto,
			closeViewer,
			viewerPhase: nextViewerPhase,
		}: {
			activePhoto: GalleryPhoto | null;
			closeViewer: () => void;
			viewerPhase: 'opening' | 'open' | 'closing' | null;
		}) => {
			viewerCloseRef.current = closeViewer;
			setViewerPhoto((current) =>
				current?.id === activePhoto?.id ? current : activePhoto,
			);
			setViewerPhase(nextViewerPhase);
		},
		[],
	);

	useEffect(() => {
		let secondFrame = 0;
		const firstFrame = window.requestAnimationFrame(() => {
			secondFrame = window.requestAnimationFrame(() => setIsEntering(false));
		});

		return () => {
			window.cancelAnimationFrame(firstFrame);
			window.cancelAnimationFrame(secondFrame);
		};
	}, []);

	useEffect(
		() => () => {
			albumCloseAnimationRef.current?.cancel();
		},
		[],
	);

	useEffect(() => {
		if (!isExpanding) {
			return undefined;
		}

		const fallback = window.setTimeout(() => {
			setActiveAlbumId(selectedAlbum.id);
			setIsExpanding(false);
		}, 520);

		return () => window.clearTimeout(fallback);
	}, [isExpanding, selectedAlbum.id]);

	const openSelectedAlbum = () => {
		if (!isExpanding) {
			setIsExpanding(true);
		}
	};

	const finishAlbumExpansion = () => {
		if (!isExpanding) {
			return;
		}

		setActiveAlbumId(selectedAlbum.id);
		setIsExpanding(false);
	};

	const finishAlbumClose = () => {
		setActiveAlbumId(null);
		setIsClosing(false);
		setViewerPhoto(null);
		setViewerPhase(null);
		viewerCloseRef.current = null;
	};

	const closeAlbum = () => {
		if (isClosing || viewerPhoto) {
			return;
		}

		const shell = albumShellRef.current;
		const target = activeCardRef.current;

		setIsClosing(true);

		if (
			!shell ||
			!target ||
			window.matchMedia('(prefers-reduced-motion: reduce)').matches
		) {
			finishAlbumClose();
			return;
		}

		const shellRect = shell.getBoundingClientRect();
		const targetRect = target.getBoundingClientRect();
		const translateX =
			targetRect.left + targetRect.width / 2 - (shellRect.left + shellRect.width / 2);
		const translateY =
			targetRect.top + targetRect.height / 2 - (shellRect.top + shellRect.height / 2);
		const scaleX = targetRect.width / shellRect.width;
		const scaleY = targetRect.height / shellRect.height;

		albumCloseAnimationRef.current?.cancel();
		const animation = shell.animate(
			[
				{
					borderRadius: '0px',
					transform: 'translate3d(0, 0, 0) scale(1, 1)',
				},
				{
					borderRadius: '14px',
					transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scaleX}, ${scaleY})`,
				},
			],
			{
				duration: 420,
				easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
				fill: 'forwards',
			},
		);

		albumCloseAnimationRef.current = animation;
		animation.onfinish = () => {
			albumCloseAnimationRef.current = null;
			finishAlbumClose();
		};
	};

	const handleStagePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
		dragStartXRef.current = event.clientX;
		suppressClickRef.current = false;
	};

	const handleStagePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
		if (dragStartXRef.current === null) {
			return;
		}

		const delta = event.clientX - dragStartXRef.current;
		dragStartXRef.current = null;

		if (Math.abs(delta) < 36) {
			return;
		}

		suppressClickRef.current = true;

		setActiveIndex((current) =>
			Math.min(albums.length - 1, Math.max(0, current + (delta < 0 ? 1 : -1))),
		);
	};

	return (
		<div
			className={`gallery3-host${activeAlbum ? ' is-album-open' : ''}${
				isEntering ? ' is-album-entering' : ''
			}${
				isExpanding ? ' is-album-expanding' : ''
			}`}
			data-density={density}
			style={{ '--gallery3-columns': density } as CSSProperties}
		>
			<App
				className={`gallery3-app gallery3-albums${isEntering ? ' is-entering' : ''}${
					isExpanding ? ' is-expanding' : ''
				}`}
			>
				<img
					className="gallery3-albums__backdrop"
					src={albumsBackdrop}
					alt=""
					aria-hidden="true"
				/>
				<div className="gallery3-albums__shade" aria-hidden="true" />
				<h1 className="gallery3-albums__title">{selectedAlbum.title}</h1>

				<div
					className="gallery3-album-stage"
					aria-label="Альбомы"
					onPointerDown={handleStagePointerDown}
					onPointerUp={handleStagePointerUp}
					onPointerCancel={() => {
						dragStartXRef.current = null;
					}}
				>
					{albums.map((album, index) => {
						const offset = index - activeIndex;
						const distance = Math.abs(offset);
						const isActive = index === activeIndex;
						const cardStyle = {
							'--gallery3-album-x': `${offset * 246}px`,
							'--gallery3-album-y': `${Math.min(distance, 2) * 30}px`,
							'--gallery3-album-scale': Math.max(0.78, 1 - distance * 0.1),
							'--gallery3-album-opacity': Math.max(0, 1 - Math.max(0, distance - 1) * 0.46),
							'--gallery3-album-z': albums.length - distance,
						} as CSSProperties;

						return (
							<button
								key={album.id}
								ref={isActive ? activeCardRef : undefined}
								type="button"
								className={`gallery3-album-card${isActive ? ' is-active' : ''}${
									isActive && activeAlbum ? ' is-covered' : ''
								}`}
								style={cardStyle}
								aria-label={isActive ? `Открыть альбом «${album.title}»` : `Выбрать альбом «${album.title}»`}
								aria-current={isActive ? 'true' : undefined}
								onClick={() => {
									if (suppressClickRef.current) {
										suppressClickRef.current = false;
										return;
									}

									if (isActive) {
										openSelectedAlbum();
										return;
									}

									setActiveIndex(index);
								}}
								onTransitionEnd={(event) => {
									if (
										isActive &&
										isExpanding &&
										event.propertyName === 'top'
									) {
										finishAlbumExpansion();
									}
								}}
							>
								<span className="gallery3-album-card__mosaic" aria-hidden="true">
									{getPreviewPhotos(album.photos).map((photo, photoIndex) => (
										<img
											key={`${photo.id}-${photoIndex}`}
											src={photo.imageSrc}
											alt=""
											draggable={false}
										/>
									))}
								</span>
							</button>
						);
					})}
				</div>
			</App>

			{activeAlbum ? (
				<div
					ref={albumShellRef}
					className={`gallery3-album-open-shell${isClosing ? ' is-closing' : ''}`}
				>
					<PhotoScreen
						className="gallery3-photo-screen gallery3-album-photo-screen"
						title={activeAlbum.title}
						photos={activeAlbum.photos}
						showMarks={false}
						onViewerStateChange={handleViewerStateChange}
					/>
				</div>
			) : null}

			<GalleryChrome
				active="albums"
				density={activeAlbum && !isClosing ? density : undefined}
				onDensityChange={activeAlbum && !isClosing ? setDensity : undefined}
				albumIndex={!activeAlbum || isClosing ? activeIndex : undefined}
				albumCount={!activeAlbum || isClosing ? albums.length : undefined}
				onAlbumIndexChange={!activeAlbum || isClosing ? setActiveIndex : undefined}
				albumTitle={activeAlbum && !isClosing ? activeAlbum.title : undefined}
				onAlbumClose={activeAlbum && !isClosing ? closeAlbum : undefined}
				viewerPhoto={viewerPhoto}
				viewerPhase={viewerPhase}
				onViewerClose={() => viewerCloseRef.current?.()}
			/>
		</div>
	);
}
