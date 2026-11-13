import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';
import { App } from '../../ui/App';
import { Button } from '../../ui/Button';
import { Icon, type IconName } from '../../ui/Icon';
import { IconButton } from '../../ui/IconButton';
import preview from '../../assets/camera/preview.png';
import { ExposureControl, exposureLabel } from './exposure.parts';
import { CameraModeDrum } from './modes.parts';
import { WarmthControl } from './warmth.parts';
import { CameraPanelTransition, useCameraAnimatedNumber } from './transitions.parts';
import './main.scss';

const flashModes = [
	{ id: 'auto', label: 'Авто', icon: 'camera-flash' },
	{ id: 'off', label: 'Выключена', icon: 'camera-flash-off' },
	{ id: 'on', label: 'Включена', icon: 'camera-flash' },
] as const;
// Labels follow camera conventions; the viewfinder is oriented vertically.
const formats = [
	{ label: '4:3', ratio: 3 / 4, frame: 'standard' },
	{ label: '1:1', ratio: 1, frame: 'square' },
	{ label: '16:9', ratio: 9 / 16, frame: 'tall' },
] as const;
type Setting = 'warmth' | 'exposure' | 'format' | 'grid';

export function CameraMainScreen() {
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [mode, setMode] = useState('photo');
	const [flash, setFlash] = useState(0);
	const [format, setFormat] = useState(0);
	const [grid, setGrid] = useState(true);
	const [frontCamera, setFrontCamera] = useState(false);
	const [activeSetting, setActiveSetting] = useState<Setting | null>(null);
	const [exposure, setExposure] = useState<number | null>(null);
	const [warmth, setWarmth] = useState(0);
	const [capturing, setCapturing] = useState(false);
	const [announcement, setAnnouncement] = useState('');
	const captureTimer = useRef<number | undefined>();
	const settingsButton = useRef<HTMLDivElement>(null);
	const instanceId = useId();
	const warmthFilterId = `camera-warmth-${instanceId.replace(/[^a-zA-Z0-9_-]/g, '')}`;
	useEffect(() => () => window.clearTimeout(captureTimer.current), []);
	const exposureOpen = activeSetting === 'exposure';
	const warmthOpen = activeSetting === 'warmth';
	const adjustmentOpen = exposureOpen || warmthOpen;
	const settingsChanged = warmth !== 0 || exposure !== null;
	const photoFormat = formats[format];
	const animatedWarmth = useCameraAnimatedNumber(warmth);
	const temperature = animatedWarmth / 100 * 0.3;

	const closeSettings = () => {
		setSettingsOpen(false);
		setActiveSetting(null);
		settingsButton.current?.querySelector('button')?.focus();
	};
	const resetSettings = () => {
		setWarmth(0); setExposure(null);
		if (!adjustmentOpen) setActiveSetting(null);
		setAnnouncement('Настройки камеры сброшены.');
		settingsButton.current?.querySelector('button')?.focus();
	};
	const capture = () => {
		if (capturing) return;
		setCapturing(true);
		setAnnouncement('Демонстрация снимка. Реальная съёмка ещё не подключена.');
		captureTimer.current = window.setTimeout(() => setCapturing(false), 220);
	};
	const setting = (id: Setting, title: string, icon: IconName | null, onClick: () => void, pressed?: boolean) => {
		const highlighted = id === 'format' ? format !== 0 : pressed === true;
		return <div className={`camera-setting${highlighted ? ' is-selected' : ''}`}>
			<IconButton size={44} className="camera-setting__button" variant="secondary" aria-label={id === 'format' ? `Формат: ${photoFormat.label}` : title} aria-pressed={pressed} onClick={onClick}>
				{icon ? <Icon name={icon} width={24} height={24} aria-hidden="true" /> : <span className="camera-setting__ratio">{photoFormat.label}</span>}
			</IconButton>
			<span className="camera-setting__label">{title}</span>
		</div>;
	};
	const shutter = <IconButton size={60} className="camera-shutter" variant="secondary" aria-label="Сделать снимок" onClick={capture} disabled={capturing}><span className="camera-shutter__disc" /></IconButton>;

	return (
		<App className={`camera-screen camera-screen--format-${photoFormat.frame}`} style={{ '--camera-frame-ratio': photoFormat.ratio } as CSSProperties} data-theme="dark" aria-label="Камера" onKeyDown={(event) => {
			if (event.key === 'Escape' && (settingsOpen || adjustmentOpen)) { event.preventDefault(); closeSettings(); }
		}}>
			<svg className="camera-filters" width="0" height="0" aria-hidden="true" focusable="false">
				<defs><filter id={warmthFilterId} colorInterpolationFilters="sRGB"><feColorMatrix type="matrix" values={`${1 + temperature} 0 0 0 0 0 1 0 0 0 0 0 ${1 - temperature} 0 0 0 0 0 1 0`} /></filter></defs>
			</svg>
			<header className="camera-toolbar">
				<div className="camera-toolbar__settings" ref={settingsButton}>
					<IconButton size={32} variant="secondary" className={`camera-toolbar__button${settingsChanged ? ' is-modified' : ''}`} aria-label={settingsOpen ? 'Закрыть настройки камеры' : 'Открыть настройки камеры'} aria-expanded={settingsOpen} aria-controls="camera-settings" onClick={() => { setActiveSetting(null); setSettingsOpen((open) => !open); }}>
						<Icon name="camera-controls" width={24} height={24} aria-hidden="true" />
					</IconButton>
					<Button size={32} variant="secondary" className={`camera-reset${settingsChanged ? ' is-visible' : ''}`} disabled={!settingsChanged} aria-hidden={!settingsChanged} tabIndex={settingsChanged ? 0 : -1} aria-label="Сбросить настройки камеры" leftIcon={<Icon name="arrow-repeat" width={20} height={20} aria-hidden="true" />} onClick={resetSettings}>Сбросить</Button>
				</div>
				<IconButton size={32} variant="secondary" className={`camera-toolbar__button camera-flash camera-flash--${flashModes[flash].id}`} aria-label={`Вспышка: ${flashModes[flash].label}`} onClick={() => setFlash((value) => (value + 1) % flashModes.length)}>
					<Icon key={flashModes[flash].id} className="camera-flash__icon" name={flashModes[flash].icon} width={24} height={24} aria-hidden="true" />
					{flashModes[flash].id === 'auto' && <span className="camera-flash__mode" aria-hidden="true">A</span>}
				</IconButton>
			</header>

			<div className="camera-viewfinder">
				<div className={`camera-preview${frontCamera ? ' is-front' : ''}`} role="img" aria-label={`Демонстрационный видоискатель ${photoFormat.label}: светящийся след в вечернем небе`}>
					<img className="camera-preview__image" src={preview} alt="" draggable={false} style={{ filter: `${animatedWarmth === 0 ? '' : `url("#${warmthFilterId}") `}brightness(${2 ** (exposure ?? 0)})` }} />
					<div className={`camera-preview__grid${grid ? ' is-visible' : ''}`} aria-hidden="true"><i /><i /><i /><i /></div>
					{capturing && <div className="camera-preview__flash" aria-hidden="true" />}
					<span className={`camera-exposure-value${exposureOpen ? ' is-visible' : ''}`} aria-hidden={!exposureOpen}>{exposureLabel(exposure)}</span>
				</div>
			</div>

			<footer className="camera-bottom">
				<CameraPanelTransition view={exposureOpen ? 'exposure' : warmthOpen ? 'warmth' : settingsOpen ? 'settings' : 'shooting'}>{(panel) =>
				panel === 'exposure' || panel === 'warmth' ? <div className="camera-adjustment-controls">
					{panel === 'exposure' ? <ExposureControl value={exposure} onChange={setExposure} onClose={closeSettings} onReset={() => setExposure(null)} /> : <WarmthControl value={warmth} onChange={setWarmth} onClose={closeSettings} onReset={() => setWarmth(0)} />}
					<div className="camera-adjustment-shutter">{shutter}</div>
				</div> : panel === 'settings' ? <div className="camera-settings" id="camera-settings" role="group" aria-label="Быстрые настройки камеры">
					{setting('warmth', 'Теплота', 'camera-temperature', () => { setActiveSetting('warmth'); setSettingsOpen(false); }, warmth !== 0)}
					{setting('exposure', 'Выдержка', 'camera-exposure', () => { setActiveSetting('exposure'); setSettingsOpen(false); }, exposure !== null)}
					{setting('format', 'Формат', null, () => { setFormat((value) => (value + 1) % formats.length); setActiveSetting('format'); })}
					{setting('grid', 'Сетка', 'camera-grid', () => { setGrid((value) => !value); setActiveSetting(null); }, grid)}
				</div> : <div className="camera-shooting">
					<CameraModeDrum value={mode} onChange={setMode} />
					<div className="camera-actions">
						<IconButton size={60} className="camera-thumbnail" variant="secondary" aria-label="Последний снимок" onClick={() => setAnnouncement('Галерея будет добавлена на следующем этапе.')}><img src={preview} alt="" /></IconButton>
						{shutter}
						<IconButton size={44} className="camera-switch" variant="secondary" aria-label="Переключить камеру" aria-pressed={frontCamera} onClick={() => setFrontCamera((front) => !front)}><Icon name="arrow-repeat" width={26} height={26} aria-hidden="true" /></IconButton>
					</div>
				</div>}
				</CameraPanelTransition>
			</footer>
			<span className="camera-screen__announcement" role="status" aria-live="polite">{announcement}</span>
		</App>
	);
}
