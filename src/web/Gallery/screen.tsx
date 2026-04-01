import {
	CSSProperties,
	MouseEvent as ReactMouseEvent,
	PointerEvent as ReactPointerEvent,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { App } from '../../ui/App';
import { Text } from '../../ui/Fonts';
import { Icon } from '../../ui/Icon';
import { Nav } from '../../ui/Nav';
import {
	galleryAlbums,
	galleryPhotos,
	galleryRoutes,
	galleryTotalCountLabel,
	type GalleryAlbum,
	type GalleryPhoto,
} from './model';
import './screen.scss';

type GalleryTab = 'all' | 'albums';

type RectSnapshot = {
	left: number;
	top: number;
	width: number;
	height: number;
};

type ViewerState = {
	phase: 'opening' | 'open' | 'closing';
	currentPhotoId: string;
	photoIds: string[];
	originRect: RectSnapshot | null;
	originKey: string | null;
};

type ViewerTransform = {
	zoom: number;
	panX: number;
	panY: number;
	dismissX: number;
	dismissY: number;
	gestureActive: boolean;
};

type PointerPoint = {
	x: number;
	y: number;
};

type GestureState =
	| {
			mode: 'dismiss' | 'pan';
			startX: number;
			startY: number;
			startPanX: number;
			startPanY: number;
	  }
	| {
			mode: 'pinch';
			startDistance: number;
			startCenterX: number;
			startCenterY: number;
			startZoom: number;
			startPanX: number;
			startPanY: number;
	  };

const PHOTO_EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';
const DEFAULT_VIEWER_TRANSFORM: ViewerTransform = {
	zoom: 1,
	panX: 0,
	panY: 0,
	dismissX: 0,
	dismissY: 0,
	gestureActive: false,
};

function clamp(value: number, min: number, max: number) {
	return Math.min(max, Math.max(min, value));
}

function toSnapshot(rect: DOMRect): RectSnapshot {
	return {
		left: rect.left,
		top: rect.top,
		width: rect.width,
		height: rect.height,
	};
}

function getDistance(points: PointerPoint[]) {
	if (points.length < 2) {
		return 0;
	}

	const [first, second] = points;
	return Math.hypot(second.x - first.x, second.y - first.y);
}

function getCenter(points: PointerPoint[]) {
	if (points.length < 2) {
		return null;
	}

	const [first, second] = points;
	return {
		x: (first.x + second.x) / 2,
		y: (first.y + second.y) / 2,
	};
}

function clampPan(transform: ViewerTransform, photo: GalleryPhoto, frame: DOMRect | null) {
	if (!frame || transform.zoom <= 1) {
		return {
			panX: 0,
			panY: 0,
		};
	}

	const fitScale = Math.min(frame.width / photo.width, frame.height / photo.height);
	const displayWidth = photo.width * fitScale;
	const displayHeight = photo.height * fitScale;
	const maxX = Math.max(0, (displayWidth * transform.zoom - displayWidth) / 2);
	const maxY = Math.max(0, (displayHeight * transform.zoom - displayHeight) / 2);

	return {
		panX: clamp(transform.panX, -maxX, maxX),
		panY: clamp(transform.panY, -maxY, maxY),
	};
}

function AlbumCover({
	album,
	photosById,
}: {
	album: GalleryAlbum;
	photosById: Map<string, GalleryPhoto>;
}) {
	return (
		<div className="gallery-screen__album-cover">
			{album.coverPhotoIds.slice(0, 4).map((photoId, index) => {
				const photo = photosById.get(photoId);

				if (!photo) {
					return null;
				}

				return (
					<span
						key={photo.id}
						className={`gallery-screen__album-tile gallery-screen__album-tile--${index + 1}`}
					>
						<img src={photo.imageSrc} alt="" aria-hidden="true" />
					</span>
				);
			})}
		</div>
	);
}

export function GalleryScreen({ tab }: { tab: GalleryTab }) {
	const navigate = useNavigate();
	const viewerShellRef = useRef<HTMLDivElement | null>(null);
	const viewerFrameRef = useRef<HTMLDivElement | null>(null);
	const viewerScrimRef = useRef<HTMLButtonElement | null>(null);
	const railRefs = useRef(new Map<string, HTMLButtonElement | null>());
	const originRefs = useRef(new Map<string, HTMLElement | null>());
	const animationsRef = useRef<Animation[]>([]);
	const activePointersRef = useRef(new Map<number, PointerPoint>());
	const gestureRef = useRef<GestureState | null>(null);
	const [viewer, setViewer] = useState<ViewerState | null>(null);
	const [viewerTransform, setViewerTransform] = useState<ViewerTransform>(DEFAULT_VIEWER_TRANSFORM);

	const photosById = useMemo(
		() => new Map(galleryPhotos.map((photo) => [photo.id, photo])),
		[],
	);

	const activePhoto = viewer ? photosById.get(viewer.currentPhotoId) ?? null : null;
	const activeTrack = useMemo(() => {
		if (!viewer) {
			return [];
		}

		return viewer.photoIds
			.map((photoId) => photosById.get(photoId))
			.filter((photo): photo is GalleryPhoto => Boolean(photo));
	}, [photosById, viewer]);
	const activePhotoIndex = activeTrack.findIndex((photo) => photo.id === activePhoto?.id);

	const dismissProgress = Math.min(Math.abs(viewerTransform.dismissY) / 260, 0.86);
	const chromeOpacity = 1 - dismissProgress * 0.64;
	const dismissScale = 1 - dismissProgress * 0.1;

	const viewerMediaStyle: CSSProperties = {
		transform: `translate3d(${viewerTransform.panX + viewerTransform.dismissX}px, ${
			viewerTransform.panY + viewerTransform.dismissY
		}px, 0) scale(${viewerTransform.zoom * dismissScale})`,
	};

	const viewerOverlayStyle: CSSProperties = {
		'--gallery-viewer-chrome-opacity': `${chromeOpacity}`,
	} as CSSProperties;

	const stopAnimations = () => {
		animationsRef.current.forEach((animation) => animation.cancel());
		animationsRef.current = [];
	};

	const resetViewerTransform = (gestureActive = false) => {
		setViewerTransform({
			...DEFAULT_VIEWER_TRANSFORM,
			gestureActive,
		});
	};

	const registerOriginRef = (key: string) => (node: HTMLElement | null) => {
		if (node) {
			originRefs.current.set(key, node);
			return;
		}

		originRefs.current.delete(key);
	};

	const registerRailRef = (photoId: string) => (node: HTMLButtonElement | null) => {
		if (node) {
			railRefs.current.set(photoId, node);
			return;
		}

		railRefs.current.delete(photoId);
	};

	const findCloseTarget = () => {
		if (!viewer) {
			return null;
		}

		const currentPhotoNode = originRefs.current.get(`photo:${viewer.currentPhotoId}`);
		if (currentPhotoNode) {
			return toSnapshot(currentPhotoNode.getBoundingClientRect());
		}

		if (viewer.originKey) {
			const originNode = originRefs.current.get(viewer.originKey);
			if (originNode) {
				return toSnapshot(originNode.getBoundingClientRect());
			}
		}

		return viewer.originRect;
	};

	const closeViewer = (immediate = false) => {
		if (!viewer || viewer.phase === 'closing') {
			return;
		}

		const closeTarget = findCloseTarget();
		const shell = viewerShellRef.current;
		const scrim = viewerScrimRef.current;

		activePointersRef.current.clear();
		gestureRef.current = null;
		resetViewerTransform(false);

		if (immediate || !shell || !scrim || !closeTarget) {
			stopAnimations();
			setViewer(null);
			return;
		}

		setViewer((current) =>
			current
				? {
						...current,
						phase: 'closing',
				  }
				: current,
		);

		const currentRect = shell.getBoundingClientRect();
		const translateX = closeTarget.left - currentRect.left;
		const translateY = closeTarget.top - currentRect.top;
		const scaleX = closeTarget.width / currentRect.width;
		const scaleY = closeTarget.height / currentRect.height;

		stopAnimations();

		const mediaAnimation = shell.animate(
			[
				{
					transform: 'translate3d(0, 0, 0) scale(1, 1)',
					borderRadius: '28px',
				},
				{
					transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scaleX}, ${scaleY})`,
					borderRadius: '18px',
				},
			],
			{
				duration: 280,
				easing: PHOTO_EASING,
				fill: 'forwards',
			},
		);

		const scrimAnimation = scrim.animate(
			[
				{ opacity: 1 - dismissProgress * 0.72 },
				{ opacity: 0 },
			],
			{
				duration: 240,
				easing: 'ease-out',
				fill: 'forwards',
			},
		);

		animationsRef.current = [mediaAnimation, scrimAnimation];

		mediaAnimation.onfinish = () => {
			stopAnimations();
			setViewer(null);
		};
	};

	const openViewer = ({
		photoId,
		photoIds,
		sourceElement,
		sourceKey,
	}: {
		photoId: string;
		photoIds: string[];
		sourceElement: HTMLElement;
		sourceKey: string;
	}) => {
		if (viewer) {
			return;
		}

		resetViewerTransform(false);
		setViewer({
			phase: 'opening',
			currentPhotoId: photoId,
			photoIds,
			originRect: toSnapshot(sourceElement.getBoundingClientRect()),
			originKey: sourceKey,
		});
	};

	const handleGridOpen = (photoId: string) => (event: ReactMouseEvent<HTMLButtonElement>) => {
		openViewer({
			photoId,
			photoIds: galleryPhotos.map((photo) => photo.id),
			sourceElement: event.currentTarget,
			sourceKey: `photo:${photoId}`,
		});
	};

	const handleAlbumOpen = (album: GalleryAlbum) => (event: ReactMouseEvent<HTMLButtonElement>) => {
		openViewer({
			photoId: album.photoIds[0],
			photoIds: album.photoIds,
			sourceElement: event.currentTarget,
			sourceKey: `album:${album.id}`,
		});
	};

	useLayoutEffect(() => {
		if (!viewer || viewer.phase !== 'opening') {
			return undefined;
		}

		const shell = viewerShellRef.current;
		const scrim = viewerScrimRef.current;

		if (!shell || !scrim || !viewer.originRect) {
			setViewer((current) =>
				current
					? {
							...current,
							phase: 'open',
					  }
					: current,
			);
			return undefined;
		}

		const animationFrame = window.requestAnimationFrame(() => {
			const finalRect = shell.getBoundingClientRect();
			const translateX = viewer.originRect.left - finalRect.left;
			const translateY = viewer.originRect.top - finalRect.top;
			const scaleX = viewer.originRect.width / finalRect.width;
			const scaleY = viewer.originRect.height / finalRect.height;

			stopAnimations();

			const mediaAnimation = shell.animate(
				[
					{
						transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scaleX}, ${scaleY})`,
						borderRadius: '18px',
					},
					{
						transform: 'translate3d(0, 0, 0) scale(1, 1)',
						borderRadius: '28px',
					},
				],
				{
					duration: 320,
					easing: PHOTO_EASING,
					fill: 'forwards',
				},
			);

			const scrimAnimation = scrim.animate(
				[
					{ opacity: 0 },
					{ opacity: 1 },
				],
				{
					duration: 220,
					easing: 'ease-out',
					fill: 'forwards',
				},
			);

			animationsRef.current = [mediaAnimation, scrimAnimation];

			mediaAnimation.onfinish = () => {
				stopAnimations();
				setViewer((current) =>
					current
						? {
								...current,
								phase: 'open',
						  }
						: current,
				);
			};
		});

		return () => {
			window.cancelAnimationFrame(animationFrame);
		};
	}, [viewer]);

	useEffect(() => {
		if (!viewer) {
			return undefined;
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				event.preventDefault();
				closeViewer();
			}

			if (!activeTrack.length) {
				return;
			}

			if (event.key === 'ArrowLeft' && activePhotoIndex > 0) {
				event.preventDefault();
				setViewer((current) =>
					current
						? {
								...current,
								currentPhotoId: activeTrack[activePhotoIndex - 1].id,
						  }
						: current,
				);
				resetViewerTransform(false);
			}

			if (event.key === 'ArrowRight' && activePhotoIndex < activeTrack.length - 1) {
				event.preventDefault();
				setViewer((current) =>
					current
						? {
								...current,
								currentPhotoId: activeTrack[activePhotoIndex + 1].id,
						  }
						: current,
				);
				resetViewerTransform(false);
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [activePhotoIndex, activeTrack, viewer]);

	useEffect(() => {
		if (!activePhoto) {
			return;
		}

		railRefs.current.get(activePhoto.id)?.scrollIntoView({
			block: 'nearest',
			inline: 'center',
			behavior: 'smooth',
		});
	}, [activePhoto]);

	useEffect(
		() => () => {
			stopAnimations();
		},
		[],
	);

	const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
		if (!activePhoto || !viewer || viewer.phase !== 'open') {
			return;
		}

		event.preventDefault();
		const nextPointers = activePointersRef.current;
		nextPointers.set(event.pointerId, {
			x: event.clientX,
			y: event.clientY,
		});
		event.currentTarget.setPointerCapture(event.pointerId);

		if (nextPointers.size >= 2) {
			const points = Array.from(nextPointers.values()).slice(0, 2);
			const center = getCenter(points);

			if (!center) {
				return;
			}

			gestureRef.current = {
				mode: 'pinch',
				startDistance: getDistance(points),
				startCenterX: center.x,
				startCenterY: center.y,
				startZoom: viewerTransform.zoom,
				startPanX: viewerTransform.panX,
				startPanY: viewerTransform.panY,
			};
			setViewerTransform((current) => ({
				...current,
				dismissX: 0,
				dismissY: 0,
				gestureActive: true,
			}));
			return;
		}

		if (viewerTransform.zoom > 1.02) {
			gestureRef.current = {
				mode: 'pan',
				startX: event.clientX,
				startY: event.clientY,
				startPanX: viewerTransform.panX,
				startPanY: viewerTransform.panY,
			};
			setViewerTransform((current) => ({
				...current,
				gestureActive: true,
			}));
			return;
		}

		gestureRef.current = {
			mode: 'dismiss',
			startX: event.clientX,
			startY: event.clientY,
			startPanX: 0,
			startPanY: 0,
		};
		setViewerTransform((current) => ({
			...current,
			gestureActive: true,
		}));
	};

	const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
		if (!activePhoto || !viewer || viewer.phase !== 'open') {
			return;
		}

		const nextPointers = activePointersRef.current;
		if (!nextPointers.has(event.pointerId)) {
			return;
		}

		nextPointers.set(event.pointerId, {
			x: event.clientX,
			y: event.clientY,
		});

		const gesture = gestureRef.current;

		if (!gesture) {
			return;
		}

		event.preventDefault();

		if (nextPointers.size >= 2) {
			const points = Array.from(nextPointers.values()).slice(0, 2);
			const center = getCenter(points);
			const distance = getDistance(points);
			const frame = viewerFrameRef.current?.getBoundingClientRect() ?? null;

			if (!center || distance <= 0) {
				return;
			}

			const startDistance =
				gesture.mode === 'pinch' ? gesture.startDistance : Math.max(distance, 1);
			const startZoom = gesture.mode === 'pinch' ? gesture.startZoom : viewerTransform.zoom;
			const startPanX = gesture.mode === 'pinch' ? gesture.startPanX : viewerTransform.panX;
			const startPanY = gesture.mode === 'pinch' ? gesture.startPanY : viewerTransform.panY;
			const startCenterX =
				gesture.mode === 'pinch' ? gesture.startCenterX : center.x;
			const startCenterY =
				gesture.mode === 'pinch' ? gesture.startCenterY : center.y;

			const nextZoom = clamp((startZoom * distance) / Math.max(startDistance, 1), 1, 4);
			const nextTransform = {
				zoom: nextZoom,
				panX: startPanX + (center.x - startCenterX),
				panY: startPanY + (center.y - startCenterY),
				dismissX: 0,
				dismissY: 0,
				gestureActive: true,
			};
			const bounded = clampPan(nextTransform, activePhoto, frame);

			gestureRef.current = {
				mode: 'pinch',
				startDistance,
				startCenterX,
				startCenterY,
				startZoom,
				startPanX,
				startPanY,
			};
			setViewerTransform({
				...nextTransform,
				...bounded,
			});
			return;
		}

		if (gesture.mode === 'pan') {
			const frame = viewerFrameRef.current?.getBoundingClientRect() ?? null;
			const nextTransform = {
				zoom: viewerTransform.zoom,
				panX: gesture.startPanX + (event.clientX - gesture.startX),
				panY: gesture.startPanY + (event.clientY - gesture.startY),
				dismissX: 0,
				dismissY: 0,
				gestureActive: true,
			};
			const bounded = clampPan(nextTransform, activePhoto, frame);

			setViewerTransform({
				...nextTransform,
				...bounded,
			});
			return;
		}

		const deltaX = event.clientX - gesture.startX;
		const deltaY = event.clientY - gesture.startY;
		const horizontalBias = Math.abs(deltaX) * 0.18;

		setViewerTransform({
			zoom: 1,
			panX: 0,
			panY: 0,
			dismissX: horizontalBias * Math.sign(deltaX),
			dismissY: deltaY,
			gestureActive: true,
		});
	};

	const handlePointerFinish = (event: ReactPointerEvent<HTMLDivElement>) => {
		if (!activePhoto || !viewer) {
			return;
		}

		activePointersRef.current.delete(event.pointerId);

		if (activePointersRef.current.size >= 2) {
			const points = Array.from(activePointersRef.current.values()).slice(0, 2);
			const center = getCenter(points);

			if (!center) {
				return;
			}

			gestureRef.current = {
				mode: 'pinch',
				startDistance: getDistance(points),
				startCenterX: center.x,
				startCenterY: center.y,
				startZoom: viewerTransform.zoom,
				startPanX: viewerTransform.panX,
				startPanY: viewerTransform.panY,
			};
			return;
		}

		if (activePointersRef.current.size === 1 && viewerTransform.zoom > 1.02) {
			const remainingPoint = Array.from(activePointersRef.current.values())[0];
			gestureRef.current = {
				mode: 'pan',
				startX: remainingPoint.x,
				startY: remainingPoint.y,
				startPanX: viewerTransform.panX,
				startPanY: viewerTransform.panY,
			};
			return;
		}

		gestureRef.current = null;

		if (Math.abs(viewerTransform.dismissY) > 136 && viewerTransform.zoom <= 1.02) {
			closeViewer();
			return;
		}

		const frame = viewerFrameRef.current?.getBoundingClientRect() ?? null;
		const normalizedTransform = {
			...viewerTransform,
			zoom: viewerTransform.zoom < 1.02 ? 1 : viewerTransform.zoom,
			dismissX: 0,
			dismissY: 0,
			gestureActive: false,
		};
		const bounded = clampPan(normalizedTransform, activePhoto, frame);

		setViewerTransform({
			...normalizedTransform,
			...bounded,
		});
	};

	return (
		<App>
			<div className="gallery-screen">
				<div className="gallery-screen__surface" aria-hidden={viewer ? true : undefined}>
					<header className="gallery-screen__header">
						<div className="gallery-screen__header-copy">
							<Text as="div" variant="semiBold-40">
								{tab === 'all' ? 'Все фото' : 'Альбомы'}
							</Text>
							<Text as="div" variant="medium-16">
								{tab === 'all' ? galleryTotalCountLabel : `${galleryAlbums.length} коллекции`}
							</Text>
						</div>
						<button
							type="button"
							className="gallery-screen__icon-button"
							aria-label="Ещё"
						>
							<Icon
								name="more-vertical"
								alt=""
								aria-hidden="true"
								width={24}
								height={24}
								colorToken="#20242c"
							/>
						</button>
					</header>

					<div className="gallery-screen__scroll">
						{tab === 'all' ? (
							<div className="gallery-screen__grid" role="list" aria-label="Сетка фотографий">
								{galleryPhotos.map((photo) => {
									const hidden = viewer?.currentPhotoId === photo.id;

									return (
										<button
											key={photo.id}
											type="button"
											role="listitem"
											ref={registerOriginRef(`photo:${photo.id}`)}
											className={`gallery-screen__thumb${hidden ? ' is-hidden-origin' : ''}`}
											onClick={handleGridOpen(photo.id)}
											aria-label={`Открыть фото: ${photo.title}`}
										>
											<img
												src={photo.imageSrc}
												alt=""
												aria-hidden="true"
												className="gallery-screen__thumb-image"
											/>
											{photo.favorite ? (
												<span className="gallery-screen__thumb-badge">
													<Icon
														name="star-100"
														alt=""
														aria-hidden="true"
														width={12}
														height={12}
														colorToken="#ffffff"
													/>
												</span>
											) : null}
										</button>
									);
								})}
							</div>
						) : (
							<div className="gallery-screen__albums">
								<div className="gallery-screen__section-copy">
									<Text as="div" variant="medium-20">
										Умные альбомы
									</Text>
									<Text as="div" variant="regular-14">
										Подборки собираются автоматически из новых кадров.
									</Text>
								</div>

								{galleryAlbums.map((album) => {
									const hidden = viewer?.originKey === `album:${album.id}`;

									return (
										<button
											key={album.id}
											type="button"
											ref={registerOriginRef(`album:${album.id}`)}
											className={`gallery-screen__album${hidden ? ' is-hidden-origin' : ''}`}
											onClick={handleAlbumOpen(album)}
											aria-label={`Открыть альбом ${album.title}`}
										>
											<AlbumCover album={album} photosById={photosById} />
											<div className="gallery-screen__album-copy">
												<Text as="div" variant="medium-20">
													{album.title}
												</Text>
												<Text as="div" variant="regular-14">
													{album.description}
												</Text>
												<Text as="div" variant="medium-14">
													{album.countLabel}
												</Text>
											</div>
											<span className="gallery-screen__album-arrow" aria-hidden="true">
												<Icon
													name="chevron-right"
													alt=""
													aria-hidden="true"
													width={20}
													height={20}
													colorToken="#5e6b7b"
												/>
											</span>
										</button>
									);
								})}
							</div>
						)}
					</div>

					<div className="gallery-screen__nav">
						<Nav
							items={[
								{
									id: 'all',
									active: tab === 'all',
									onClick: () => navigate(galleryRoutes.all),
									icon: (
										<Icon
											name="photo-outline"
											alt=""
											aria-hidden="true"
											width={24}
											height={24}
											colorToken={tab === 'all' ? '#2e8dff' : 'rgba(32, 36, 44, 0.44)'}
										/>
									),
									label: (
										<Text as="span" variant="medium-12">
											Все фото
										</Text>
									),
								},
								{
									id: 'albums',
									active: tab === 'albums',
									onClick: () => navigate(galleryRoutes.albums),
									icon: (
										<Icon
											name="folder-outline"
											alt=""
											aria-hidden="true"
											width={24}
											height={24}
											colorToken={tab === 'albums' ? '#2e8dff' : 'rgba(32, 36, 44, 0.44)'}
										/>
									),
									label: (
										<Text as="span" variant="medium-12">
											Альбомы
										</Text>
									),
								},
							]}
						/>
					</div>
				</div>

				{viewer && activePhoto ? (
					<div
						className="gallery-viewer"
						style={viewerOverlayStyle}
						role="dialog"
						aria-modal="true"
						aria-label={`Просмотр фото: ${activePhoto.title}`}
					>
						<button
							ref={viewerScrimRef}
							type="button"
							className="gallery-viewer__scrim"
							aria-label="Закрыть просмотр фото"
							onClick={() => closeViewer()}
						/>
						<div className="gallery-viewer__chrome">
							<header className="gallery-viewer__topbar">
								<button
									type="button"
									className="gallery-viewer__back-button"
									onClick={() => closeViewer()}
									aria-label="Закрыть просмотр фото"
								>
									<Icon
										name="mobile-back-outline"
										alt=""
										aria-hidden="true"
										width={24}
										height={24}
										colorToken="#ffffff"
									/>
								</button>
								<div className="gallery-viewer__topbar-copy">
									<Text as="div" variant="medium-24">
										{activePhoto.takenAtLabel}
									</Text>
									<Text as="div" variant="regular-14">
										{activePhoto.title}
									</Text>
								</div>
							</header>

							<div className="gallery-viewer__stage">
								<div ref={viewerShellRef} className="gallery-viewer__media-shell">
									<div
										ref={viewerFrameRef}
										className={`gallery-viewer__media-frame${
											viewerTransform.gestureActive ? ' is-gesture-active' : ''
										}`}
										onPointerDown={handlePointerDown}
										onPointerMove={handlePointerMove}
										onPointerUp={handlePointerFinish}
										onPointerCancel={handlePointerFinish}
										onDoubleClick={() => {
											if (!activePhoto || viewer.phase !== 'open') {
												return;
											}

											if (viewerTransform.zoom > 1.02) {
												resetViewerTransform(false);
												return;
											}

											setViewerTransform({
												zoom: 2,
												panX: 0,
												panY: 0,
												dismissX: 0,
												dismissY: 0,
												gestureActive: false,
											});
										}}
									>
										<div className="gallery-viewer__media" style={viewerMediaStyle}>
											<img src={activePhoto.imageSrc} alt={activePhoto.title} draggable={false} />
										</div>
									</div>
								</div>
							</div>

							<div className="gallery-viewer__rail" role="tablist" aria-label="Лента фотографий">
								{activeTrack.map((photo) => (
									<button
										key={photo.id}
										ref={registerRailRef(photo.id)}
										type="button"
										role="tab"
										aria-selected={photo.id === activePhoto.id}
										className={`gallery-viewer__rail-item${
											photo.id === activePhoto.id ? ' is-active' : ''
										}`}
										onClick={() => {
											setViewer((current) =>
												current
													? {
															...current,
															currentPhotoId: photo.id,
													  }
													: current,
											);
											resetViewerTransform(false);
										}}
									>
										<img src={photo.imageSrc} alt="" aria-hidden="true" />
									</button>
								))}
							</div>

							<div className="gallery-viewer__actions">
								<button type="button" className="gallery-viewer__action-button" aria-label="В избранное">
									<Icon
										name={activePhoto.favorite ? 'star-100' : 'star-0'}
										alt=""
										aria-hidden="true"
										width={24}
										height={24}
										colorToken="#ffffff"
									/>
								</button>
								<button type="button" className="gallery-viewer__action-button" aria-label="Информация">
									<Icon
										name="status-info-outline"
										alt=""
										aria-hidden="true"
										width={24}
										height={24}
										colorToken="#ffffff"
									/>
								</button>
								<button type="button" className="gallery-viewer__action-button" aria-label="Поделиться">
									<Icon
										name="share-outline"
										alt=""
										aria-hidden="true"
										width={24}
										height={24}
										colorToken="#ffffff"
									/>
								</button>
								<button type="button" className="gallery-viewer__action-button" aria-label="Удалить">
									<Icon
										name="delete-outline"
										alt=""
										aria-hidden="true"
										width={24}
										height={24}
										colorToken="#ffffff"
									/>
								</button>
							</div>
						</div>
					</div>
				) : null}
			</div>
		</App>
	);
}
