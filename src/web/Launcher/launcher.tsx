import {
	CSSProperties,
	PointerEvent as ReactPointerEvent,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { App } from '../../ui/App';
import { Icon, type IconName } from '../../ui/Icon';
import { LoadingAppScreen } from '../LoadingApp/LoadingScreen';
import calendarIcon from '../../assets/app_icons/calendar.png';
import contactsIcon from '../../assets/app_icons/contacts.png';
import galleryIcon from '../../assets/app_icons/gallery.png';
import phoneIcon from '../../assets/app_icons/phone.png';
import callsPreview from '../../assets/launcher/recents/calls.png';
import contactsPreview from '../../assets/launcher/recents/contacts.png';
import galleryPreview from '../../assets/launcher/recents/gallery.png';
import remindersPreview from '../../assets/launcher/recents/reminders.png';
import './launcher.scss';

type LauncherMode = 'lock' | 'pin' | 'home' | 'shade' | 'recents';

type LauncherApp = {
	id: string;
	label: string;
	icon: string;
	preview: string;
	path: string;
};

type LaunchState = {
	app: LauncherApp;
	x: number;
	y: number;
	active: boolean;
	loading: boolean;
};

type LauncherLocationState = {
	skipHomeEntrance?: boolean;
};

const apps: LauncherApp[] = [
	{
		id: 'calls',
		label: 'Звонки',
		icon: phoneIcon,
		preview: callsPreview,
		path: '/app/Calls/main',
	},
	{
		id: 'contacts',
		label: 'Контакты',
		icon: contactsIcon,
		preview: contactsPreview,
		path: '/app/Contacts/main',
	},
	{
		id: 'reminders',
		label: 'Напоминания',
		icon: calendarIcon,
		preview: remindersPreview,
		path: '/app/Reminders/today',
	},
	{
		id: 'gallery',
		label: 'Галерея',
		icon: galleryIcon,
		preview: galleryPreview,
		path: '/app/Gallery/all',
	},
];

const recentApps: LauncherApp[] = [apps[0], apps[3], apps[2], apps[1]];

const quickControls = [
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

type QuickControlId = (typeof quickControls)[number]['id'];

const transitionDuration = 180;
let launcherUnlocked = false;

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
					data-launcher-app-id={app.id}
					onPointerUp={(event) => onLaunch(event, app)}
				>
					<span className="launcher-app__icon-wrap">
						<img className="launcher-app__icon" src={app.icon} alt="" />
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

type ShadeSliderProps = {
	value: number;
	onChange: (value: number) => void;
	label: string;
	startIcon: IconName;
	endIcon: IconName;
	className?: string;
};

type SliderIconMotion = 'entering-fill' | 'leaving-fill' | null;

function ShadeSlider({
	value,
	onChange,
	label,
	startIcon,
	endIcon,
	className = '',
}: ShadeSliderProps) {
	// The icons sit roughly at 9% and 91% of the control's width.
	// Their colour follows the actual layer beneath their centre point.
	const startIconIsOnFill = value >= 9;
	const endIconIsOnFill = value >= 91;
	const previousIconStates = useRef({ start: startIconIsOnFill, end: endIconIsOnFill });
	const [startIconMotion, setStartIconMotion] = useState<SliderIconMotion>(null);
	const [endIconMotion, setEndIconMotion] = useState<SliderIconMotion>(null);
	const style = { '--launcher-slider-value': `${value}%` } as CSSProperties;

	useLayoutEffect(() => {
		const previous = previousIconStates.current;
		if (previous.start !== startIconIsOnFill) {
			setStartIconMotion(startIconIsOnFill ? 'entering-fill' : 'leaving-fill');
		}
		if (previous.end !== endIconIsOnFill) {
			setEndIconMotion(endIconIsOnFill ? 'entering-fill' : 'leaving-fill');
		}
		previousIconStates.current = { start: startIconIsOnFill, end: endIconIsOnFill };
	}, [startIconIsOnFill, endIconIsOnFill]);

	return (
		<label className={`launcher-slider${className ? ` ${className}` : ''}`} style={style}>
			<span className="launcher-slider__fill" aria-hidden="true">
				<span className="launcher-slider__indicator" />
			</span>
			<span className={`launcher-slider__icon-shell launcher-slider__icon-shell--start${startIconIsOnFill ? ' is-on-fill' : ''}${startIconMotion ? ` is-${startIconMotion}` : ''}`} aria-hidden="true">
				<Icon className="launcher-slider__icon" name={startIcon} width={20} height={20} />
			</span>
			<input
				type="range"
				min="0"
				max="100"
				value={value}
				onChange={(event) => onChange(Number(event.target.value))}
				onPointerDown={(event) => event.stopPropagation()}
				onPointerMove={(event) => event.stopPropagation()}
				onPointerUp={(event) => event.stopPropagation()}
				onPointerCancel={(event) => event.stopPropagation()}
				onClick={(event) => event.stopPropagation()}
				aria-label={label}
			/>
			<span className={`launcher-slider__icon-shell launcher-slider__icon-shell--end${endIconIsOnFill ? ' is-on-fill' : ''}${endIconMotion ? ` is-${endIconMotion}` : ''}`} aria-hidden="true">
				<Icon className="launcher-slider__icon" name={endIcon} width={20} height={20} />
			</span>
		</label>
	);
}

type ShadeToggleMotion = 'cellular' | 'wifi' | 'airplane' | 'location' | 'bell' | 'flashlight';

type ShadeToggleButtonProps = {
	active: boolean;
	onToggle: () => void;
	label: string;
	onIcon: IconName;
	offIcon?: IconName;
	motion: ShadeToggleMotion;
	variant: 'network' | 'quick';
	detail?: string;
	accent?: string;
};

function ShadeToggleGlyph({ motion, icon, active }: { motion: ShadeToggleMotion; icon: IconName; active: boolean }) {
	if (motion === 'cellular') {
		return (
			<svg className="launcher-toggle-glyph launcher-toggle-glyph--cellular" viewBox="0 0 24 24" aria-hidden="true">
				<rect className="launcher-toggle-glyph__segment launcher-toggle-glyph__segment--1" x="3" y="16" width="3" height="4" rx="1.5" />
				<rect className="launcher-toggle-glyph__segment launcher-toggle-glyph__segment--2" x="8" y="12" width="3" height="8" rx="1.5" />
				<rect className="launcher-toggle-glyph__segment launcher-toggle-glyph__segment--3" x="13" y="8" width="3" height="12" rx="1.5" />
				<rect className="launcher-toggle-glyph__segment launcher-toggle-glyph__segment--4" x="18" y="4" width="3" height="16" rx="1.5" />
			</svg>
		);
	}

	if (motion === 'wifi') {
		return (
			<svg className="launcher-toggle-glyph launcher-toggle-glyph--wifi" viewBox="0 0 24 24" aria-hidden="true">
				<circle className="launcher-toggle-glyph__segment launcher-toggle-glyph__segment--1" cx="12" cy="18" r="2" />
				<path className="launcher-toggle-glyph__segment launcher-toggle-glyph__segment--2" d="M7.2 14.2C9.9 11.8 14.1 11.8 16.8 14.2" />
				<path className="launcher-toggle-glyph__segment launcher-toggle-glyph__segment--3" d="M3.6 10.2C8.3 6 15.7 6 20.4 10.2" />
				{active ? null : <path className="launcher-toggle-glyph__slash" d="M4 4L20 20" />}
			</svg>
		);
	}

	return <Icon name={icon} width={22} height={22} />;
}

function ShadeToggleButton({
	active,
	onToggle,
	label,
	onIcon,
	offIcon = onIcon,
	motion,
	variant,
	detail,
	accent,
}: ShadeToggleButtonProps) {
	const [motionId, setMotionId] = useState(0);
	const style = accent ? ({ '--launcher-toggle-accent': accent } as CSSProperties) : undefined;

	const handleClick = () => {
		setMotionId((value) => value + 1);
		onToggle();
	};

	return (
		<button
			className={`launcher-shade-toggle launcher-shade-toggle--${variant} launcher-shade-toggle--${motion} ${active ? 'is-active' : 'is-inactive'}`}
			type="button"
			aria-pressed={active}
			onClick={handleClick}
			style={style}
		>
			<span className="launcher-shade-toggle__icon" aria-hidden="true">
				<span
					key={motionId}
					className={`launcher-shade-toggle__motion${motionId > 0 ? ' is-animating' : ''}`}
				>
					<ShadeToggleGlyph motion={motion} icon={active ? onIcon : offIcon} active={active} />
					<span className="launcher-shade-toggle__pulse" />
				</span>
			</span>
			{variant === 'network' ? <strong>{label}</strong> : <small>{label}</small>}
			{variant === 'network' && detail ? <small>{detail}</small> : null}
		</button>
	);
}

type ControlShadeProps = {
	onClose: () => void;
	onSettings: () => void;
	className?: string;
	style?: CSSProperties;
	preview?: boolean;
};

function ControlShade({ onClose, onSettings, className = '', style, preview = false }: ControlShadeProps) {
	const [mobileEnabled, setMobileEnabled] = useState(true);
	const [wifiEnabled, setWifiEnabled] = useState(false);
	const [quickStates, setQuickStates] = useState<Record<QuickControlId, boolean>>({
		airplane: false,
		location: true,
		silent: true,
		flashlight: false,
	});
	const [volume, setVolume] = useState(100);
	const [brightness, setBrightness] = useState(46);

	const toggleQuickControl = (id: QuickControlId) => {
		setQuickStates((states) => ({ ...states, [id]: !states[id] }));
	};

	return (
		<div
			className={`launcher-shade${className ? ` ${className}` : ''}`}
			role={preview ? undefined : 'dialog'}
			aria-label={preview ? undefined : 'Панель быстрых настроек'}
			aria-hidden={preview || undefined}
			style={style}
		>
			<div className="launcher-shade__content">
				<ClockBlock />
				<div className="launcher-shade__networks">
					<ShadeToggleButton
						active={mobileEnabled}
						onToggle={() => setMobileEnabled((value) => !value)}
						label="Моб. интернет"
						detail={mobileEnabled ? 'Megafon LTE' : 'Выключено'}
						onIcon="signal-cellular-100"
						motion="cellular"
						variant="network"
					/>
					<ShadeToggleButton
						active={wifiEnabled}
						onToggle={() => setWifiEnabled((value) => !value)}
						label="Wi-Fi"
						detail={wifiEnabled ? 'KLCorp' : 'Выключено'}
						onIcon="wifi"
						offIcon="wifi-off"
						motion="wifi"
						variant="network"
					/>
				</div>
				<div className="launcher-shade__quick">
					{quickControls.map((control) => (
						<ShadeToggleButton
							key={control.id}
							active={quickStates[control.id]}
							onToggle={() => toggleQuickControl(control.id)}
							label={control.label}
							onIcon={control.onIcon}
							offIcon={control.offIcon}
							accent={control.accent}
							motion={control.motion}
							variant="quick"
						/>
					))}
				</div>
				<ShadeSlider
					value={volume}
					onChange={setVolume}
					label="Громкость"
					startIcon="volume-0"
					endIcon="volume-100"
				/>
				<ShadeSlider
					className="launcher-slider--brightness"
					value={brightness}
					onChange={setBrightness}
					label="Яркость"
					startIcon="brightness-low-outline"
					endIcon="brightness"
				/>
				<button className="launcher-shade__settings" type="button" onClick={onSettings}>Перейти в настройки</button>
			</div>
			<button className="launcher-shade__close" type="button" aria-label="Закрыть панель" onClick={onClose} />
		</div>
	);
}

type RecentDrag = {
	pointerId: number;
	appId: string;
	startX: number;
	startY: number;
	startScrollLeft: number;
	startedAt: number;
	axis: 'horizontal' | 'vertical' | null;
	offsetY: number;
};

type RecentAppsProps = {
	onOpen: (event: ReactPointerEvent<HTMLButtonElement>, app: LauncherApp) => void;
	onEmpty: () => void;
};

function RecentApps({ onOpen, onEmpty }: RecentAppsProps) {
	const [items, setItems] = useState(recentApps);
	const [activeId, setActiveId] = useState(recentApps[0]?.id ?? '');
	const [draggedCard, setDraggedCard] = useState<{ id: string; offsetY: number } | null>(null);
	const [closingIds, setClosingIds] = useState<Set<string>>(() => new Set());
	const [collapsingIds, setCollapsingIds] = useState<Set<string>>(() => new Set());
	const [isScrolling, setIsScrolling] = useState(false);
	const [isClosingAll, setIsClosingAll] = useState(false);
	const trackRef = useRef<HTMLDivElement>(null);
	const dragRef = useRef<RecentDrag | null>(null);
	const timersRef = useRef<number[]>([]);
	const scrollFrameRef = useRef<number | null>(null);
	const motionFrameRef = useRef<number | null>(null);

	useEffect(() => () => {
		timersRef.current.forEach(window.clearTimeout);
		if (scrollFrameRef.current !== null) cancelAnimationFrame(scrollFrameRef.current);
		if (motionFrameRef.current !== null) cancelAnimationFrame(motionFrameRef.current);
	}, []);

	const schedule = (callback: () => void, delay: number) => {
		const timer = window.setTimeout(callback, delay);
		timersRef.current.push(timer);
	};

	const updateCardPresentation = () => {
		const track = trackRef.current;
		if (!track) return;
		const trackCenter = track.scrollLeft + track.clientWidth / 2;
		let nearestId = '';
		let nearestDistance = Number.POSITIVE_INFINITY;

		track.querySelectorAll<HTMLElement>('[data-recent-id]').forEach((card) => {
			if (card.classList.contains('is-closing')) return;
			const signedDistance = card.offsetLeft + card.offsetWidth / 2 - trackCenter;
			const distance = Math.abs(signedDistance);
			const step = card.offsetWidth + 18;
			const progress = Math.min(1, distance / step);
			const scale = 1 - progress * .085;
			const opacity = 1 - progress * .3;
			const lift = progress * 8;
			const tilt = Math.max(-3.2, Math.min(3.2, signedDistance / step * -3.2));

			card.style.setProperty('--recent-scale', scale.toFixed(4));
			card.style.setProperty('--recent-opacity', opacity.toFixed(4));
			card.style.setProperty('--recent-lift', `${lift.toFixed(2)}px`);
			card.style.setProperty('--recent-tilt', `${tilt.toFixed(2)}deg`);
			if (distance < nearestDistance) {
				nearestDistance = distance;
				nearestId = card.dataset.recentId ?? '';
			}
		});

		if (nearestId) setActiveId(nearestId);
	};

	const animateCardPresentation = (duration: number) => {
		if (motionFrameRef.current !== null) cancelAnimationFrame(motionFrameRef.current);
		const startedAt = performance.now();
		const update = (now: number) => {
			updateCardPresentation();
			if (now - startedAt < duration) motionFrameRef.current = requestAnimationFrame(update);
			else motionFrameRef.current = null;
		};
		motionFrameRef.current = requestAnimationFrame(update);
	};

	useEffect(() => {
		const frame = requestAnimationFrame(updateCardPresentation);
		return () => cancelAnimationFrame(frame);
	}, [items.length]);

	const handleScroll = () => {
		if (scrollFrameRef.current !== null) cancelAnimationFrame(scrollFrameRef.current);
		scrollFrameRef.current = requestAnimationFrame(updateCardPresentation);
	};

	const snapToNearestCard = () => {
		const track = trackRef.current;
		if (!track) return;
		const trackCenter = track.scrollLeft + track.clientWidth / 2;
		const nearestCard = Array.from(track.querySelectorAll<HTMLElement>('[data-recent-id]'))
			.filter((card) => !card.classList.contains('is-closing'))
			.reduce<HTMLElement | null>((nearest, card) => {
				if (!nearest) return card;
				const cardDistance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - trackCenter);
				const nearestDistance = Math.abs(nearest.offsetLeft + nearest.offsetWidth / 2 - trackCenter);
				return cardDistance < nearestDistance ? card : nearest;
			}, null);

		if (nearestCard) {
			track.scrollTo({
				left: nearestCard.offsetLeft + nearestCard.offsetWidth / 2 - track.clientWidth / 2,
				behavior: 'smooth',
			});
		}
	};

	const dismissCard = (appId: string) => {
		if (closingIds.has(appId)) return;
		const removedIndex = items.findIndex((app) => app.id === appId);
		const promotedApp = items[removedIndex + 1] ?? items[removedIndex - 1];
		const hasRemainingApps = items.length > 1;
		setClosingIds((ids) => new Set(ids).add(appId));

		if (hasRemainingApps) {
			schedule(() => {
				setCollapsingIds((ids) => new Set(ids).add(appId));
				if (promotedApp) setActiveId(promotedApp.id);
				animateCardPresentation(380);
			}, 210);
		}

		schedule(() => {
			setItems((currentItems) => {
				const nextItems = currentItems.filter((app) => app.id !== appId);
				if (nextItems.length === 0) schedule(onEmpty, 0);
				return nextItems;
			});
			setClosingIds((ids) => {
				const nextIds = new Set(ids);
				nextIds.delete(appId);
				return nextIds;
			});
			setCollapsingIds((ids) => {
				const nextIds = new Set(ids);
				nextIds.delete(appId);
				return nextIds;
			});
			setDraggedCard(null);
			requestAnimationFrame(() => {
				updateCardPresentation();
				snapToNearestCard();
			});
		}, hasRemainingApps ? 540 : 280);
	};

	const handleCloseAll = () => {
		if (items.length === 0 || isClosingAll) return;
		setIsClosingAll(true);
		setClosingIds(new Set(items.map((app) => app.id)));
		schedule(onEmpty, 280 + items.length * 36);
	};

	const handleCardPointerDown = (event: ReactPointerEvent<HTMLButtonElement>, app: LauncherApp) => {
		if (closingIds.size > 0) return;
		event.currentTarget.setPointerCapture(event.pointerId);
		dragRef.current = {
			pointerId: event.pointerId,
			appId: app.id,
			startX: event.clientX,
			startY: event.clientY,
			startScrollLeft: trackRef.current?.scrollLeft ?? 0,
			startedAt: performance.now(),
			axis: null,
			offsetY: 0,
		};
		setDraggedCard({ id: app.id, offsetY: 0 });
	};

	const handleCardPointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
		const drag = dragRef.current;
		if (!drag || drag.pointerId !== event.pointerId) return;
		const deltaX = event.clientX - drag.startX;
		const deltaY = event.clientY - drag.startY;

		if (!drag.axis && Math.max(Math.abs(deltaX), Math.abs(deltaY)) > 7) {
			drag.axis = Math.abs(deltaX) > Math.abs(deltaY) ? 'horizontal' : 'vertical';
			setIsScrolling(drag.axis === 'horizontal');
		}

		if (drag.axis === 'horizontal') {
			event.preventDefault();
			if (trackRef.current) trackRef.current.scrollLeft = drag.startScrollLeft - deltaX;
			return;
		}

		if (drag.axis === 'vertical') {
			event.preventDefault();
			drag.offsetY = deltaY < 0 ? deltaY : Math.min(24, deltaY * .18);
			setDraggedCard({ id: drag.appId, offsetY: drag.offsetY });
		}
	};

	const finishCardGesture = (event: ReactPointerEvent<HTMLButtonElement>, app: LauncherApp, cancelled = false) => {
		const drag = dragRef.current;
		if (!drag || drag.pointerId !== event.pointerId) return;
		dragRef.current = null;
		if (event.currentTarget.hasPointerCapture(event.pointerId)) {
			event.currentTarget.releasePointerCapture(event.pointerId);
		}

		if (drag.axis === 'horizontal') {
			setIsScrolling(false);
			setDraggedCard(null);
			requestAnimationFrame(snapToNearestCard);
			return;
		}

		if (drag.axis === 'vertical') {
			const elapsed = Math.max(1, performance.now() - drag.startedAt);
			const isFastUpwardSwipe = drag.offsetY < -32 && drag.offsetY / elapsed < -.42;
			if (!cancelled && (drag.offsetY < -88 || isFastUpwardSwipe)) dismissCard(app.id);
			else setDraggedCard(null);
			return;
		}

		setDraggedCard(null);
		if (!cancelled) onOpen(event, app);
	};

	return (
		<div className={`launcher-recents${isClosingAll ? ' is-closing-all' : ''}`} role="dialog" aria-label="Открытые приложения">
			<button className="launcher-recents__close-all" type="button" onClick={handleCloseAll}>Закрыть все</button>
			<div
				ref={trackRef}
				className={`launcher-recents__track${isScrolling ? ' is-dragging' : ''}`}
				onScroll={handleScroll}
				role="list"
				aria-label="Открытые приложения"
			>
				{items.map((app, index) => {
					const isClosing = closingIds.has(app.id);
					const isCollapsing = collapsingIds.has(app.id);
					const offsetY = draggedCard?.id === app.id ? draggedCard.offsetY : 0;
					const style = {
						'--recent-drag-y': `${offsetY}px`,
						'--recent-index': index,
					} as CSSProperties;

					return (
						<div
							className={`launcher-recents__slide${activeId === app.id ? ' is-active' : ''}${draggedCard?.id === app.id ? ' is-being-dragged' : ''}${isClosing ? ' is-closing' : ''}${isCollapsing ? ' is-collapsing' : ''}`}
							data-recent-id={app.id}
							role="listitem"
							style={style}
							key={app.id}
						>
							<button
								className={`launcher-recent-card launcher-recent-card--${app.id}`}
								type="button"
								aria-label={`Открыть приложение «${app.label}». Смахните вверх, чтобы закрыть`}
								onPointerDown={(event) => handleCardPointerDown(event, app)}
								onPointerMove={handleCardPointerMove}
								onPointerUp={(event) => finishCardGesture(event, app)}
								onPointerCancel={(event) => finishCardGesture(event, app, true)}
							>
								<span className="launcher-recent-card__app-icon">
									<img src={app.icon} alt="" />
								</span>
								<span className="launcher-recent-card__preview">
									<img src={app.preview} alt={`Экран приложения «${app.label}»`} draggable="false" />
								</span>
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export function LauncherScreen() {
	const navigate = useNavigate();
	const location = useLocation();
	const skipHomeEntrance = Boolean((location.state as LauncherLocationState | null)?.skipHomeEntrance);
	const [mode, setMode] = useState<LauncherMode>(() => (launcherUnlocked ? 'home' : 'lock'));
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
			launcherUnlocked = true;
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
	const shadeGestureProgress = mode === 'shade'
		? Math.max(0, Math.min(1, 1 + dragOffset / 220))
		: shadePullProgress;
	const shadeGestureStyle = {
		'--shade-translate': `${(shadeGestureProgress - 1) * 100}%`,
		'--shade-surface-opacity': .42 + shadeGestureProgress * .58,
		'--shade-content-opacity': .16 + shadeGestureProgress * .84,
		'--shade-content-scale': .78 + shadeGestureProgress * .22,
	} as CSSProperties;

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
					<div className="launcher-unlock">
						<svg className="launcher-unlock__handle" viewBox="0 0 72 11" aria-hidden="true">
							<defs>
								<linearGradient id="launcher-unlock-stroke" x1="0" y1="0" x2="1" y2="0">
									<stop offset="0" stopColor="#fff" stopOpacity=".42" />
									<stop offset=".5" stopColor="#fff" stopOpacity=".86" />
									<stop offset="1" stopColor="#fff" stopOpacity=".42" />
								</linearGradient>
							</defs>
							<path d="M .75 10 C 11.5 .9 60.5 .9 71.25 10" stroke="url(#launcher-unlock-stroke)" />
						</svg>
						<span className="launcher-unlock__hint">Проведите вверх</span>
					</div>
				</div>
			) : null}

			{mode === 'pin' ? <PinPad entered={pinLength} onDigit={handleDigit} onCancel={() => { setPinLength(0); completeTransition('lock'); }} /> : null}

			{mode === 'home' || mode === 'shade' || mode === 'recents' ? (
				<div className={`launcher-home${mode !== 'home' ? ' is-background' : ''}${skipHomeEntrance ? ' is-settled' : ''}`} style={mode === 'home' ? lockStyle : undefined}>
					<HomeGrid onLaunch={startLaunch} />
				</div>
			) : null}

			{mode === 'shade' || (mode === 'home' && shadePullProgress > 0) ? (
				<ControlShade
					className={`launcher-shade--gesture${mode === 'home' ? ' launcher-shade--pull' : ''}${mode === 'shade' && dragOffset < 0 ? ' is-dragging' : ''}`}
					style={shadeGestureStyle}
					preview={mode === 'home'}
					onClose={() => setMode('home')}
					onSettings={() => navigate('/app/Components/navigation')}
				/>
			) : null}

			{mode === 'recents' ? (
				<RecentApps onOpen={startLaunch} onEmpty={() => setMode('home')} />
			) : null}

			<div className="launcher-blackout" aria-hidden="true" />

			{launch ? (
				<div className={`launcher-launch${launch.active ? ' is-active' : ''}${launch.loading ? ' is-loading' : ''}`} style={launchStyle}>
					<div className="launcher-launch__wash" />
					<img className="launcher-launch__icon" src={launch.app.icon} alt="" />
					<div className="launcher-launch__loader">
						<LoadingAppScreen icon={launch.app.icon} appName={launch.app.label} />
					</div>
				</div>
			) : null}
		</App>
	);
}
