import { useState } from 'react';
import { Text } from '../../ui/Fonts';
import { Switch } from '../../ui/Switch';
import './panel.scss';
import './scroll.scss';

type Band = { id: string; title: string; text: string; background: string; ink: string };

const bands: ReadonlyArray<Band> = [
	{ id: 'white', title: 'Белая страница', text: 'Под баром белый фон', background: '#ffffff', ink: '#212529' },
	{ id: 'dark', title: 'Тёмная страница', text: 'Под баром тёмный фон', background: '#1b1c20', ink: '#ffffff' },
	{ id: 'yellow', title: 'Жёлтая плашка', text: 'Светлый яркий цвет', background: '#ffd84d', ink: '#212529' },
	{ id: 'sea', title: 'Картинка', text: 'Тёмный градиент', background: 'linear-gradient(180deg, #0b3c49, #2a9d8f)', ink: '#ffffff' },
	{ id: 'mint', title: 'Светлая мята', text: 'Светлый фон', background: '#d9f5ea', ink: '#212529' },
	{ id: 'violet', title: 'Фиолетовый', text: 'Средняя яркость', background: '#6a1fa8', ink: '#ffffff' },
	{ id: 'white2', title: 'Снова белая', text: 'Чистый белый: для таких экранов нужна заливка', background: '#ffffff', ink: '#212529' },
	{ id: 'black', title: 'Чёрный экран', text: 'Видео и камера', background: '#000000', ink: '#ffffff' },
];

/**
 * P3: контент едет под прозрачные бары. Значки фиксированные (#FFFFFF),
 * цвет контента их не меняет. Градиента нет.
 */
export default function StatusBarScrollPage() {
	const [darkIcons, setDarkIcons] = useState(false);
	const icons = darkIcons ? 'dark' : 'light';

	return (
		<div
			className="sb-scroll"
			data-status-bar-mode="overlay"
			data-status-bar-icons={icons}
			data-nav-bar-mode="overlay"
			data-nav-bar-icons={icons}
		>
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
					<Text variant="medium-16">Чёрные значки</Text>
					<Switch aria-label="Чёрные значки" checked={darkIcons} onChange={(event) => setDarkIcons(event.target.checked)} />
				</div>
			</div>
		</div>
	);
}
