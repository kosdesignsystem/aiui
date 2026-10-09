import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../ui/Icon';
import type { GalleryPhoto } from '../Gallery/model';
import { gallery3Routes } from './model';

function ControlMeter({
	position,
	markerCount = 4,
}: {
	position: number;
	markerCount?: number;
}) {
	const visibleMarkerCount = Math.max(1, markerCount);
	const slotCount = visibleMarkerCount * 2 - 1;
	const centerSlot = visibleMarkerCount - 1;
	const firstVisibleSlot = centerSlot - (position - 1);
	const visibleSlots = Array.from(
		{ length: visibleMarkerCount },
		(_, index) => firstVisibleSlot + index,
	);

	return (
		<span
			className="gallery3-density__meter"
			style={
				{
					'--gallery3-meter-slots': slotCount,
					'--gallery3-meter-width': `${slotCount * 12}px`,
				} as CSSProperties
			}
			aria-hidden="true"
		>
			{Array.from({ length: slotCount }, (_, index) => (
				<span key={index} className="gallery3-density__slot" />
			))}
			{visibleSlots.map((slot, index) => {
				const distanceFromCenter = Math.abs(slot - centerSlot);
				const lineHeight = Math.max(12, 24 - distanceFromCenter * 4);

				return (
					<span
						key={index}
						className={`gallery3-density__line${slot === centerSlot ? ' is-active' : ''}`}
						style={
							{
								'--gallery3-line-slot': slot,
								'--gallery3-line-height': `${lineHeight}px`,
								'--gallery3-line-opacity': distanceFromCenter === 2 ? 0.6 : 1,
							} as CSSProperties
						}
					/>
				);
			})}
		</span>
	);
}

export function DensityControl({
	value,
	onChange,
}: {
	value: number;
	onChange: (value: number) => void;
}) {
	return (
		<label
			className="gallery3-density"
			aria-label={`${value} фото в ряд`}
		>
			<span key={value} className="gallery3-density__value" aria-hidden="true">
				{value}
			</span>
			<ControlMeter position={value} />
			<input
				className="gallery3-density__input"
				type="range"
				min="1"
				max="4"
				step="1"
				value={value}
				onChange={(event) => onChange(Number(event.currentTarget.value))}
				aria-label="Количество фотографий в ряду"
			/>
		</label>
	);
}

export function AlbumSlideControl({
	value,
	count,
	onChange,
}: {
	value: number;
	count: number;
	onChange: (value: number) => void;
}) {
	return (
		<label className="gallery3-album-slider" aria-label={`Альбом ${value + 1} из ${count}`}>
			<ControlMeter position={value + 1} markerCount={count} />
			<input
				type="range"
				min="0"
				max={Math.max(0, count - 1)}
				step="1"
				value={value}
				onChange={(event) => onChange(Number(event.currentTarget.value))}
				aria-label="Текущий альбом"
			/>
		</label>
	);
}

export function GalleryChrome({
	active,
	density,
	onDensityChange,
	viewerPhoto,
	viewerPhase,
	onViewerClose,
	albumIndex,
	albumCount,
	onAlbumIndexChange,
	albumTitle,
	onAlbumClose,
}: {
	active: 'all' | 'albums';
	density?: number;
	onDensityChange?: (value: number) => void;
	viewerPhoto?: GalleryPhoto | null;
	viewerPhase?: 'opening' | 'open' | 'closing' | null;
	onViewerClose?: () => void;
	albumIndex?: number;
	albumCount?: number;
	onAlbumIndexChange?: (value: number) => void;
	albumTitle?: string;
	onAlbumClose?: () => void;
}) {
	const navigate = useNavigate();
	const navigateTo = (path: string) => {
		navigate(path, { viewTransition: true });
	};
	const isViewer = Boolean(viewerPhoto);
	const isAlbumOverview =
		albumIndex !== undefined && albumCount !== undefined && Boolean(onAlbumIndexChange);
	const isAlbumOpen = Boolean(albumTitle && onAlbumClose);

	return (
		<>
			<div className={`gallery3-chrome__top${isViewer ? ' is-viewer' : ''}`} aria-hidden="true" />
			<div className={`gallery3-chrome__bottom${isViewer ? ' is-viewer' : ''}`} aria-hidden="true" />
			<div
				className={`gallery3-controls${isViewer ? ' is-viewer' : ''}${
					isAlbumOverview ? ' is-album-overview' : ''
				}${isAlbumOpen ? ' is-album-open' : ''}${viewerPhase ? ` is-${viewerPhase}` : ''}`}
			>
				<div className="gallery3-leading">
					<div
						className="gallery3-leading__density"
						aria-hidden={isViewer || density === undefined || undefined}
					>
						{density !== undefined && onDensityChange ? (
							<DensityControl value={density} onChange={onDensityChange} />
						) : null}
					</div>
					<div
						className="gallery3-leading__album-slider"
						aria-hidden={isViewer || !isAlbumOverview || undefined}
					>
						{isAlbumOverview ? (
							<AlbumSlideControl
								value={albumIndex}
								count={albumCount}
								onChange={onAlbumIndexChange!}
							/>
						) : null}
					</div>
					<button
						type="button"
						className="gallery3-leading__close"
						aria-label="Закрыть фото"
						aria-hidden={!isViewer || undefined}
						tabIndex={isViewer ? 0 : -1}
						onClick={onViewerClose}
					>
						<Icon name="close" width={24} height={24} alt="" aria-hidden="true" />
					</button>
				</div>

				<div className="gallery3-trailing">
					<div
						className="gallery3-tabs"
						role="tablist"
						aria-label="Разделы галереи"
						aria-hidden={isViewer || isAlbumOpen || undefined}
					>
						<button
							type="button"
							role="tab"
							aria-selected={active === 'all'}
							className={active === 'all' ? 'is-active' : ''}
							tabIndex={isViewer || isAlbumOpen ? -1 : 0}
							onClick={() => navigateTo(gallery3Routes.all)}
						>
							Все
						</button>
						<button
							type="button"
							role="tab"
							aria-selected={active === 'albums'}
							className={active === 'albums' ? 'is-active' : ''}
							tabIndex={isViewer || isAlbumOpen ? -1 : 0}
							onClick={() => navigateTo(gallery3Routes.albums)}
						>
							Альбомы
						</button>
					</div>

					<button
						type="button"
						className="gallery3-album-close"
						aria-label={`Закрыть альбом «${albumTitle ?? ''}»`}
						aria-hidden={isViewer || !isAlbumOpen || undefined}
						tabIndex={!isViewer && isAlbumOpen ? 0 : -1}
						onClick={onAlbumClose}
					>
						<span className="gallery3-album-close__icon" aria-hidden="true">
							<Icon name="close" width={22} height={22} alt="" />
						</span>
						<span className="gallery3-album-close__label">{albumTitle}</span>
					</button>

					<div
						className="gallery3-viewer-actions"
						role="toolbar"
						aria-label="Действия с фото"
						aria-hidden={!isViewer || undefined}
					>
						<button
							type="button"
							className={viewerPhoto?.favorite ? 'is-active' : ''}
							aria-label="В избранное"
							tabIndex={isViewer ? 0 : -1}
						>
							<Icon
								name={viewerPhoto?.favorite ? 'star-100' : 'star-0'}
								width={24}
								height={24}
								alt=""
								aria-hidden="true"
							/>
						</button>
						<button type="button" aria-label="Информация" tabIndex={isViewer ? 0 : -1}>
							<Icon name="status-info-outline" width={24} height={24} alt="" aria-hidden="true" />
						</button>
						<button type="button" aria-label="Удалить" tabIndex={isViewer ? 0 : -1}>
							<Icon name="delete-outline" width={24} height={24} alt="" aria-hidden="true" />
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
