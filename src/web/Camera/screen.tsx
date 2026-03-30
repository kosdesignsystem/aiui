import { useState } from 'react';
import { App } from '../../ui/App';
import './screen.scss';

const quickSettings = ['Фокус', 'WB', 'Свет', '4:3'];
const advancedSettings = [
	'ISO 100',
	'EV ±0',
	'Таймер Off',
	'HDR Auto',
	'Сетка 3×3',
	'RAW Off',
];

const SWIPE_DISTANCE = 55;

export function CameraScreen() {
	const [isPanelOpen, setIsPanelOpen] = useState(false);
	const [touchStartY, setTouchStartY] = useState<number | null>(null);

	const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
		setTouchStartY(event.touches[0]?.clientY ?? null);
	};

	const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
		if (touchStartY === null) {
			return;
		}

		const touchEndY = event.changedTouches[0]?.clientY ?? touchStartY;
		const deltaY = touchStartY - touchEndY;

		if (deltaY > SWIPE_DISTANCE) {
			setIsPanelOpen(true);
		}

		if (deltaY < -SWIPE_DISTANCE) {
			setIsPanelOpen(false);
		}

		setTouchStartY(null);
	};

	return (
		<App>
			<div className="camera-screen" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
				<header className="camera-screen__top">
					<button type="button" aria-label="Настройки" className="camera-screen__icon-button">
						⚙️
					</button>
					<div className="camera-screen__top-right">
						<button type="button" aria-label="Вспышка" className="camera-screen__icon-button">
							⚡
						</button>
						<button type="button" aria-label="Сетка" className="camera-screen__icon-button">
							#
						</button>
					</div>
				</header>

				<section className="camera-screen__preview" aria-label="Предпросмотр камеры">
					<div className="camera-screen__grid" />
				</section>

				<div className="camera-screen__quick-settings" role="list">
					{quickSettings.map((item) => (
						<button key={item} type="button" className="camera-screen__chip" role="listitem">
							{item}
						</button>
					))}
				</div>

				<footer className="camera-screen__controls">
					<button type="button" className="camera-screen__thumb" aria-label="Открыть галерею" />
					<button type="button" className="camera-screen__shutter" aria-label="Сделать фото" />
					<button type="button" className="camera-screen__switch" aria-label="Переключить камеру">
						↻
					</button>
				</footer>

				<section className={`camera-screen__panel${isPanelOpen ? ' is-open' : ''}`}>
					<div className="camera-screen__panel-handle" aria-hidden="true" />
					<p className="camera-screen__panel-title">Дополнительные настройки</p>
					<div className="camera-screen__panel-grid">
						{advancedSettings.map((item) => (
							<button key={item} type="button" className="camera-screen__panel-item">
								{item}
							</button>
						))}
					</div>
					<p className="camera-screen__panel-hint">Свайп вверх — показать, свайп вниз — скрыть</p>
				</section>
			</div>
		</App>
	);
}
