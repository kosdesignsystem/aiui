import {
	CSSProperties,
	PointerEvent as ReactPointerEvent,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { App } from '../../ui/App';
import { Icon, type IconName } from '../../ui/Icon';
import { LoadingAppScreen } from '../LoadingApp/LoadingScreen';
import calculatorIcon from '../../assets/app_icons/calculator.svg';
import calendarIcon from '../../assets/app_icons/calendar.svg';
import clockIcon from '../../assets/app_icons/clock.svg';
import contactsIcon from '../../assets/app_icons/contacts.svg';
import mailIcon from '../../assets/app_icons/mail.svg';
import messengerIcon from '../../assets/app_icons/sms.svg';
import phoneIcon from '../../assets/app_icons/phone.svg';
import settingsIcon from '../../assets/app_icons/settings.svg';
import weatherIcon from '../../assets/app_icons/weather.svg';
import './launcher.scss';

type LauncherMode = 'lock' | 'pin' | 'home' | 'shade' | 'recents';

type LauncherApp = {
	id: string;
	label: string;
	icon: string;
	path: string;
	badge?: string;
};

type LaunchState = {
	app: LauncherApp;
	x: number;
	y: number;
	active: boolean;
	loading: boolean;
};

const apps: LauncherApp[] = [
	{ id: 'contacts', label: 'Контакты', icon: contactsIcon, path: '/app/Contacts/main' },
	{ id: 'calculator', label: 'Калькулятор', icon: calculatorIcon, path: '/app/Components/view' },
	{ id: 'weather', label: 'Погода', icon: weatherIcon, path: '/app/Gallery/all' },
	{ id: 'clock', label: 'Часы', icon: clockIcon, path: '/app/LoadingApp/main' },
	{ id: 'phone', label: 'Телефон', icon: phoneIcon, path: '/app/Calls/main', badge: '1' },
	{ id: 'messages', label: 'Сообщения', icon: messengerIcon, path: '/app/Contacts/main', badge: '91' },
	{ id: 'calendar', label: 'Календарь', icon: calendarIcon, path: '/app/Reminders/today' },
	{ id: 'settings', label: 'Настройки', icon: settingsIcon, path: '/app/Components/navigation' },
];

const recentApps: LauncherApp[] = [apps[4], apps[1], apps[5], { id: 'mail', label: 'Почта', icon: mailIcon, path: '/app/Reminders/all' }];

const quickControls: Array<{ id: string; label: string; icon: IconName }> = [
	{ id: 'airplane', label: 'Авиарежим', icon: 'avia' },
	{ id: 'location', label: 'Геолокация', icon: 'place' },
	{ id: 'sound', label: 'Звук', icon: 'notification-active' },
	{ id: 'flashlight', label: 'Фонарик', icon: 'lighter' },
];

const unlockedSessionKey = 'aiui-launcher-unlocked';
const transitionDuration = 180;

function isUnlocked() {
	return typeof window !== 'undefined' && window.sessionStorage.getItem(unlockedSessionKey) === 'true';
}

function LauncherStatus() {
	return (
		<div className="launcher-status" aria-hidden="true">
			<span>13:52</span>
			<span className="launcher-status__icons">
				<Icon name="signal-cellular-100" width={14} height={14} />
				<Icon name="wifi" width={14} height={14} />
				<Icon name="battery-charge-medium" width={14} height={14} />
				<span>98%</span>
			</span>
		</div>
	);
}

function ClockBlock({ compact = false }: { compact?: boolean }) {
	return (
		<div className={`launcher-clock${compact ? ' launcher-clock--compact' : ''}`}>
			<time>13:52</time>
			<span>Понедельник, 24 июня</span>
		</div>
	);
}

function HomeGrid({ onLaunch }: { onLaunch: (event: ReactPointerEvent<HTMLButtonElement>, app: LauncherApp) => void }) {
	return (
		<div className="launcher-app-grid" aria-label="Приложения">
			{apps.map((app) => (
				<button
					className="launcher-app"
					key={app.id}
					type="button"
					onPointerUp={(event) => onLaunch(event, app)}
				>
					<span className="launcher-app__icon-wrap">
						<img className="launcher-app__icon" src={app.icon} alt="" />
						{app.badge ? <span className="launcher-app__badge">{app.badge}</span> : null}
					</span>
					<span className="launcher-app__label">{app.label}</span>
				</button>
			))}
		</div>
	);
}

function PinPad({ entered, onDigit, onCancel }: { entered: number; onDigit: (digit: number) => void; onCancel: () => void }) {
	return (
		<div className="launcher-pin">
			<Icon name="lock" width={22} height={22} aria-hidden="true" />
			<h1>Введите код-пароль</h1>
			<div className="launcher-pin__dots" aria-label={`Введено цифр: ${entered}`}>
				{[0, 1, 2, 3].map((index) => (
					<span key={index} className={index < entered ? 'is-filled' : ''} />
				))}
			</div>
			<button className="launcher-pin__forgot" type="button">Не помню</button>
			<div className="launcher-pin__keys">
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((digit) => (
					<button
						key={digit}
						className={digit === 0 ? 'is-zero' : ''}
						type="button"
						onClick={() => onDigit(digit)}
					>
						{digit}
					</button>
				))}
			</div>
			<div className="launcher-pin__actions">
				<button type="button">SOS</button>
				<button type="button" onClick={onCancel}>Отменить</button>
			</div>
		</div>
	);
}

function ControlShade({ onClose, onSettings }: { onClose: () => void; onSettings: () => void }) {
	const [mobileEnabled, setMobileEnabled] = useState(true);
	const [wifiEnabled, setWifiEnabled] = useState(false);

	return (
		<div className="launcher-shade" role="dialog" aria-label="Панель быстрых настроек">
			<ClockBlock />
			<div className="launcher-shade__networks">
				<button className={mobileEnabled ? 'is-active' : ''} type="button" onClick={() => setMobileEnabled((value) => !value)}>
					<Icon name="signal-cellular-100" width={22} height={22} />
					<strong>Моб. интернет</strong>
					<small>Megafon LTE</small>
				</button>
				<button className={wifiEnabled ? 'is-active' : ''} type="button" onClick={() => setWifiEnabled((value) => !value)}>
					<Icon name="wifi" width={22} height={22} />
					<strong>Wi-Fi</strong>
					<small>{wifiEnabled ? 'KLCorp' : 'Соединение...'}</small>
				</button>
			</div>
			<div className="launcher-shade__quick">
				{quickControls.map((control) => (
					<button key={control.id} type="button">
						<span><Icon name={control.icon} width={22} height={22} /></span>
						<small>{control.label}</small>
					</button>
				))}
			</div>
			<label className="launcher-slider">
				<Icon name="volume-0" width={20} height={20} />
				<input type="range" min="0" max="100" defaultValue="100" aria-label="Громкость" />
				<Icon name="volume-100" width={20} height={20} />
			</label>
			<label className="launcher-slider launcher-slider--brightness">
				<Icon name="brightness-low-outline" width={20} height={20} />
				<input type="range" min="0" max="100" defaultValue="48" aria-label="Яркость" />
				<Icon name="brightness" width={20} height={20} />
			</label>
			<button className="launcher-shade__settings" type="button" onClick={onSettings}>Перейти в настройки</button>
			<button className="launcher-shade__close" type="button" aria-label="Закрыть панель" onClick={onClose} />
		</div>
	);
}

function RecentCard({ app, onOpen }: { app: LauncherApp; onOpen: (event: ReactPointerEvent<HTMLButtonElement>, app: LauncherApp) => void }) {
	return (
		<button className={`launcher-recent-card launcher-recent-card--${app.id}`} type="button" onPointerUp={(event) => onOpen(event, app)}>
			<img src={app.icon} alt="" />
			<div className="launcher-recent-card__preview">
				{app.id === 'phone' ? (
					<><h3>Вызовы</h3><span /><span /><span /><span /></>
				) : app.id === 'calculator' ? (
					<><strong>100 000 000</strong><div className="launcher-recent-card__keys">{Array.from({ length: 12 }, (_, i) => <i key={i} />)}</div></>
				) : app.id === 'messages' ? (
					<><small>Polyna_12</small><p>Ау?</p><p>Спишь что ли?</p><p className="is-own">Да, спасибо!</p></>
				) : (
					<><div className="launcher-recent-card__mail"><img src={app.icon} alt="" /><span>Почта</span></div></>
				)}
			</div>
		</button>
	);
}

export function LauncherScreen() {
	const navigate = useNavigate();
	const [mode, setMode] = useState<LauncherMode>(() => (isUnlocked() ? 'home' : 'lock'));
	const [pinLength, setPinLength] = useState(0);
	const [blackout, setBlackout] = useState(false);
	const [dragOffset, setDragOffset] = useState(0);
	const [launch, setLaunch] = useState<LaunchState | null>(null);
	const timersRef = useRef<number[]>([]);
	const dragRef = useRef<{ pointerId: number; startY: number; mode: LauncherMode } | null>(null);
	const dragDeltaRef = useRef(0);

	const schedule = (callback: () => void, delay: number) => {
		const timer = window.setTimeout(callback, delay);
		timersRef.current.push(timer);
	};

	useEffect(() => () => timersRef.current.forEach(window.clearTimeout), []);

	const completeTransition = (nextMode: LauncherMode) => {
		setBlackout(true);
		schedule(() => {
			setMode(nextMode);
			setDragOffset(0);
			schedule(() => setBlackout(false), 30);
		}, transitionDuration);
	};

	const handlePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
		if (launch || (mode !== 'lock' && mode !== 'home' && mode !== 'shade')) return;
		dragRef.current = { pointerId: event.pointerId, startY: event.clientY, mode };
		dragDeltaRef.current = 0;
	};

	const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
		const drag = dragRef.current;
		if (!drag || drag.pointerId !== event.pointerId) return;
		const delta = event.clientY - drag.startY;
		dragDeltaRef.current = delta;
		if (drag.mode === 'lock') setDragOffset(Math.min(0, delta));
		if (drag.mode === 'home') setDragOffset(Math.max(-180, Math.min(260, delta)));
		if (drag.mode === 'shade') setDragOffset(Math.min(0, delta));
	};

	const handlePointerUp = (event: ReactPointerEvent<HTMLElement>) => {
		const drag = dragRef.current;
		if (!drag || drag.pointerId !== event.pointerId) return;
		const delta = event.clientY - drag.startY;
		dragRef.current = null;

		if (drag.mode === 'lock' && delta < -64) completeTransition('pin');
		else if (drag.mode === 'home' && delta > 72) { setMode('shade'); setDragOffset(0); }
		else if (drag.mode === 'home' && delta < -72) { setMode('recents'); setDragOffset(0); }
		else if (drag.mode === 'shade' && delta < -64) { setMode('home'); setDragOffset(0); }
		else setDragOffset(0);
		dragDeltaRef.current = 0;
	};

	const handleDigit = () => {
		const nextLength = pinLength + 1;
		setPinLength(nextLength);
		if (nextLength === 4) {
			window.sessionStorage.setItem(unlockedSessionKey, 'true');
			schedule(() => completeTransition('home'), 110);
		}
	};

	const startLaunch = (event: ReactPointerEvent<HTMLButtonElement>, app: LauncherApp) => {
		if (Math.abs(dragDeltaRef.current) > 6 || launch) return;
		const surfaceRect = event.currentTarget.closest('.launcher-screen')?.getBoundingClientRect();
		const targetRect = event.currentTarget.getBoundingClientRect();
		const x = targetRect.left + targetRect.width / 2 - (surfaceRect?.left ?? 0);
		const y = targetRect.top + Math.min(34, targetRect.height / 2) - (surfaceRect?.top ?? 0);
		setLaunch({ app, x, y, active: false, loading: false });
		requestAnimationFrame(() => requestAnimationFrame(() => setLaunch((value) => value ? { ...value, active: true } : value)));
		schedule(() => setLaunch((value) => value ? { ...value, loading: true } : value), 330);
		schedule(() => navigate(app.path), 1020);
	};

	const launchStyle = useMemo(() => launch ? ({ '--launch-x': `${launch.x}px`, '--launch-y': `${launch.y}px` } as CSSProperties) : undefined, [launch]);
	const lockStyle = { '--launcher-drag': `${dragOffset}px` } as CSSProperties;
	const shadePullProgress = mode === 'home' ? Math.max(0, Math.min(1, dragOffset / 220)) : 0;

	return (
		<App
			className={`launcher-screen launcher-screen--${mode}${blackout ? ' is-blackout' : ''}`}
			onPointerDown={handlePointerDown}
			onPointerMove={handlePointerMove}
			onPointerUp={handlePointerUp}
			onPointerCancel={handlePointerUp}
		>
			<LauncherStatus />
			<div className="launcher-wallpaper" aria-hidden="true" />

			{mode === 'lock' ? (
				<div className="launcher-lock" style={lockStyle}>
					<Icon name="lock" width={20} height={20} aria-hidden="true" />
					<ClockBlock />
					<span className="launcher-lock__handle" />
					<span className="launcher-hint">Проведите вверх</span>
				</div>
			) : null}

			{mode === 'pin' ? <PinPad entered={pinLength} onDigit={handleDigit} onCancel={() => { setPinLength(0); completeTransition('lock'); }} /> : null}

			{mode === 'home' || mode === 'shade' || mode === 'recents' ? (
				<div className={`launcher-home${mode !== 'home' ? ' is-background' : ''}`} style={mode === 'home' ? lockStyle : undefined}>
					<HomeGrid onLaunch={startLaunch} />
				</div>
			) : null}

			{mode === 'home' && shadePullProgress > 0 ? (
				<div className="launcher-shade launcher-shade--pull" style={{ '--shade-progress': shadePullProgress } as CSSProperties} aria-hidden="true">
					<ClockBlock /><div className="launcher-shade__ghost" />
				</div>
			) : null}

			{mode === 'shade' ? <ControlShade onClose={() => setMode('home')} onSettings={() => navigate('/app/Components/navigation')} /> : null}

			{mode === 'recents' ? (
				<div className="launcher-recents" role="dialog" aria-label="Недавние приложения">
					<button className="launcher-recents__close-all" type="button" onClick={() => setMode('home')}>Завершить все</button>
					<div className="launcher-recents__grid">
						{recentApps.map((app) => <RecentCard key={app.id} app={app} onOpen={startLaunch} />)}
					</div>
				</div>
			) : null}

			<div className="launcher-blackout" aria-hidden="true" />

			{launch ? (
				<div className={`launcher-launch${launch.active ? ' is-active' : ''}${launch.loading ? ' is-loading' : ''}`} style={launchStyle}>
					<div className="launcher-launch__wash" />
					<img className="launcher-launch__icon" src={launch.app.icon} alt="" />
					<div className="launcher-launch__loader"><LoadingAppScreen /></div>
				</div>
			) : null}
		</App>
	);
}
