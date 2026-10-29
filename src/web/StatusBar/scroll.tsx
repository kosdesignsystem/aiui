import { useState } from 'react';
import { Text } from '../../ui/Fonts';
import { Switch } from '../../ui/Switch';
import { BarProtection } from './protection';
import './scroll.scss';

type Band = { id: string; title: string; text: string; background: string; ink: string };

const bands: ReadonlyArray<Band> = [
	{ id: 'white', title: 'Белая страница', text: 'Под баром белый фон', background: '#ffffff', ink: '#212529' },
	{ id: 'dark', title: 'Тёмная страница', text: 'Под баром тёмный фон', background: '#1b1c20', ink: '#ffffff' },
	{ id: 'yellow', title: 'Жёлтая плашка', text: 'Светлый яркий цвет', background: '#ffd84d', ink: '#212529' },
	{ id: 'sea', title: 'Картинка', text: 'Тёмный градиент', background: 'linear-gradient(180deg, #0b3c49, #2a9d8f)', ink: '#ffffff' },
	{ id: 'mint', title: 'Светлая мята', text: 'Светлый фон', background: '#d9f5ea', ink: '#212529' },
	{ id: 'violet', title: 'Фиолетовый', text: 'Средняя яркость', background: '#6a1fa8', ink: '#ffffff' },
	{ id: 'white2', title: 'Снова белая', text: 'Белый текст на белом без градиента не виден', background: '#ffffff', ink: '#212529' },
	{ id: 'black', title: 'Чёрный экран', text: 'Видео и камера', background: '#000000', ink: '#ffffff' },
];

/**
 * P3: контент едет под прозрачные бары. Значки фиксированные (#FFFFFF),
 * цвет контента их не меняет. Градиент под барами держит читаемость.
 */
export default function StatusBarScrollPage() {
	const [protect, setProtect] = useState(true);

	return (
		<div className="sb-scroll" data-status-bar-icons="light" data-nav-bar-icons="light">
			<BarProtection enabled={protect} />
			<div className="sb-scroll__list">
				{bands.map((band) => (
					<section
						className="sb-scroll__band"
						key={band.id}
						style={{ background: band.background, color: band.ink }}
					>
						<h2>{band.title}</h2>
						<p>{band.text}</p>
					</section>
				))}
			</div>
			<div className="sb-panel">
				<div className="sb-panel__row">
					<Text variant="medium-16">Градиент под барами</Text>
					<Switch aria-label="Градиент под барами" checked={protect} onChange={(event) => setProtect(event.target.checked)} />
				</div>
			</div>
		</div>
	);
}
