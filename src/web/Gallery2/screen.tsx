import { useState } from 'react';
import { Icon } from '../../ui/Icon';
import { galleryPhotos } from '../Gallery/model';
import { PhotoScreen } from '../Gallery/screen';
import { gallery2Routes } from './model';
import './screen.scss';

export type GridMode = 'grid' | 'feed';

export function GridToggle({ mode, onToggle }: { mode: GridMode; onToggle: () => void }) {
	const isFeed = mode === 'feed';

	return (
		<button
			type="button"
			className={`gallery2-toggle${isFeed ? ' is-feed' : ''}`}
			onClick={onToggle}
			aria-label={isFeed ? 'Показывать по четыре фото в ряд' : 'Показывать по одному фото в ряд'}
			aria-pressed={isFeed}
		>
			<Icon
				key={mode}
				name={isFeed ? 'material-view-agenda' : 'material-grid-view'}
				width={24}
				height={24}
				aria-hidden="true"
			/>
		</button>
	);
}

export function GalleryScreen() {
	const [mode, setMode] = useState<GridMode>('grid');

	return (
		<PhotoScreen
			className="gallery2-screen"
			title="Все фото"
			photos={galleryPhotos}
			gridMode={mode}
			headerAction={
				<GridToggle
					mode={mode}
					onToggle={() => setMode((current) => (current === 'grid' ? 'feed' : 'grid'))}
				/>
			}
			navRoutes={gallery2Routes}
			showMarks={false}
			showNav
		/>
	);
}
