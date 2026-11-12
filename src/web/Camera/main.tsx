import { useEffect, useRef, useState } from 'react';
import { App } from '../../ui/App';
import { Icon, type IconName } from '../../ui/Icon';
import { IconButton } from '../../ui/IconButton';
import { SegmentedTabs } from '../../ui/SegmentedTabs';
import preview from '../../assets/camera/preview.png';
import './main.scss';

const flashModes = [
	{ id: 'auto', label: 'Авто', icon: 'camera-flash' },
	{ id: 'off', label: 'Выключена', icon: 'camera-flash-off' },
	{ id: 'on', label: 'Включена', icon: 'camera-flash' },
] as const;
const formats = ['4:3', '16:9', '1:1'] as const;
type Setting = 'warmth' | 'exposure' | 'format' | 'grid';

export function CameraMainScreen() {
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [mode, setMode] = useState('photo');
	const [flash, setFlash] = useState(0);
	const [format, setFormat] = useState(0);
	const [grid, setGrid] = useState(true);
	const [frontCamera, setFrontCamera] = useState(false);
	const [activeSetting, setActiveSetting] = useState<Setting | null>(null);
	const [capturing, setCapturing] = useState(false);
	const [announcement, setAnnouncement] = useState('');
	const captureTimer = useRef<number | undefined>();
	const settingsButton = useRef<HTMLDivElement>(null);
	useEffect(() => () => window.clearTimeout(captureTimer.current), []);

	const closeSettings = () => {
		setSettingsOpen(false);
		settingsButton.current?.querySelector('button')?.focus();
	};
	const selectSetting = (setting: Setting, title: string) => {
		setActiveSetting(setting);
		setAnnouncement(`${title}: настройка выбрана`);
	};
	const capture = () => {
		if (capturing) return;
		setCapturing(true);
		setAnnouncement('Демонстрация снимка. Реальная съёмка ещё не подключена.');
		captureTimer.current = window.setTimeout(() => setCapturing(false), 220);
	};
	const setting = (id: Setting, title: string, icon: IconName | null, onClick: () => void, pressed?: boolean) => (
		<div className={`camera-setting${activeSetting === id ? ' is-selected' : ''}`}>
			<IconButton size={44} className="camera-setting__button" variant="secondary" aria-label={id === 'format' ? `Формат: ${formats[format]}` : title} aria-pressed={pressed} onClick={onClick}>
				{icon ? <Icon name={icon} width={24} height={24} aria-hidden="true" /> : <span className="camera-setting__ratio">{formats[format]}</span>}
			</IconButton>
			<span className="camera-setting__label">{title}</span>
		</div>
	);

	return (
		<App className="camera-screen" data-theme="dark" aria-label="Камера" onKeyDown={(event) => {
			if (event.key === 'Escape' && settingsOpen) { event.preventDefault(); closeSettings(); }
		}}>
			<header className="camera-toolbar">
				<div ref={settingsButton}>
					<IconButton size={32} variant="secondary" className="camera-toolbar__button" aria-label={settingsOpen ? 'Закрыть настройки камеры' : 'Открыть настройки камеры'} aria-expanded={settingsOpen} aria-controls="camera-settings" onClick={() => setSettingsOpen((open) => !open)}>
						<Icon name="camera-controls" width={24} height={24} aria-hidden="true" />
					</IconButton>
				</div>
				<IconButton size={32} variant="secondary" className={`camera-toolbar__button camera-flash camera-flash--${flashModes[flash].id}`} aria-label={`Вспышка: ${flashModes[flash].label}`} onClick={() => setFlash((value) => (value + 1) % flashModes.length)}>
					<Icon name={flashModes[flash].icon} width={24} height={24} aria-hidden="true" />
					{flashModes[flash].id === 'auto' && <span className="camera-flash__mode" aria-hidden="true">A</span>}
				</IconButton>
			</header>

			<div className={`camera-preview${frontCamera ? ' is-front' : ''}`} role="img" aria-label="Демонстрационный видоискатель: светящийся след в вечернем небе">
				<img className="camera-preview__image" src={preview} alt="" draggable={false} />
				{grid && !settingsOpen && <div className="camera-preview__grid" aria-hidden="true"><i /><i /><i /><i /></div>}
				{capturing && <div className="camera-preview__flash" aria-hidden="true" />}
			</div>

			<footer className="camera-bottom">
				{settingsOpen ? <div className="camera-settings" id="camera-settings" role="group" aria-label="Быстрые настройки камеры">
					{setting('warmth', 'Теплота', 'camera-temperature', () => selectSetting('warmth', 'Теплота'), activeSetting === 'warmth')}
					{setting('exposure', 'Выдержка', 'camera-exposure', () => selectSetting('exposure', 'Выдержка'), activeSetting === 'exposure')}
					{setting('format', 'Формат', null, () => { setFormat((value) => (value + 1) % formats.length); setActiveSetting('format'); })}
					{setting('grid', 'Сетка', 'camera-grid', () => { setGrid((value) => !value); setActiveSetting(null); }, grid)}
				</div> : <div className="camera-shooting">
					<div onKeyDown={(event) => {
						if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
							event.preventDefault(); setMode((value) => value === 'photo' ? 'portrait' : 'photo');
							const tabs = event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]');
							tabs[mode === 'photo' ? 1 : 0]?.focus();
						}
					}}>
						<SegmentedTabs className="camera-modes" ariaLabel="Режим съёмки" tabs={[{ id: 'photo', label: 'Фото' }, { id: 'portrait', label: 'Портрет' }]} value={mode} onChange={setMode} />
					</div>
					<div className="camera-actions">
						<IconButton size={60} className="camera-thumbnail" variant="secondary" aria-label="Последний снимок" onClick={() => setAnnouncement('Галерея будет добавлена на следующем этапе.')}><img src={preview} alt="" /></IconButton>
						<IconButton size={60} className="camera-shutter" variant="secondary" aria-label="Сделать снимок" onClick={capture} disabled={capturing}><span className="camera-shutter__disc" /></IconButton>
						<IconButton size={44} className="camera-switch" variant="secondary" aria-label="Переключить камеру" aria-pressed={frontCamera} onClick={() => setFrontCamera((front) => !front)}><Icon name="arrow-repeat" width={26} height={26} aria-hidden="true" /></IconButton>
					</div>
				</div>}
			</footer>
			<span className="camera-screen__announcement" role="status" aria-live="polite">{announcement}</span>
		</App>
	);
}
