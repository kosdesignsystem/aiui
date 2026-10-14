import type { IconName } from '../../ui/Icon';
import browserIcon from '../../assets/launcher/icons/Browser.png';
import calculatorIcon from '../../assets/launcher/icons/Calculator.png';
import calendarIcon from '../../assets/launcher/icons/Calendar.png';
import cameraIcon from '../../assets/launcher/icons/Camera.png';
import clockIcon from '../../assets/launcher/icons/Сlock.png';
import compassIcon from '../../assets/launcher/icons/Compass.png';
import contactsIcon from '../../assets/launcher/icons/Contacts.png';
import dictaphoneIcon from '../../assets/launcher/icons/Dictaphone.png';
import filesIcon from '../../assets/launcher/icons/File System.png';
import mailIcon from '../../assets/launcher/icons/Mail.png';
import mapsIcon from '../../assets/launcher/icons/Maps.png';
import messengerIcon from '../../assets/launcher/icons/Messenger.png';
import myOfficeIcon from '../../assets/launcher/icons/MyOffice.png';
import notesIcon from '../../assets/launcher/icons/Notes.png';
import phoneIcon from '../../assets/launcher/icons/Phone.png';
import galleryIcon from '../../assets/launcher/icons/Photo Gallery.png';
import settingsIcon from '../../assets/launcher/icons/Settings.png';
import smsIcon from '../../assets/launcher/icons/SMS.png';
import videoIcon from '../../assets/launcher/icons/Video.png';
import vpnIcon from '../../assets/launcher/icons/VPN.png';
import weatherIcon from '../../assets/launcher/icons/Weather.png';
import filesPreview from '../../assets/launcher/screens/Files.png';
import phonePreview from '../../assets/launcher/screens/Phone.png';
import cameraPreview from '../../assets/launcher/screens/Photo.png';
import galleryPreview from '../../assets/launcher/screens/Photo Gallery.png';
import settingsPreview from '../../assets/launcher/screens/Settings.png';
import weatherPreview from '../../assets/launcher/screens/Weather.png';

export type LauncherMode = 'lock' | 'pin' | 'home' | 'app' | 'shade' | 'recents';
export type ShadeOrigin = 'home' | 'app';
export type ShadeToggleMotion = 'cellular' | 'wifi' | 'airplane' | 'location' | 'bell' | 'flashlight';

type LauncherApp = {
	id: string;
	label: string;
	icon: string;
	preview?: string;
	statusBar?: 'light' | 'dark';
};

export type LaunchableApp = LauncherApp & { preview: string };

type HomeLaunchState = {
	kind: 'home';
	app: LaunchableApp;
	x: number;
	y: number;
	active: boolean;
	loading: boolean;
};

type RecentLaunchState = {
	kind: 'recents';
	app: LaunchableApp;
	left: number;
	top: number;
	width: number;
	height: number;
	active: boolean;
};

export type LaunchState = HomeLaunchState | RecentLaunchState;

export type RecentTransitionBounds = {
	left: number;
	top: number;
	width: number;
	height: number;
};

export type RecentTransitionState = {
	app: LaunchableApp;
	target?: RecentTransitionBounds;
};

export type LauncherLocationState = {
	skipHomeEntrance?: boolean;
};

export type LauncherDrag = {
	pointerId: number;
	startX: number;
	startY: number;
	startedAt: number;
	viewportWidth: number;
	mode: LauncherMode;
	homePage: number;
	axis: 'horizontal' | 'vertical' | null;
};

const apps: ReadonlyArray<LauncherApp> = [
	{ id: 'maps', label: 'Карты', icon: mapsIcon },
	{ id: 'camera', label: 'Камера', icon: cameraIcon, preview: cameraPreview, statusBar: 'light' },
	{ id: 'contacts', label: 'Контакты', icon: contactsIcon },
	{ id: 'browser', label: 'Браузер', icon: browserIcon },
	{ id: 'compass', label: 'Компас', icon: compassIcon },
	{ id: 'calls', label: 'Телефон', icon: phoneIcon, preview: phonePreview, statusBar: 'dark' },
	{ id: 'video', label: 'Видео', icon: videoIcon },
	{ id: 'reminders', label: 'Календарь', icon: calendarIcon },
	{ id: 'my-office', label: 'МойОфис', icon: myOfficeIcon },
	{ id: 'messenger', label: 'Мессенджер', icon: messengerIcon },
	{ id: 'calculator', label: 'Калькулятор', icon: calculatorIcon },
	{ id: 'notes', label: 'Заметки', icon: notesIcon },
	{ id: 'weather', label: 'Погода', icon: weatherIcon, preview: weatherPreview, statusBar: 'light' },
	{ id: 'files', label: 'Файлы', icon: filesIcon, preview: filesPreview, statusBar: 'dark' },
	{ id: 'clock', label: 'Часы', icon: clockIcon },
	{ id: 'settings', label: 'Настройки', icon: settingsIcon, preview: settingsPreview, statusBar: 'dark' },
	{ id: 'mail', label: 'Почта', icon: mailIcon },
	{ id: 'sms', label: 'Сообщения', icon: smsIcon },
	{ id: 'vpn', label: 'VPN', icon: vpnIcon },
	{ id: 'dictaphone', label: 'Диктофон', icon: dictaphoneIcon },
	{ id: 'gallery', label: 'Галерея', icon: galleryIcon, preview: galleryPreview, statusBar: 'dark' },
];

const launchableApps = apps.filter((app): app is LaunchableApp => Boolean(app.preview));
const unavailableApps = apps.filter((app) => !app.preview);
export const homePages: ReadonlyArray<ReadonlyArray<LauncherApp>> = [launchableApps, unavailableApps];
export const recentApps = launchableApps;

export const quickControls = [
	{ id: 'airplane', label: 'Режим полета', onIcon: 'avia', offIcon: 'avia', accent: '#d9a832', motion: 'airplane' },
	{ id: 'location', label: 'Геолокация', onIcon: 'place', offIcon: 'place-off', accent: '#287de0', motion: 'location' },
	{ id: 'silent', label: 'Без звука', onIcon: 'notification-off', offIcon: 'notification-active', accent: '#d63d4d', motion: 'bell' },
	{ id: 'flashlight', label: 'Фонарик', onIcon: 'lighter', offIcon: 'lighter-outline', accent: '#716cea', motion: 'flashlight' },
] as const satisfies ReadonlyArray<{
	id: string;
	label: string;
	onIcon: IconName;
	offIcon: IconName;
	accent: string;
	motion: ShadeToggleMotion;
}>;

export type QuickControlId = (typeof quickControls)[number]['id'];

export const TRANSITION_DURATION_MS = 180;

let launcherUnlocked = false;

export function isLauncherUnlocked() {
	return launcherUnlocked;
}

export function unlockLauncher() {
	launcherUnlocked = true;
}
