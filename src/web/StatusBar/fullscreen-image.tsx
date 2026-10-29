import { useState } from 'react';
import { Text } from '../../ui/Fonts';
import { SegmentedTabs } from '../../ui/SegmentedTabs';
import { Switch } from '../../ui/Switch';
import { BarProtection } from './protection';
import './fullscreen-image.scss';

type Photo = { id: string; label: string; background: string; title: string; ink: string };

const photos: ReadonlyArray<Photo> = [
	{
		id: 'night',
		label: 'Тёмное',
		title: 'Ночное море',
		ink: '#ffffff',
		background:
			'radial-gradient(circle at 74% 20%, #f4f1de 0 22px, transparent 24px), linear-gradient(180deg, #0b1d3a 0%, #1d4e6b 55%, #0e2a2f 100%)',
	},
	{
		id: 'day',
		label: 'Светлое',
		title: 'Дневное небо',
		ink: '#212529',
		background:
			'radial-gradient(circle at 26% 22%, #fff7d6 0 30px, transparent 32px), linear-gradient(180deg, #bfe3ff 0%, #fdf0d5 60%, #f7d9a8 100%)',
	},
	{
		id: 'sunset',
		label: 'Закат',
		title: 'Закат',
		ink: '#ffffff',
		background:
			'radial-gradient(circle at 50% 62%, #ffe8a3 0 34px, transparent 36px), linear-gradient(180deg, #e76f51 0%, #f4a261 48%, #264653 100%)',
	},
];

/**
 * P2: изображение идёт под оба бара. Статус-бар с белыми значками и своим
 * градиентом под кадр не подстраивается.
 */
export default function StatusBarFullscreenImagePage() {
	const [photoId, setPhotoId] = useState('day');
	const [protect, setProtect] = useState(true);
	const photo = photos.find((item) => item.id === photoId) ?? photos[0];

	return (
		<div
			className="sb-photo"
			data-status-bar-icons="light"
			data-nav-bar-icons="light"
			style={{ background: photo.background, color: photo.ink }}
		>
			<BarProtection enabled={protect} />
			<div className="sb-photo__caption">
				<Text as="p" variant="semiBold-24">
					{photo.title}
				</Text>
				<Text as="p" variant="regular-14">
					Статус-бар не зависит от кадра
				</Text>
			</div>
			<div className="sb-panel">
				<div className="sb-panel__row">
					<Text variant="medium-16">Градиент под навбаром</Text>
					<Switch aria-label="Градиент под навбаром" checked={protect} onChange={(event) => setProtect(event.target.checked)} />
				</div>
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
