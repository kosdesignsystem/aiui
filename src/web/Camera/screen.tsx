import { useMemo, useState } from 'react';
import { App } from '../../ui/App';
import { Text } from '../../ui/Fonts';
import { Icon } from '../../ui/Icon';
import './screen.scss';

type AdvancedConfig = {
	iso: '100' | '200' | '400' | '800';
	ev: '-1' | '0' | '+1';
	timer: 'Off' | '3s' | '10s';
	hdr: 'Off' | 'Auto' | 'On';
	grid: '3×3' | '4×4' | 'Off';
	raw: 'Off' | 'On';
};

const PANEL_PEEK = 34;
const PANEL_HEIGHT = 236;
const SWIPE_THRESHOLD = 0.28;

const flashModes = ['off', 'auto', 'on'] as const;
const whiteBalanceModes = ['Авто', 'День', 'Облачно'] as const;
const ratioModes = ['4:3', '16:9', '1:1'] as const;
const focusModes = ['AF', 'MF'] as const;

const initialAdvanced: AdvancedConfig = {
	iso: '100',
	ev: '0',
	timer: 'Off',
	hdr: 'Auto',
	grid: '3×3',
	raw: 'Off',
};

function clamp(value: number, min: number, max: number) {
	return Math.max(min, Math.min(value, max));
}

function cycleInList<T extends string>(list: readonly T[], value: T): T {
	const index = list.indexOf(value);
	return list[(index + 1) % list.length];
}

export function CameraScreen() {
	const [isPanelOpen, setIsPanelOpen] = useState(false);
	const [dragOffset, setDragOffset] = useState(0);
	const [dragStartY, setDragStartY] = useState<number | null>(null);

	const [flashMode, setFlashMode] = useState<(typeof flashModes)[number]>('off');
	const [isGridEnabled, setIsGridEnabled] = useState(true);
	const [focusMode, setFocusMode] = useState<(typeof focusModes)[number]>('AF');
	const [whiteBalance, setWhiteBalance] = useState<(typeof whiteBalanceModes)[number]>('Авто');
	const [ratio, setRatio] = useState<(typeof ratioModes)[number]>('4:3');
	const [brightnessBoost, setBrightnessBoost] = useState(false);
	const [cameraFacing, setCameraFacing] = useState<'rear' | 'front'>('rear');
	const [shotCount, setShotCount] = useState(0);
	const [isShutterActive, setIsShutterActive] = useState(false);
	const [advanced, setAdvanced] = useState<AdvancedConfig>(initialAdvanced);

	const hiddenOffset = PANEL_HEIGHT - PANEL_PEEK;
	const panelOffset = useMemo(() => {
		if (dragStartY !== null) {
			const baseOffset = isPanelOpen ? 0 : hiddenOffset;
			return clamp(baseOffset + dragOffset, 0, hiddenOffset);
		}

		return isPanelOpen ? 0 : hiddenOffset;
	}, [dragOffset, dragStartY, hiddenOffset, isPanelOpen]);

	const statusText = useMemo(() => {
		const flashLabel = flashMode === 'off' ? 'Flash Off' : flashMode === 'auto' ? 'Flash Auto' : 'Flash On';
		const cameraLabel = cameraFacing === 'rear' ? 'Основная камера' : 'Фронтальная камера';

		return `${cameraLabel} · ${flashLabel} · ${focusMode} · WB ${whiteBalance} · ${ratio}`;
	}, [cameraFacing, flashMode, focusMode, ratio, whiteBalance]);

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

		const baseOffset = isPanelOpen ? 0 : hiddenOffset;
		const currentOffset = clamp(baseOffset + dragOffset, 0, hiddenOffset);
		const progress = currentOffset / hiddenOffset;

		setIsPanelOpen(progress < 1 - SWIPE_THRESHOLD);
		setDragOffset(0);
		setDragStartY(null);
	};

	const handleTakePhoto = () => {
		setShotCount((value) => value + 1);
		setIsShutterActive(true);
		window.setTimeout(() => setIsShutterActive(false), 170);
	};

	const updateAdvanced = <K extends keyof AdvancedConfig>(key: K, nextValue: AdvancedConfig[K]) => {
		setAdvanced((current) => ({ ...current, [key]: nextValue }));
	};

	return (
		<App>
			<div className="camera-screen">
				<header className="camera-screen__top">
					<button
						type="button"
						aria-label="Открыть расширенные настройки"
						className="camera-screen__icon-button"
						onClick={() => setIsPanelOpen(true)}
					>
						<Icon name="settings-outline" width={22} height={22} alt="" aria-hidden="true" />
					</button>
					<div className="camera-screen__top-right">
						<button
							type="button"
							aria-label="Переключить вспышку"
							className={`camera-screen__icon-button${flashMode !== 'off' ? ' is-active' : ''}`}
							onClick={() => setFlashMode((value) => cycleInList(flashModes, value))}
						>
							<Icon name="light-mode-100-outline" width={22} height={22} alt="" aria-hidden="true" />
						</button>
						<button
							type="button"
							aria-label="Показать или скрыть сетку"
							className={`camera-screen__icon-button${isGridEnabled ? ' is-active' : ''}`}
							onClick={() => setIsGridEnabled((value) => !value)}
						>
							<Icon name="apps" width={22} height={22} alt="" aria-hidden="true" />
						</button>
					</div>
				</header>

				<section className="camera-screen__preview" aria-label="Предпросмотр камеры">
					{isShutterActive ? <div className="camera-screen__flash" aria-hidden="true" /> : null}
					{isGridEnabled ? <div className="camera-screen__grid" /> : null}
					<div className="camera-screen__status-pill">
						<Text variant="regular-12" color="primary">
							{statusText}
						</Text>
					</div>
				</section>

				<div className="camera-screen__quick-settings" role="list">
					<button
						type="button"
						className="camera-screen__chip"
						role="listitem"
						onClick={() => setFocusMode((value) => cycleInList(focusModes, value))}
					>
						<Icon name="cursor-outline" width={16} height={16} alt="" aria-hidden="true" />
						<span>{focusMode}</span>
					</button>
					<button
						type="button"
						className="camera-screen__chip"
						role="listitem"
						onClick={() => setWhiteBalance((value) => cycleInList(whiteBalanceModes, value))}
					>
						<Icon name="light-mode-50-outline" width={16} height={16} alt="" aria-hidden="true" />
						<span>{whiteBalance}</span>
					</button>
					<button
						type="button"
						className={`camera-screen__chip${brightnessBoost ? ' is-active' : ''}`}
						role="listitem"
						onClick={() => setBrightnessBoost((value) => !value)}
					>
						<Icon name="brightness-outline" width={16} height={16} alt="" aria-hidden="true" />
						<span>{brightnessBoost ? 'Свет+' : 'Свет'}</span>
					</button>
					<button
						type="button"
						className="camera-screen__chip"
						role="listitem"
						onClick={() => setRatio((value) => cycleInList(ratioModes, value))}
					>
						<Icon name="open-in-full" width={16} height={16} alt="" aria-hidden="true" />
						<span>{ratio}</span>
					</button>
				</div>

				<footer className="camera-screen__controls">
					<button
						type="button"
						className="camera-screen__thumb"
						aria-label="Открыть галерею"
						title={`Сделано фото: ${shotCount}`}
					>
						<Text variant="regular-12" color="primary">
							{shotCount}
						</Text>
					</button>
					<button type="button" className="camera-screen__shutter" aria-label="Сделать фото" onClick={handleTakePhoto} />
					<button
						type="button"
						className="camera-screen__switch"
						aria-label="Переключить камеру"
						onClick={() => setCameraFacing((value) => (value === 'rear' ? 'front' : 'rear'))}
					>
						<Icon name="switches" width={30} height={30} alt="" aria-hidden="true" />
					</button>
				</footer>

				<section
					className="camera-screen__panel"
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
					<Text as="p" variant="medium-16" color="primary">
						Дополнительные настройки
					</Text>
					<div className="camera-screen__panel-grid">
						<button
							type="button"
							className="camera-screen__panel-item"
							onClick={() => updateAdvanced('iso', cycleInList(['100', '200', '400', '800'], advanced.iso))}
						>
							<Icon name="light-mode-0-outline" width={16} height={16} alt="" aria-hidden="true" />
							<span>ISO</span>
							<strong>{advanced.iso}</strong>
						</button>
						<button
							type="button"
							className="camera-screen__panel-item"
							onClick={() => updateAdvanced('ev', cycleInList(['-1', '0', '+1'], advanced.ev))}
						>
							<Icon name="plus-minus" width={16} height={16} alt="" aria-hidden="true" />
							<span>Эксп.</span>
							<strong>{advanced.ev}</strong>
						</button>
						<button
							type="button"
							className="camera-screen__panel-item"
							onClick={() => updateAdvanced('timer', cycleInList(['Off', '3s', '10s'], advanced.timer))}
						>
							<Icon name="clock-outline" width={16} height={16} alt="" aria-hidden="true" />
							<span>Таймер</span>
							<strong>{advanced.timer}</strong>
						</button>
						<button
							type="button"
							className="camera-screen__panel-item"
							onClick={() => updateAdvanced('hdr', cycleInList(['Off', 'Auto', 'On'], advanced.hdr))}
						>
							<Icon name="image-outline" width={16} height={16} alt="" aria-hidden="true" />
							<span>HDR</span>
							<strong>{advanced.hdr}</strong>
						</button>
						<button
							type="button"
							className="camera-screen__panel-item"
							onClick={() => {
								const next = cycleInList(['3×3', '4×4', 'Off'], advanced.grid);
								updateAdvanced('grid', next);
								setIsGridEnabled(next !== 'Off');
							}}
						>
							<Icon name="apps" width={16} height={16} alt="" aria-hidden="true" />
							<span>Сетка</span>
							<strong>{advanced.grid}</strong>
						</button>
						<button
							type="button"
							className="camera-screen__panel-item"
							onClick={() => updateAdvanced('raw', cycleInList(['Off', 'On'], advanced.raw))}
						>
							<Icon name="file-outline" width={16} height={16} alt="" aria-hidden="true" />
							<span>RAW</span>
							<strong>{advanced.raw}</strong>
						</button>
					</div>
					<Text as="p" variant="regular-12" color="secondary">
						Свайп вверх — показать, свайп вниз — скрыть
					</Text>
				</section>
			</div>
		</App>
	);
}
