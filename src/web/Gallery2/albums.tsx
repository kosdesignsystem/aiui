import { type CSSProperties, type PointerEvent, useRef, useState } from 'react';
import { Text } from '../../ui/Fonts';
import { galleryAlbums, getPhotoCountLabel } from '../Gallery/model';
import { PhotoScreen } from '../Gallery/screen';
import { gallery2Routes } from './model';
import { allPhotos, favoritePhotos } from './photos';
import { GridToggle, type GridMode } from './screen';

const catalogs = [
	{ id: 'all', title: 'Все снимки', photos: allPhotos },
	{
		id: 'favorites',
		title: 'Избранное',
		photos: favoritePhotos,
	},
	galleryAlbums[0],
	galleryAlbums[1],
	galleryAlbums[2],
];

const fileHeight = 66;
const fileStep = 54;
const collapsedFileHeight = 22;
const collapsedActiveHeight = 52;
const collapsedFileStep = 6;
const collapseDistance = 116;
const pullDistance = 112;

function clamp(value: number, min: number, max: number) {
	return Math.min(max, Math.max(min, value));
}

function mix(from: number, to: number, progress: number) {
	return from + (to - from) * progress;
}

function getFileStyle(index: number, isActive: boolean, collapse: number): CSSProperties {
	return {
		'--gallery2-file-top': `${mix(index * fileStep, index * collapsedFileStep, collapse)}px`,
		'--gallery2-file-height': `${mix(
			fileHeight,
			isActive ? collapsedActiveHeight : collapsedFileHeight,
			collapse,
		)}px`,
		zIndex: index + 1,
	} as CSSProperties;
}

function moveLast(items: typeof catalogs, activeId: string) {
	return [
		...items.filter((catalog) => catalog.id !== activeId),
		items.find((catalog) => catalog.id === activeId)!,
	];
}

export function AlbumsScreen() {
	const [activeId, setActiveId] = useState('all');
	const [ordered, setOrdered] = useState(() => moveLast(catalogs, 'all'));
	const [modes, setModes] = useState<Record<string, GridMode>>({});
	const [scrollCollapse, setScrollCollapse] = useState(0);
	const fileDrag = useRef<{
		pointerId: number;
		startY: number;
		startCollapse: number;
		catalogId: string;
		hasMoved: boolean;
	} | null>(null);
	const ignoredClickId = useRef<string | null>(null);
	const active = catalogs.find((catalog) => catalog.id === activeId) ?? catalogs[0];
	const mode = modes[active.id] ?? 'grid';
	const isScrolled = scrollCollapse > 0.08;
	const filesHeight = mix(
		(catalogs.length - 1) * fileStep + fileHeight,
		(catalogs.length - 1) * collapsedFileStep + collapsedActiveHeight,
		scrollCollapse,
	);
	const select = (catalogId: string) => {
		if (ignoredClickId.current === catalogId) {
			ignoredClickId.current = null;
			return;
		}

		if (catalogId === activeId) return;

		setActiveId(catalogId);
		setOrdered((current) => moveLast(current, catalogId));
		setScrollCollapse(0);
	};
	const handleFilePointerDown = (event: PointerEvent<HTMLButtonElement>, catalogId: string) => {
		if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;

		ignoredClickId.current = null;
		fileDrag.current = {
			pointerId: event.pointerId,
			startY: event.clientY,
			startCollapse: scrollCollapse,
			catalogId,
			hasMoved: false,
		};
		event.currentTarget.setPointerCapture(event.pointerId);
	};
	const handleFilePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
		const drag = fileDrag.current;

		if (!drag || drag.pointerId !== event.pointerId) return;
		if (event.pointerType === 'mouse' && event.buttons !== 1) {
			fileDrag.current = null;
			return;
		}

		const deltaY = event.clientY - drag.startY;

		if (Math.abs(deltaY) < 4) return;

		drag.hasMoved = true;
		setScrollCollapse(clamp(drag.startCollapse - deltaY / pullDistance, 0, 1));
		event.preventDefault();
	};
	const finishFileDrag = (event: PointerEvent<HTMLButtonElement>, canceled = false) => {
		const drag = fileDrag.current;

		if (!drag || drag.pointerId !== event.pointerId) return;

		const deltaY = event.clientY - drag.startY;
		fileDrag.current = null;

		if (event.currentTarget.hasPointerCapture(event.pointerId)) {
			event.currentTarget.releasePointerCapture(event.pointerId);
		}

		if (!drag.hasMoved) return;

		ignoredClickId.current = canceled ? null : drag.catalogId;

		if (deltaY > 22) {
			setScrollCollapse(0);
			return;
		}

		if (deltaY < -22) {
			setScrollCollapse(1);
		}
	};

	return (
		<PhotoScreen
			className={`gallery2-screen${isScrolled ? ' is-scrolled' : ''}`}
			title="Альбомы"
			photos={active.photos}
			gridMode={mode}
			gridHeader={
				<div
					className="gallery2-files"
					role="tablist"
					aria-label="Альбомы"
					style={
						{
							'--gallery2-files-height': `${filesHeight}px`,
							'--gallery2-collapse': scrollCollapse,
						} as CSSProperties
					}
				>
					{ordered.map((catalog, index) => (
						<button
							key={catalog.id}
							type="button"
							role="tab"
							aria-selected={catalog.id === active.id}
							className={`gallery2-file${catalog.id === active.id ? ' is-active' : ''}`}
							style={getFileStyle(index, catalog.id === active.id, scrollCollapse)}
							onClick={() => select(catalog.id)}
							onPointerDown={(event) => handleFilePointerDown(event, catalog.id)}
							onPointerMove={handleFilePointerMove}
							onPointerUp={finishFileDrag}
							onPointerCancel={(event) => finishFileDrag(event, true)}
						>
							<Text as="span" variant="semiBold-20">
								{catalog.title}
							</Text>
							<Text as="span" variant="regular-14" className="gallery2-file__count">
								{getPhotoCountLabel(catalog.photos.length)}
							</Text>
						</button>
					))}
				</div>
			}
			onScroll={(scrollTop) =>
				setScrollCollapse(clamp(scrollTop / collapseDistance, 0, 1))
			}
			headerAction={
				<GridToggle
					mode={mode}
					onToggle={() =>
						setModes((current) => ({
							...current,
							[active.id]: mode === 'grid' ? 'feed' : 'grid',
						}))
					}
				/>
			}
			navActive="albums"
			navRoutes={gallery2Routes}
			scrollKey={active.id}
			showMarks={false}
			showNav
		/>
	);
}
