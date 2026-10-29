import { useEffect, useRef, useState } from 'react';
import { contrastRatio, parseColor, pickBarIcons, type BarIcons } from '../Security/systemBars';
import './scroll.scss';

type Band = { id: string; title: string; text: string; from: string; to: string };

/** Цвета под баром. Градиенты считаются линейно, как рисует браузер. */
const bands: ReadonlyArray<Band> = [
	{ id: 'white', title: 'Белая страница', text: 'Светлый фон: значки #212529', from: '#ffffff', to: '#ffffff' },
	{ id: 'navy', title: 'Тёмная тема сайта', text: 'Тёмный фон: значки #FFFFFF', from: '#1b1c20', to: '#1b1c20' },
	{ id: 'sea', title: 'Картинка', text: 'Тёмный градиент: значки #FFFFFF', from: '#0b3c49', to: '#2a9d8f' },
	{ id: 'yellow', title: 'Жёлтая плашка', text: 'Светлый цвет: значки #212529', from: '#ffd84d', to: '#ffd84d' },
	{ id: 'fade', title: 'Плавный переход', text: 'Значки переключаются в точке равного контраста', from: '#101820', to: '#f6f7f9' },
	{ id: 'violet', title: 'Фиолетовый', text: 'Средняя яркость: выбирается лучший контраст', from: '#6a1fa8', to: '#6a1fa8' },
	{ id: 'mint', title: 'Светлая мята', text: 'Светлый цвет: значки #212529', from: '#d9f5ea', to: '#d9f5ea' },
	{ id: 'black', title: 'Чёрный экран', text: 'Видео и камера: значки #FFFFFF', from: '#000000', to: '#000000' },
];

const BAND_HEIGHT = 260;
const BAR_PROBE = 20;
const NAV_PROBE = 800 - 26;

function mixColor(from: string, to: string, t: number) {
	const a = parseColor(from);
	const b = parseColor(to);
	return {
		r: a.r + (b.r - a.r) * t,
		g: a.g + (b.g - a.g) * t,
		b: a.b + (b.b - a.b) * t,
		a: 1,
	};
}

function colorAt(offset: number) {
	const total = bands.length * BAND_HEIGHT;
	const y = Math.min(Math.max(offset, 0), total - 1);
	const band = bands[Math.floor(y / BAND_HEIGHT)];
	return mixColor(band.from, band.to, (y % BAND_HEIGHT) / BAND_HEIGHT);
}

export default function StatusBarScrollPage() {
	const scrollRef = useRef<HTMLDivElement>(null);
	const [scrollTop, setScrollTop] = useState(0);

	useEffect(() => {
		const el = scrollRef.current;
		if (!el) {
			return;
		}
		const onScroll = () => setScrollTop(el.scrollTop);
		el.addEventListener('scroll', onScroll, { passive: true });
		return () => el.removeEventListener('scroll', onScroll);
	}, []);

	const top = colorAt(scrollTop + BAR_PROBE);
	const bottom = colorAt(scrollTop + NAV_PROBE);
	const statusIcons: BarIcons = pickBarIcons(top);
	const navIcons: BarIcons = pickBarIcons(bottom);
	const iconColor = parseColor(statusIcons === 'dark' ? '#212529' : '#ffffff');

	return (
		<div
			className="sb-scroll"
			data-status-bar-icons={statusIcons}
			data-nav-bar-icons={navIcons}
			ref={scrollRef}
		>
			{bands.map((band) => (
				<section
					className={`sb-scroll__band is-${band.id}`}
					key={band.id}
					style={{ background: `linear-gradient(to bottom, ${band.from}, ${band.to})`, height: BAND_HEIGHT }}
				>
					<h2>{band.title}</h2>
					<p>{band.text}</p>
				</section>
			))}
			<div className="sb-scroll__hud" aria-live="off">
				Статус-бар: {statusIcons === 'dark' ? '#212529' : '#FFFFFF'}, контраст{' '}
				{contrastRatio(iconColor, top).toFixed(1)}
			</div>
		</div>
	);
}
