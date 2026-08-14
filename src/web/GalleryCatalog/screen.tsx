import {
	type CSSProperties,
	type PointerEvent as ReactPointerEvent,
	type TransitionEvent,
	useMemo,
	useRef,
	useState,
} from 'react';
import { App } from '../../ui/App';
import { Icon } from '../../ui/Icon';
import { cn } from '../../ui/lib/cn';
import { galleryAlbums, type GalleryAlbum, type GalleryPhoto } from './model';
import './screen.scss';

type GalleryScreenProps = {
	initialAlbumId?: GalleryAlbum['id'];
};

type Drag = {
	pointerId: number;
	source: 'photo' | 'spines';
	startX: number;
	startY: number;
	startScroll: number;
};

type StackSwipe = {
	pointerId: number;
	startX: number;
	startY: number;
	startedAt: number;
	lastX: number;
	axis: 'x' | 'y' | null;
};

type StackExit = 'left' | 'right' | null;

const stackDistance = 64;
const stackVelocity = 0.42;

function clampIndex(index: number, count: number) {
	return (index + count) % count;
}

function getStackRelation(index: number, current: number, count: number) {
	if (index === current) return 0;
	if (index === clampIndex(current + 1, count)) return 1;
	if (index === clampIndex(current - 1, count)) return -1;
	if (index === clampIndex(current + 2, count)) return 2;
	return 3;
}

function getAlbumOrder(initialAlbumId: GalleryAlbum['id']) {
	const ids = galleryAlbums.map((album) => album.id);
	return [...ids.filter((id) => id !== initialAlbumId), initialAlbumId];
}

function getOffset(variable: string, count: number) {
	if (count === 0) return '0px';
	return `calc(${Array.from({ length: count }, () => `var(${variable})`).join(' + ')})`;
}

function AlbumPeek({ album }: { album: GalleryAlbum }) {
	return (
		<span className="gallery-file__peek" aria-hidden="true">
			{album.photos.slice(0, 3).map((photo) => (
				<img key={photo.id} src={photo.imageSrc} alt="" draggable={false} loading="lazy" />
			))}
		</span>
	);
}

function FavoriteMark({ photo }: { photo: GalleryPhoto }) {
	if (!photo.favorite) return null;

	return (
		<span className="gallery-photo__favorite" aria-label="В избранном">
			<Icon name="star-100" width={16} height={16} aria-hidden="true" />
		</span>
	);
}

function FavoriteStack({
	photos,
}: {
	photos: GalleryPhoto[];
}) {
	const swipeRef = useRef<StackSwipe | null>(null);
	const [frontIndex, setFrontIndex] = useState(0);
	const [dragX, setDragX] = useState(0);
	const [exit, setExit] = useState<StackExit>(null);
	const move = (step: number) => {
		if (!exit) setExit(step > 0 ? 'left' : 'right');
	};

	const startSwipe = (event: ReactPointerEvent<HTMLElement>) => {
		if (exit || !event.isPrimary || event.button !== 0) return;

		swipeRef.current = {
			pointerId: event.pointerId,
			startX: event.clientX,
			startY: event.clientY,
			startedAt: performance.now(),
			lastX: event.clientX,
			axis: null,
		};
		event.currentTarget.setPointerCapture(event.pointerId);
	};

	const dragSwipe = (event: ReactPointerEvent<HTMLElement>) => {
		const swipe = swipeRef.current;
		if (!swipe || swipe.pointerId !== event.pointerId) return;

		const deltaX = event.clientX - swipe.startX;
		const deltaY = event.clientY - swipe.startY;
		swipe.lastX = event.clientX;
		if (!swipe.axis && Math.hypot(deltaX, deltaY) > 7) {
			swipe.axis = Math.abs(deltaX) > Math.abs(deltaY) ? 'x' : 'y';
		}
		if (swipe.axis !== 'x') return;

		setDragX(deltaX);
		event.preventDefault();
	};

	const endSwipe = (event: ReactPointerEvent<HTMLElement>) => {
		const swipe = swipeRef.current;
		if (!swipe || swipe.pointerId !== event.pointerId) return;

		const distance = swipe.lastX - swipe.startX;
		const elapsed = Math.max(performance.now() - swipe.startedAt, 1);
		const velocity = Math.abs(distance) / elapsed;
		swipeRef.current = null;
		if (event.currentTarget.hasPointerCapture(event.pointerId)) {
			event.currentTarget.releasePointerCapture(event.pointerId);
		}

		if (Math.abs(distance) >= stackDistance || velocity >= stackVelocity) {
			setExit(distance < 0 ? 'left' : 'right');
			return;
		}
		setDragX(0);
	};

	const settle = (event: TransitionEvent<HTMLElement>) => {
		if (!exit || event.propertyName !== 'transform') return;

		setFrontIndex((index) => clampIndex(index + (exit === 'left' ? 1 : -1), photos.length));
		setExit(null);
		setDragX(0);
	};

	return (
		<div
			className="gallery-grid__stack"
			tabIndex={0}
			aria-label="Избранные фотографии"
			onKeyDown={(event) => {
				if (event.key === 'ArrowLeft') {
					event.preventDefault();
					move(-1);
				}
				if (event.key === 'ArrowRight') {
					event.preventDefault();
					move(1);
				}
			}}
		>
			{photos.map((photo, index) => {
				const relation = getStackRelation(index, frontIndex, photos.length);
				if (relation === 3) return null;

				const isFront = relation === 0;
				const style = {
					'--stack-x': `${relation * 10}px`,
					'--stack-y': `${Math.abs(relation) * 9}px`,
					'--stack-turn': `${relation * 1.45}deg`,
					'--stack-scale': 1 - Math.abs(relation) * 0.045,
					'--stack-drag': isFront ? `${dragX}px` : '0px',
					'--stack-tilt': isFront ? `${dragX / 24}deg` : '0deg',
					zIndex: isFront ? 5 : 4 - Math.abs(relation),
				} as CSSProperties;

				return (
					<span
						key={photo.id}
						className={cn(
							'gallery-grid__stack-card',
							isFront && 'is-front',
							isFront && exit && `is-leaving-${exit}`,
						)}
						style={style}
						onPointerDown={isFront ? startSwipe : undefined}
						onPointerMove={isFront ? dragSwipe : undefined}
						onPointerUp={isFront ? endSwipe : undefined}
						onPointerCancel={isFront ? endSwipe : undefined}
						onTransitionEnd={isFront ? settle : undefined}
						aria-hidden={!isFront}
					>
						<img src={photo.imageSrc} alt="" draggable={false} />
					</span>
				);
			})}
		</div>
	);
}

function PhotoGrid({ album, onOpen }: { album: GalleryAlbum; onOpen: (photoId: string) => void }) {
	return (
		<div className="gallery-grid" aria-label={`${album.title}: фотографии`}>
			{album.id === 'favorites' ? <FavoriteStack photos={album.photos} /> : null}
			{album.photos.map((photo, index) => (
				<button
					key={photo.id}
					type="button"
					className="gallery-grid__photo"
					onClick={() => onOpen(photo.id)}
					aria-label={`Открыть фото ${index + 1} из ${album.photos.length}`}
				>
					<img src={photo.imageSrc} alt="" draggable={false} loading="lazy" />
					<FavoriteMark photo={photo} />
				</button>
			))}
		</div>
	);
}

function FeedPhoto({
	photo,
	index,
	count,
	feedIndex,
	isPast,
}: {
	photo: GalleryPhoto;
	index: number;
	count: number;
	feedIndex: number;
	isPast: boolean;
}) {
	return (
		<figure
			className={cn('gallery-feed__card', isPast && 'is-past')}
			data-photo-id={photo.id}
			data-photo-index={feedIndex}
			aria-label={`Фото ${index + 1} из ${count}`}
			aria-hidden={isPast || undefined}
		>
			<img src={photo.imageSrc} alt="" draggable={false} />
		</figure>
	);
}

function PhotoFeed({
	album,
	selectedPhotoId,
	onClose,
}: {
	album: GalleryAlbum;
	selectedPhotoId: string;
	onClose: () => void;
}) {
	const feedRef = useRef<HTMLDivElement>(null);
	const dragRef = useRef<Drag | null>(null);
	const dismissRef = useRef(0);
	const [dismiss, setDismiss] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
	const [topIndex, setTopIndex] = useState(0);
	const photos = useMemo(() => {
		const selectedIndex = album.photos.findIndex((photo) => photo.id === selectedPhotoId);
		if (selectedIndex <= 0) return album.photos;

		return [...album.photos.slice(selectedIndex), ...album.photos.slice(0, selectedIndex)];
	}, [album.photos, selectedPhotoId]);

	const moveDismiss = (value: number) => {
		dismissRef.current = value;
		setDismiss(value);
	};

	const startDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
		if (!event.isPrimary || event.button !== 0) return;

		const target = event.target as HTMLElement;
		const source = target.closest('.gallery-view__spines')
			? 'spines'
			: target.closest('[data-photo-index="0"]')
				? 'photo'
				: null;
		if (!source || (source === 'photo' && (feedRef.current?.scrollTop ?? 0) > 1)) return;

		dragRef.current = {
			pointerId: event.pointerId,
			source,
			startX: event.clientX,
			startY: event.clientY,
			startScroll: feedRef.current?.scrollTop ?? 0,
		};
		event.currentTarget.setPointerCapture(event.pointerId);
		setIsDragging(true);
	};

	const moveDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
		const drag = dragRef.current;
		if (!drag || drag.pointerId !== event.pointerId) return;

		const deltaX = event.clientX - drag.startX;
		const deltaY = event.clientY - drag.startY;
		if (Math.abs(deltaX) > Math.abs(deltaY)) return;

		if (drag.source === 'photo' && deltaY < 0) {
			if (feedRef.current) feedRef.current.scrollTop = drag.startScroll - deltaY;
			moveDismiss(0);
			return;
		}

		if (deltaY > 0) {
			event.preventDefault();
			moveDismiss(Math.min(220, deltaY * 0.82));
		}
	};

	const finishDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
		const drag = dragRef.current;
		if (!drag || drag.pointerId !== event.pointerId) return;

		if (event.currentTarget.hasPointerCapture(event.pointerId)) {
			event.currentTarget.releasePointerCapture(event.pointerId);
		}
		dragRef.current = null;
		setIsDragging(false);

		if (dismissRef.current >= 72) {
			onClose();
			return;
		}

		moveDismiss(0);
	};

	const syncTop = () => {
		const feed = feedRef.current;
		if (!feed) return;

		let index = 0;
		for (const [itemIndex, item] of Array.from(feed.children).entries()) {
			if ((item as HTMLElement).offsetTop > feed.scrollTop + 1) break;
			index = itemIndex;
		}
		setTopIndex((current) => (current === index ? current : index));
	};

	return (
		<div
			className={cn('gallery-view', isDragging && 'is-dragging')}
			style={{ '--gallery-dismiss': `${dismiss}px` } as CSSProperties}
			onPointerDown={startDrag}
			onPointerMove={moveDrag}
			onPointerUp={finishDrag}
			onPointerCancel={finishDrag}
			onKeyDown={(event) => {
				if (event.key === 'Escape') onClose();
			}}
		>
			<div
				className="gallery-view__spines"
				role="button"
				tabIndex={0}
				aria-label="Закрыть фотографии"
				onKeyDown={(event) => {
					if (event.key === 'Enter' || event.key === ' ') onClose();
				}}
			/>
			<div
				ref={feedRef}
				className="gallery-feed"
				tabIndex={0}
				aria-label={`${album.title}: просмотр`}
				onScroll={syncTop}
			>
				{photos.map((photo, feedIndex) => (
					<FeedPhoto
						key={photo.id}
						photo={photo}
						index={album.photos.indexOf(photo)}
						count={album.photos.length}
						feedIndex={feedIndex}
						isPast={feedIndex < topIndex}
					/>
				))}
			</div>
		</div>
	);
}

export function GalleryScreen({ initialAlbumId = 'all' }: GalleryScreenProps) {
	const [activeAlbumId, setActiveAlbumId] = useState<GalleryAlbum['id']>(initialAlbumId);
	const [albumOrder, setAlbumOrder] = useState(() => getAlbumOrder(initialAlbumId));
	const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);

	const albumsById = useMemo(
		() => new Map(galleryAlbums.map((album) => [album.id, album])),
		[],
	);
	const orderedAlbums = albumOrder
		.map((albumId) => albumsById.get(albumId))
		.filter((album): album is GalleryAlbum => Boolean(album));
	const activeAlbum = albumsById.get(activeAlbumId) ?? galleryAlbums[0];
	const isViewing = selectedPhotoId !== null;
	const spineAlbums = orderedAlbums.slice(-3, -1);
	const spineIds = new Set(spineAlbums.map((album) => album.id));

	const selectAlbum = (albumId: GalleryAlbum['id']) => {
		setSelectedPhotoId(null);
		if (albumId === activeAlbumId) return;

		setActiveAlbumId(albumId);
		setAlbumOrder((current) => [...current.filter((id) => id !== albumId), albumId]);
	};

	return (
		<App className={cn('gallery-catalog', isViewing && 'is-viewing')}>
			<header className="gallery-catalog__header">
				<h1>Фотокарточки</h1>
			</header>

			<main className="gallery-catalog__stage">
				<section className="gallery-files" aria-label="Альбомы">
					{orderedAlbums.map((album, index) => {
						const isActive = album.id === activeAlbum.id;
						const spineIndex = spineAlbums.findIndex((item) => item.id === album.id);
						const style = {
							'--file-top': getOffset('--file-step', index),
							'--spine-top': `${Math.max(0, spineIndex) * 14}px`,
							'--file-depth': `${index * 7}px`,
							'--file-turn': `${(index - 2) * 0.18}deg`,
							'--file-tone': album.tone,
							zIndex: index + 1,
						} as CSSProperties;

						return (
							<article
								key={album.id}
								className={cn(
									'gallery-file',
									isActive && 'is-active',
									spineIds.has(album.id) && 'is-view-spine',
								)}
								style={style}
							>
								<button
									type="button"
									className="gallery-file__tab"
									onClick={() => selectAlbum(album.id)}
									disabled={isViewing}
									aria-current={isActive ? 'page' : undefined}
									aria-label={album.title}
								>
									<span className="gallery-file__number">
										{String(galleryAlbums.findIndex((item) => item.id === album.id) + 1).padStart(2, '0')}
									</span>
									<span className="gallery-file__name">
										<strong>{album.title}</strong>
										<small>{album.photos.length}</small>
									</span>
									<AlbumPeek album={album} />
								</button>

								{isActive && !isViewing ? (
									<div className="gallery-file__body">
										<PhotoGrid album={album} onOpen={setSelectedPhotoId} />
									</div>
								) : null}
							</article>
						);
					})}

					{selectedPhotoId ? (
						<PhotoFeed
							album={activeAlbum}
							selectedPhotoId={selectedPhotoId}
							onClose={() => setSelectedPhotoId(null)}
						/>
					) : null}
				</section>
			</main>
		</App>
	);
}
