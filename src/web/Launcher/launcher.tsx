import {
	useCallback,
	useEffect,
	useRef,
	useState,
	type CSSProperties,
	type MouseEvent as ReactMouseEvent,
	type PointerEvent as ReactPointerEvent,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { App } from '../../ui/App';
import { Icon } from '../../ui/Icon';
import { cn } from '../../ui/lib/cn';
import { ClockBlock, HomeGrid, LauncherStatus, PinPad } from './chrome';
import {
	homePages,
	getHomePageForApp,
	isLauncherUnlocked,
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
import {
	clamp,
	launcherGesture,
	launcherMotion,
	prefersReducedMotion,
	progress,
	resist,
} from './motion';
import { RecentApps } from './recents';
import { ControlShade } from './shade';
import { AppLaunchTransition, RecentAppTransition } from './transitions';
import { useManagedTimeouts } from './useManagedTimeouts';
import { runLauncherMinimizeTransition } from './viewTransition';
import './launcher.scss';

export function LauncherScreen() {
	const navigate = useNavigate();
	const location = useLocation();
	const locationState = location.state as LauncherLocationState | null;
	const skipHomeEntrance = Boolean(locationState?.skipHomeEntrance);
	const [mode, setMode] = useState<LauncherMode>(() => (isLauncherUnlocked() ? 'home' : 'lock'));
	const [pinLength, setPinLength] = useState(0);
	const [blackout, setBlackout] = useState(false);
	const [dragOffset, setDragOffset] = useState(0);
	const [homePage, setHomePage] = useState(() => getHomePageForApp(locationState?.focusAppId));
	const [homePageDrag, setHomePageDrag] = useState(0);
	const [isHomePageDragging, setIsHomePageDragging] = useState(false);
	const [isHomeSettled, setIsHomeSettled] = useState(skipHomeEntrance);
	const [launch, setLaunch] = useState<LaunchState | null>(null);
	const [recentTransition, setRecentTransition] = useState<RecentTransitionState | null>(null);
	const [activeApp, setActiveApp] = useState<LaunchableApp | null>(null);
	const [shadeOrigin, setShadeOrigin] = useState<ShadeOrigin>('home');
	const [isShadeClosing, setIsShadeClosing] = useState(false);
	const launchTokenRef = useRef(0);
	const dragRef = useRef<LauncherDrag | null>(null);
	const dragDeltaRef = useRef(0);
	const { schedule, clearAll: clearScheduledWork } = useManagedTimeouts();

	const resetGesture = useCallback(() => {
		dragRef.current = null;
		dragDeltaRef.current = 0;
		setDragOffset(0);
		setHomePageDrag(0);
		setIsHomePageDragging(false);
	}, []);

	const showHome = useCallback(() => {
		clearScheduledWork();
		launchTokenRef.current += 1;
		setLaunch(null);
		setRecentTransition(null);
		setActiveApp(null);
		setShadeOrigin('home');
		setIsShadeClosing(false);
		setHomePage(0);
		setIsHomeSettled(true);
		resetGesture();
		setMode('home');
	}, [clearScheduledWork, resetGesture]);

	useEffect(() => {
		const handleSystemHome = () => {
			const isClosingApp = Boolean(activeApp && (
				mode === 'app' || (mode === 'shade' && shadeOrigin === 'app')
			));

			if (!isClosingApp || !activeApp) {
				showHome();
				return;
			}

			runLauncherMinimizeTransition(activeApp.id, showHome);
		};

		window.addEventListener('launcher:home', handleSystemHome);
		return () => window.removeEventListener('launcher:home', handleSystemHome);
	}, [activeApp, mode, shadeOrigin, showHome]);

	const completeTransition = (nextMode: LauncherMode) => {
		setBlackout(true);
		schedule(() => {
			setMode(nextMode);
			setDragOffset(0);
			schedule(() => setBlackout(false), 30);
		}, launcherMotion.modeFade);
	};

	const closeShade = useCallback(() => {
		if (isShadeClosing) return;
		const nextMode = shadeOrigin === 'app' && activeApp ? 'app' : 'home';
		if (prefersReducedMotion()) {
			setMode(nextMode);
			resetGesture();
			return;
		}

		setIsShadeClosing(true);
		schedule(() => {
			setMode(nextMode);
			setIsShadeClosing(false);
			resetGesture();
		}, launcherMotion.shadeClose);
	}, [activeApp, isShadeClosing, resetGesture, schedule, shadeOrigin]);

	const handlePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
		if (
			!event.isPrimary
			|| event.button !== 0
			|| launch
			|| isShadeClosing
			|| (mode !== 'lock' && mode !== 'home' && mode !== 'app' && mode !== 'shade')
		) return;
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

		if (!drag.axis && Math.max(Math.abs(deltaX), Math.abs(deltaY)) > launcherGesture.axisLockDistance) {
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
			const resistedDelta = isPastFirstPage || isPastLastPage ? resist(deltaX) : deltaX;
			const limit = drag.viewportWidth * .72;
			setHomePageDrag(clamp(resistedDelta, -limit, limit));
			return;
		}

		if (drag.axis !== 'vertical') return;
		if (drag.mode === 'lock') setDragOffset(Math.min(0, deltaY));
		if (drag.mode === 'home' || drag.mode === 'app') setDragOffset(clamp(deltaY, -180, 260));
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
			const isFastSwipe = Math.abs(deltaX) > launcherGesture.pageVelocityDistance
				&& Math.abs(deltaX / elapsed) > launcherGesture.pageVelocity;
			const crossesThreshold = Math.abs(deltaX) > drag.viewportWidth * launcherGesture.pageDistanceRatio;
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

		if (drag.mode === 'lock' && deltaY < -launcherGesture.shadeCloseDistance) completeTransition('pin');
		else if ((drag.mode === 'home' || drag.mode === 'app') && deltaY > launcherGesture.shadeOpenDistance) {
			setShadeOrigin(drag.mode);
			setIsShadeClosing(false);
			setMode('shade');
			setDragOffset(0);
		}
		else if ((drag.mode === 'home' || drag.mode === 'app') && deltaY < -launcherGesture.recentsOpenDistance) {
			if (drag.mode === 'app' && activeApp) setRecentTransition({ app: activeApp });
			setMode('recents');
			setDragOffset(0);
		}
		else if (drag.mode === 'shade' && deltaY < -launcherGesture.shadeCloseDistance) closeShade();
		else setDragOffset(0);
		setHomePageDrag(0);
		setIsHomePageDragging(false);
		dragDeltaRef.current = 0;
	};

	const handleDigit = () => {
		if (pinLength >= 4) return;
		const nextLength = pinLength + 1;
		setPinLength(nextLength);
		if (nextLength === 4) {
			unlockLauncher();
			schedule(() => completeTransition('home'), 110);
		}
	};

	const startHomeLaunch = (
		event: ReactPointerEvent<HTMLButtonElement> | ReactMouseEvent<HTMLButtonElement>,
		app: LaunchableApp,
	) => {
		const activeDrag = dragRef.current;
		const pointerDistance = activeDrag
			? Math.hypot(event.clientX - activeDrag.startX, event.clientY - activeDrag.startY)
			: dragDeltaRef.current;
		if (pointerDistance > launcherGesture.tapSlop || launch) return;
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
		}, launcherMotion.homeLaunchReveal);
		schedule(() => {
			if (launchTokenRef.current !== launchToken) return;
			setActiveApp(app);
			setShadeOrigin('app');
			setMode('app');
			setDragOffset(0);
			setLaunch(null);
		}, launcherMotion.homeLaunchComplete);
	};

	const startRecentLaunch = (
		event: ReactPointerEvent<HTMLButtonElement> | ReactMouseEvent<HTMLButtonElement>,
		app: LaunchableApp,
	) => {
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
		}, launcherMotion.recentLaunch);
	};

	const handleRecentTransitionReady = (appId: string, bounds: RecentTransitionBounds) => {
		if (!recentTransition || recentTransition.app.id !== appId || recentTransition.target) return;
		setRecentTransition({ ...recentTransition, target: bounds });
		schedule(() => setRecentTransition(null), launcherMotion.recentTransition);
	};

	const lockStyle = { '--launcher-drag': `${dragOffset}px` } as CSSProperties;
	const shadePullProgress = mode === 'home' || mode === 'app' ? progress(dragOffset, 220) : 0;
	const shadeGestureProgress = mode === 'shade'
		? clamp(1 + dragOffset / 220, 0, 1)
		: shadePullProgress;
	const shadeGestureStyle = {
		'--shade-translate': `${(shadeGestureProgress - 1) * 100}%`,
		'--shade-surface-opacity': .58 + shadeGestureProgress * .42,
		'--shade-content-opacity': .35 + shadeGestureProgress * .65,
		'--shade-content-scale': .92 + shadeGestureProgress * .08,
	} as CSSProperties;

	return (
		<App
			className={cn('launcher-screen', `launcher-screen--${mode}`, blackout && 'is-blackout')}
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
				<div
					className={cn(
						'launcher-home',
						((mode !== 'home' && !(mode === 'shade' && isShadeClosing)) || shadeOrigin === 'app') && 'is-background',
						isHomeSettled && 'is-settled',
					)}
					style={mode === 'home' ? lockStyle : undefined}
				>
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
					className={cn('launcher-app-placeholder', mode === 'shade' && !isShadeClosing && 'is-background')}
					style={mode === 'app' ? lockStyle : undefined}
					aria-label={`Приложение «${activeApp.label}»`}
				>
					<img src={activeApp.preview} alt={`Экран приложения «${activeApp.label}»`} draggable="false" />
				</div>
			) : null}

			{mode === 'shade' || ((mode === 'home' || mode === 'app') && shadePullProgress > 0) ? (
				<ControlShade
					className={cn(
						'launcher-shade--gesture',
						mode !== 'shade' && 'launcher-shade--pull',
						mode === 'shade' && dragOffset < 0 && 'is-dragging',
						isShadeClosing && 'is-closing',
					)}
					style={shadeGestureStyle}
					preview={mode !== 'shade'}
					onClose={closeShade}
					onSettings={() => navigate('/app/Components/navigation')}
				/>
			) : null}

			{mode === 'recents' ? (
				<RecentApps
					onOpen={startRecentLaunch}
					onEmpty={() => {
						setRecentTransition(null);
						setActiveApp(null);
						setShadeOrigin('home');
						setMode('home');
					}}
					initialActiveId={activeApp?.id}
					transitioningAppId={recentTransition?.app.id}
					onTransitionReady={handleRecentTransitionReady}
				/>
			) : null}

			<div className="launcher-blackout" aria-hidden="true" />

			{launch ? <AppLaunchTransition launch={launch} /> : null}
			{recentTransition ? <RecentAppTransition transition={recentTransition} /> : null}
		</App>
	);
}
