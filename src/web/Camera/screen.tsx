import { useMemo, useState } from 'react';
import { App } from '../../ui/App';
import { Icon } from '../../ui/Icon';
import './screen.scss';

type CameraQuickAction = {
	id: string;
	label: string;
	icon: string;
};

type CameraAdvancedAction = {
	id: string;
	label: string;
	value: string;
	icon: string;
};

const quickActions: CameraQuickAction[] = [
	{ id: 'focus', label: 'Фокус', icon: 'cursor-outline' },
	{ id: 'wb', label: 'WB', icon: 'light-mode-50-outline' },
	{ id: 'light', label: 'Свет', icon: 'brightness-outline' },
	{ id: 'ratio', label: '4:3', icon: 'open-in-full' },
];

const advancedActions: CameraAdvancedAction[] = [
	{ id: 'iso', label: 'ISO', value: '100', icon: 'light-mode-0-outline' },
	{ id: 'ev', label: 'Эксп.', value: '±0', icon: 'plus-minus' },
	{ id: 'timer', label: 'Таймер', value: 'Off', icon: 'clock-outline' },
	{ id: 'hdr', label: 'HDR', value: 'Auto', icon: 'image-outline' },
	{ id: 'grid', label: 'Сетка', value: '3×3', icon: 'apps' },
	{ id: 'raw', label: 'RAW', value: 'Off', icon: 'file-outline' },
];

const PANEL_PEEK = 32;
const PANEL_HEIGHT = 220;
const SWIPE_THRESHOLD = 0.28;

function clamp(value: number, min: number, max: number) {
	return Math.max(min, Math.min(value, max));
}

export function CameraScreen() {
	const [isPanelOpen, setIsPanelOpen] = useState(false);
	const [dragOffset, setDragOffset] = useState(0);
	const [dragStartY, setDragStartY] = useState<number | null>(null);

	const hiddenOffset = PANEL_HEIGHT - PANEL_PEEK;
	const panelOffset = useMemo(() => {
		if (dragStartY !== null) {
			const base = isPanelOpen ? 0 : hiddenOffset;
			return clamp(base + dragOffset, 0, hiddenOffset);
		}

		return isPanelOpen ? 0 : hiddenOffset;
	}, [dragOffset, dragStartY, hiddenOffset, isPanelOpen]);

	const handleDragStart = (clientY: number) => {
		setDragStartY(clientY);
		setDragOffset(0);
	};

	const handleDragMove = (clientY: number) => {
		if (dragStartY === null) {
			return;
		}

		setDragOffset(clientY - dragStartY);
	};

	const handleDragEnd = () => {
		if (dragStartY === null) {
			return;
		}

		const base = isPanelOpen ? 0 : hiddenOffset;
		const currentOffset = clamp(base + dragOffset, 0, hiddenOffset);
		const progress = currentOffset / hiddenOffset;

		setIsPanelOpen(progress < 1 - SWIPE_THRESHOLD);
		setDragOffset(0);
		setDragStartY(null);
	};

	return (
		<App>
			<div className="camera-screen">
				<header className="camera-screen__top">
					<button type="button" aria-label="Настройки" className="camera-screen__icon-button">
						<Icon name="settings-outline" width={22} height={22} alt="" aria-hidden="true" />
					</button>
					<div className="camera-screen__top-right">
						<button type="button" aria-label="Вспышка" className="camera-screen__icon-button">
							<Icon name="light-mode-100-outline" width={22} height={22} alt="" aria-hidden="true" />
						</button>
						<button type="button" aria-label="Сетка" className="camera-screen__icon-button">
							<Icon name="apps" width={22} height={22} alt="" aria-hidden="true" />
						</button>
					</div>
				</header>

				<section className="camera-screen__preview" aria-label="Предпросмотр камеры">
					<div className="camera-screen__grid" />
				</section>

				<div className="camera-screen__quick-settings" role="list">
					{quickActions.map((action) => (
						<button key={action.id} type="button" className="camera-screen__chip" role="listitem">
							<Icon name={action.icon} width={16} height={16} alt="" aria-hidden="true" />
							<span>{action.label}</span>
						</button>
					))}
				</div>

				<footer className="camera-screen__controls">
					<button type="button" className="camera-screen__thumb" aria-label="Открыть галерею" />
					<button type="button" className="camera-screen__shutter" aria-label="Сделать фото" />
					<button type="button" className="camera-screen__switch" aria-label="Переключить камеру">
						<Icon name="switches" width={30} height={30} alt="" aria-hidden="true" />
					</button>
				</footer>

				<section
					className={`camera-screen__panel${isPanelOpen ? ' is-open' : ''}`}
					style={{ transform: `translateY(${panelOffset}px)` }}
					onTouchStart={(event) => handleDragStart(event.touches[0]?.clientY ?? 0)}
					onTouchMove={(event) => handleDragMove(event.touches[0]?.clientY ?? 0)}
					onTouchEnd={handleDragEnd}
					onPointerDown={(event) => {
						event.currentTarget.setPointerCapture(event.pointerId);
						handleDragStart(event.clientY);
					}}
					onPointerMove={(event) => handleDragMove(event.clientY)}
					onPointerUp={handleDragEnd}
				>
					<button
						type="button"
						className="camera-screen__panel-handle"
						aria-label={isPanelOpen ? 'Скрыть дополнительные настройки' : 'Показать дополнительные настройки'}
						onClick={() => setIsPanelOpen((value) => !value)}
					/>
					<p className="camera-screen__panel-title">Дополнительные настройки</p>
					<div className="camera-screen__panel-grid">
						{advancedActions.map((item) => (
							<button key={item.id} type="button" className="camera-screen__panel-item">
								<Icon name={item.icon} width={16} height={16} alt="" aria-hidden="true" />
								<span>{item.label}</span>
								<strong>{item.value}</strong>
							</button>
						))}
					</div>
					<p className="camera-screen__panel-hint">Свайп вверх — показать, свайп вниз — скрыть</p>
				</section>
			</div>
		</App>
	);
}
