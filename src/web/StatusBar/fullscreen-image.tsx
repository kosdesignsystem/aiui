import { useState } from 'react';
import { Text } from '../../ui/Fonts';
import { SegmentedTabs } from '../../ui/SegmentedTabs';
import './panel.scss';
import './fullscreen-image.scss';

type Photo = { id: string; label: string; background: string; title: string; ink: string; icons: 'light' | 'dark' };

const photos: ReadonlyArray<Photo> = [
	{
		id: 'night',
		label: 'Тёмное',
		title: 'Ночное море',
		ink: '#ffffff',
		icons: 'light',
		background:
			'radial-gradient(circle at 74% 20%, #f4f1de 0 22px, transparent 24px), linear-gradient(180deg, #0b1d3a 0%, #1d4e6b 55%, #0e2a2f 100%)',
	},
	{
		id: 'day',
		label: 'Светлое',
		title: 'Дневное небо',
		ink: '#212529',
		icons: 'dark',
		background:
			'radial-gradient(circle at 26% 22%, #fff7d6 0 30px, transparent 32px), linear-gradient(180deg, #bfe3ff 0%, #fdf0d5 60%, #f7d9a8 100%)',
	},
	{
		id: 'sunset',
		label: 'Закат',
		title: 'Закат',
		ink: '#ffffff',
		icons: 'light',
		background:
			'radial-gradient(circle at 50% 62%, #ffe8a3 0 34px, transparent 36px), linear-gradient(180deg, #e76f51 0%, #f4a261 48%, #264653 100%)',
	},
];

const cards = ['Заметка 1', 'Заметка 2', 'Заметка 3', 'Заметка 4', 'Заметка 5', 'Заметка 6', 'Заметка 7'];

/**
 * Режим «наложение»: изображение идёт под оба бара, градиента нет.
 * Цвет значков для кадра выбрал приложение заранее и при прокрутке он не меняется.
 */
export default function StatusBarFullscreenImagePage() {
	const [photoId, setPhotoId] = useState('night');
	const photo = photos.find((item) => item.id === photoId) ?? photos[0];

	return (
		<div
			className="sb-photo"
			data-status-bar-mode="overlay"
			data-status-bar-icons={photo.icons}
			data-nav-bar-mode="overlay"
			data-nav-bar-icons={photo.icons}
			style={{ background: photo.background, color: photo.ink }}
		>
			<div className="sb-photo__scroll">
				<div className="sb-photo__caption">
				<Text as="p" variant="semiBold-24">
					{photo.title}
				</Text>
				<Text as="p" variant="regular-14">
					Потяни вверх: карточки уходят под бары с блюром
				</Text>
				</div>
				{cards.map((card) => (
					<div className="sb-photo__card" key={card}>
						<Text as="p" variant="medium-16">{card}</Text>
						<Text as="p" variant="regular-14">Описание карточки</Text>
					</div>
				))}
			</div>
			<div className="sb-panel">
				<SegmentedTabs
					tabs={[
						{ id: photos[0].id, label: photos[0].label },
						{ id: photos[1].id, label: photos[1].label },
						{ id: photos[2].id, label: photos[2].label },
					]}
					value={photoId}
					onChange={setPhotoId}
					ariaLabel="Изображение"
				/>
			</div>
		</div>
	);
}
