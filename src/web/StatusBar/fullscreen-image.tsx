import { useState } from 'react';
import { Text } from '../../ui/Fonts';
import { SegmentedTabs } from '../../ui/SegmentedTabs';
import { parseColor, pickBarIcons } from '../Security/systemBars';
import './fullscreen-image.scss';

type Photo = { id: string; label: string; background: string; top: string; bottom: string; title: string };

const photos: ReadonlyArray<Photo> = [
	{
		id: 'night',
		label: 'Тёмное',
		top: '#0b1d3a',
		bottom: '#0e2a2f',
		title: 'Ночное море',
		background:
			'radial-gradient(circle at 74% 20%, #f4f1de 0 22px, transparent 24px), linear-gradient(180deg, #0b1d3a 0%, #1d4e6b 55%, #0e2a2f 100%)',
	},
	{
		id: 'day',
		label: 'Светлое',
		top: '#bfe3ff',
		bottom: '#f7d9a8',
		title: 'Дневное небо',
		background:
			'radial-gradient(circle at 26% 22%, #fff7d6 0 30px, transparent 32px), linear-gradient(180deg, #bfe3ff 0%, #fdf0d5 60%, #f7d9a8 100%)',
	},
	{
		id: 'sunset',
		label: 'Закат',
		top: '#e76f51',
		bottom: '#264653',
		title: 'Закат',
		background:
			'radial-gradient(circle at 50% 62%, #ffe8a3 0 34px, transparent 36px), linear-gradient(180deg, #e76f51 0%, #f4a261 48%, #264653 100%)',
	},
];

/**
 * P2: изображение идёт под оба бара на весь экран. Цвет значков выбирается
 * один раз по самому светлому месту под ними и при смене кадра, не при прокрутке.
 */
export default function StatusBarFullscreenImagePage() {
	const [photoId, setPhotoId] = useState('night');
	const photo = photos.find((item) => item.id === photoId) ?? photos[0];
	const statusIcons = pickBarIcons(parseColor(photo.top));
	const navIcons = pickBarIcons(parseColor(photo.bottom));
	const ink = statusIcons === 'light' ? '#ffffff' : '#212529';

	return (
		<div
			className="sb-photo"
			data-status-bar-icons={statusIcons}
			data-nav-bar-icons={navIcons}
			style={{ background: photo.background, color: ink }}
		>
			<div className="sb-photo__caption">
				<Text as="p" variant="semiBold-24">
					{photo.title}
				</Text>
				<Text as="p" variant="regular-14">
					Изображение под статус-баром и навбаром
				</Text>
			</div>
			<div className="sb-photo__switch">
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
