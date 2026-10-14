import {
	CSSProperties,
	PointerEvent as ReactPointerEvent,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { App } from '../../ui/App';
import { Icon } from '../../ui/Icon';
import { LoadingAppScreen } from '../LoadingApp/LoadingScreen';
import { ClockBlock, HomeGrid, LauncherStatus, PinPad } from './chrome';
import {
	homePages,
	isLauncherUnlocked,
	TRANSITION_DURATION_MS,
	unlockLauncher,
	type LaunchableApp,
	type LauncherDrag,
	type LauncherLocationState,
	type LauncherMode,
	type LaunchState,
	type RecentTransitionBounds,
	type RecentTransitionState,
	type ShadeOrigin,
} from './model';
import { RecentApps } from './recents';
import { ControlShade } from './shade';
import './launcher.scss';

export function LauncherScreen() {
	const navigate = useNavigate();
	const location = useLocation();
	const skipHomeEntrance = Boolean((location.state as LauncherLocationState | null)?.skipHomeEntrance);
	const [mode, setMode] = useState<LauncherMode>(() => (isLauncherUnlocked() ? 'home' : 'lock'));
	const [pinLength, setPinLength] = useState(0);
	const [blackout, setBlackout] = useState(false);
	const [dragOffset, setDragOffset] = useState(0);
	const [homePage, setHomePage] = useState(0);
	const [homePageDrag, setHomePageDrag] = useState(0);
	const [isHomePageDragging, setIsHomePageDragging] = useState(false);
	const [launch, setLaunch] = useState<LaunchState | null>(null);
	const [recentTransition, setRecentTransition] = useState<RecentTransitionState | null>(null);
	const [activeApp, setActiveApp] = useState<LaunchableApp | null>(null);
	const [shadeOrigin, setShadeOrigin] = useState<ShadeOrigin>('home');
	const timersRef = useRef<number[]>([]);
	const launchTokenRef = useRef(0);
	const dragRef = useRef<LauncherDrag | null>(null);
	const dragDeltaRef = useRef(0);

	const schedule = (callback: () => void, delay: number) => {
		const timer = window.setTimeout(callback, delay);
		timersRef.current.push(timer);
	};

	useEffect(() => () => timersRef.current.forEach(window.clearTimeout), []);

	useEffect(() => {
		const handleSystemHome = () => {
			launchTokenRef.current += 1;
			setLaunch(null);
			setRecentTransition(null);
			setActiveApp(null);
			setShadeOrigin('home');
			setDragOffset(0);
			setHomePage(0);
			setHomePageDrag(0);
			setIsHomePageDragging(false);
			setMode('home');
		};

		window.addEventListener('launcher:home', handleSystemHome);
		return () => window.removeEventListener('launcher:home', handleSystemHome);
	}, []);

	const completeTransition = (nextMode: LauncherMode) => {
		setBlackout(true);
		schedule(() => {
			setMode(nextMode);
			setDragOffset(0);
			schedule(() => setBlackout(false), 30);
		}, TRANSITION_DURATION_MS);
	};

	const handlePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
		if (launch || (mode !== 'lock' && mode !== 'home' && mode !== 'app' && mode !== 'shade')) return;
		dragRef.current = {
			pointerId: event.pointerId,
			startX: event.clientX,
			startY: event.clientY,
			startedAt: performance.now(),
			viewportWidth: event.currentTarget.clientWidth,
			mode,
			homePage,
			axis: null,
		};
		dragDeltaRef.current = 0;
	};

	const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
		const drag = dragRef.current;
		if (!drag || drag.pointerId !== event.pointerId) return;
		const deltaX = event.clientX - drag.startX;
		const deltaY = event.clientY - drag.startY;
		dragDeltaRef.current = Math.max(dragDeltaRef.current, Math.hypot(deltaX, deltaY));

		if (!drag.axis && Math.max(Math.abs(deltaX), Math.abs(deltaY)) > 7) {
			drag.axis = drag.mode === 'home' && Math.abs(deltaX) > Math.abs(deltaY)
				? 'horizontal'
				: 'vertical';
			event.currentTarget.setPointerCapture(event.pointerId);
			if (drag.axis === 'horizontal') setIsHomePageDragging(true);
		}

		if (drag.axis === 'horizontal') {
			event.preventDefault();
			const isPastFirstPage = drag.homePage === 0 && deltaX > 0;
			const isPastLastPage = drag.homePage === homePages.length - 1 && deltaX < 0;
			const resistedDelta = isPastFirstPage || isPastLastPage ? deltaX * .24 : deltaX;
			const limit = drag.viewportWidth * .72;
			setHomePageDrag(Math.max(-limit, Math.min(limit, resistedDelta)));
			return;
		}

		if (drag.axis !== 'vertical') return;
		if (drag.mode === 'lock') setDragOffset(Math.min(0, deltaY));
		if (drag.mode === 'home' || drag.mode === 'app') setDragOffset(Math.max(-180, Math.min(260, deltaY)));
		if (drag.mode === 'shade') setDragOffset(Math.min(0, deltaY));
	};

	const handlePointerUp = (event: ReactPointerEvent<HTMLElement>, cancelled = false) => {
		const drag = dragRef.current;
		if (!drag || drag.pointerId !== event.pointerId) return;
		const deltaX = event.clientX - drag.startX;
		const deltaY = event.clientY - drag.startY;
		dragRef.current = null;
		if (event.currentTarget.hasPointerCapture(event.pointerId)) {
			event.currentTarget.releasePointerCapture(event.pointerId);
		}

		if (drag.axis === 'horizontal') {
			const elapsed = Math.max(1, performance.now() - drag.startedAt);
			const isFastSwipe = Math.abs(deltaX) > 24 && Math.abs(deltaX / elapsed) > .38;
			const crossesThreshold = Math.abs(deltaX) > drag.viewportWidth * .18;
			if (!cancelled && (isFastSwipe || crossesThreshold)) {
				if (deltaX < 0) setHomePage(Math.min(homePages.length - 1, drag.homePage + 1));
				if (deltaX > 0) setHomePage(Math.max(0, drag.homePage - 1));
			}
			setHomePageDrag(0);
			setIsHomePageDragging(false);
			setDragOffset(0);
			dragDeltaRef.current = 0;
			return;
		}
		if (cancelled) {
			setDragOffset(0);
			setHomePageDrag(0);
			setIsHomePageDragging(false);
			dragDeltaRef.current = 0;
			return;
		}

		if (drag.mode === 'lock' && deltaY < -64) completeTransition('pin');
		else if ((drag.mode === 'home' || drag.mode === 'app') && deltaY > 72) {
			setShadeOrigin(drag.mode);
			setMode('shade');
			setDragOffset(0);
		}
		else if ((drag.mode === 'home' || drag.mode === 'app') && deltaY < -72) {
			if (drag.mode === 'app' && activeApp) setRecentTransition({ app: activeApp });
			setMode('recents');
			setDragOffset(0);
		}
		else if (drag.mode === 'shade' && deltaY < -64) { setMode(shadeOrigin === 'app' && activeApp ? 'app' : 'home'); setDragOffset(0); }
		else setDragOffset(0);
		setHomePageDrag(0);
		setIsHomePageDragging(false);
		dragDeltaRef.current = 0;
	};

	const handleDigit = () => {
		const nextLength = pinLength + 1;
		setPinLength(nextLength);
		if (nextLength === 4) {
			unlockLauncher();
			schedule(() => completeTransition('home'), 110);
		}
	};

	const startHomeLaunch = (event: ReactPointerEvent<HTMLButtonElement>, app: LaunchableApp) => {
		const activeDrag = dragRef.current;
		const pointerDistance = activeDrag
			? Math.hypot(event.clientX - activeDrag.startX, event.clientY - activeDrag.startY)
			: dragDeltaRef.current;
		if (pointerDistance > 6 || launch) return;
		const launchToken = ++launchTokenRef.current;
		const surfaceRect = event.currentTarget.closest('.launcher-screen')?.getBoundingClientRect();
		const targetRect = event.currentTarget.getBoundingClientRect();
		const x = targetRect.left + targetRect.width / 2 - (surfaceRect?.left ?? 0);
		const y = targetRect.top + Math.min(34, targetRect.height / 2) - (surfaceRect?.top ?? 0);
		setLaunch({ kind: 'home', app, x, y, active: false, loading: false });
		requestAnimationFrame(() => requestAnimationFrame(() => setLaunch((value) => value ? { ...value, active: true } : value)));
		schedule(() => {
			if (launchTokenRef.current !== launchToken) return;
			setLaunch((value) => value?.kind === 'home' ? { ...value, loading: true } : value);
		}, 330);
		schedule(() => {
			if (launchTokenRef.current !== launchToken) return;
			setActiveApp(app);
			setShadeOrigin('app');
			setMode('app');
			setDragOffset(0);
			setLaunch(null);
		}, 1020);
	};

	const startRecentLaunch = (event: ReactPointerEvent<HTMLButtonElement>, app: LaunchableApp) => {
		if (launch) return;
		const preview = event.currentTarget.querySelector<HTMLElement>('.launcher-recent-card__preview');
		const surfaceRect = event.currentTarget.closest('.launcher-screen')?.getBoundingClientRect();
		if (!preview || !surfaceRect) return;

		const launchToken = ++launchTokenRef.current;
		const previewRect = preview.getBoundingClientRect();
		setLaunch({
			kind: 'recents',
			app,
			left: previewRect.left - surfaceRect.left,
			top: previewRect.top - surfaceRect.top,
			width: previewRect.width,
			height: previewRect.height,
			active: false,
		});
		requestAnimationFrame(() => requestAnimationFrame(() => {
			setLaunch((value) => value?.kind === 'recents' ? { ...value, active: true } : value);
		}));
		schedule(() => {
			if (launchTokenRef.current !== launchToken) return;
			setActiveApp(app);
			setShadeOrigin('app');
			setMode('app');
			setDragOffset(0);
			setLaunch(null);
		}, 440);
	};

	const handleRecentTransitionReady = (appId: string, bounds: RecentTransitionBounds) => {
		if (!recentTransition || recentTransition.app.id !== appId || recentTransition.target) return;
		setRecentTransition({ ...recentTransition, target: bounds });
		schedule(() => setRecentTransition(null), 440);
	};

	const launchStyle = useMemo(() => {
		if (!launch) return undefined;
		if (launch.kind === 'home') {
			return { '--launch-x': `${launch.x}px`, '--launch-y': `${launch.y}px` } as CSSProperties;
		}
		return {
			'--launch-left': `${launch.left}px`,
			'--launch-top': `${launch.top}px`,
			'--launch-width': `${launch.width}px`,
			'--launch-height': `${launch.height}px`,
		} as CSSProperties;
	}, [launch]);
	const recentTransitionStyle = useMemo(() => recentTransition?.target ? ({
		'--recent-transition-left': `${recentTransition.target.left}px`,
		'--recent-transition-top': `${recentTransition.target.top}px`,
		'--recent-transition-width': `${recentTransition.target.width}px`,
		'--recent-transition-height': `${recentTransition.target.height}px`,
	} as CSSProperties) : undefined, [recentTransition]);
	const lockStyle = { '--launcher-drag': `${dragOffset}px` } as CSSProperties;
	const shadePullProgress = mode === 'home' || mode === 'app' ? Math.max(0, Math.min(1, dragOffset / 220)) : 0;
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
			onPointerCancel={(event) => handlePointerUp(event, true)}
		>
			<LauncherStatus dark={mode === 'app' && activeApp?.statusBar === 'dark'} />
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
				<div className={`launcher-home${mode !== 'home' || shadeOrigin === 'app' ? ' is-background' : ''}${skipHomeEntrance ? ' is-settled' : ''}`} style={mode === 'home' ? lockStyle : undefined}>
					<HomeGrid
						activePage={homePage}
						dragOffset={homePageDrag}
						isDragging={isHomePageDragging}
						onLaunch={startHomeLaunch}
						onPageChange={(page) => {
							setHomePage(page);
							setHomePageDrag(0);
						}}
					/>
				</div>
			) : null}

			{activeApp && (mode === 'app' || (mode === 'shade' && shadeOrigin === 'app')) ? (
				<div
					className={`launcher-app-placeholder${mode === 'shade' ? ' is-background' : ''}`}
					style={mode === 'app' ? lockStyle : undefined}
					aria-label={`Приложение «${activeApp.label}»`}
				>
					<img src={activeApp.preview} alt={`Экран приложения «${activeApp.label}»`} draggable="false" />
				</div>
			) : null}

			{mode === 'shade' || ((mode === 'home' || mode === 'app') && shadePullProgress > 0) ? (
				<ControlShade
					className={`launcher-shade--gesture${mode !== 'shade' ? ' launcher-shade--pull' : ''}${mode === 'shade' && dragOffset < 0 ? ' is-dragging' : ''}`}
					style={shadeGestureStyle}
					preview={mode !== 'shade'}
					onClose={() => setMode(shadeOrigin === 'app' && activeApp ? 'app' : 'home')}
					onSettings={() => navigate('/app/Components/navigation')}
				/>
			) : null}

			{mode === 'recents' ? (
				<RecentApps
					onOpen={startRecentLaunch}
					onEmpty={() => { setRecentTransition(null); setActiveApp(null); setMode('home'); }}
					initialActiveId={activeApp?.id}
					transitioningAppId={recentTransition?.app.id}
					onTransitionReady={handleRecentTransitionReady}
				/>
			) : null}

			<div className="launcher-blackout" aria-hidden="true" />

			{launch ? (
				<div
					className={`launcher-launch launcher-launch--${launch.kind}${launch.active ? ' is-active' : ''}${launch.kind === 'home' && launch.loading ? ' is-loading' : ''}`}
					style={launchStyle}
				>
					{launch.kind === 'home' ? (
						<>
							<div className="launcher-launch__wash" />
							<img className="launcher-launch__icon" src={launch.app.icon} alt="" />
							<div className="launcher-launch__loader">
								<LoadingAppScreen icon={launch.app.icon} appName={launch.app.label} />
							</div>
						</>
					) : (
						<div className="launcher-launch__preview">
							<img src={launch.app.preview} alt="" draggable="false" />
						</div>
					)}
				</div>
			) : null}

			{recentTransition ? (
				<div
					className={`launcher-recent-transition${recentTransition.target ? ' is-active' : ''}`}
					style={recentTransitionStyle}
					aria-hidden="true"
				>
					<img src={recentTransition.app.preview} alt="" draggable="false" />
				</div>
			) : null}
		</App>
	);
}
