import {
	CSSProperties,
	PointerEvent as ReactPointerEvent,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { flushSync } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { App } from '../../ui/App';
import { Icon } from '../../ui/Icon';
import wallpaperImage from '../../assets/launcher/wallpaper.png';
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

const HOME_PAGE_SPRING_STIFFNESS = 290;
const HOME_PAGE_SPRING_DAMPING = 27;
const LOCK_SWIPE_SPRING_STIFFNESS = 310;
const LOCK_SWIPE_SPRING_DAMPING = 30;
const OVERLAY_SPRING_STIFFNESS = 430;
const OVERLAY_SPRING_DAMPING = 35;
// Unit-mass equivalent of an iOS-style spring with a 0.5 s response and
// 0.86 damping ratio. Keep opening responsive, but let the shade fold away
// with the softer deceleration used by Control Center.
const SHADE_CLOSE_SPRING_STIFFNESS = 158;
const SHADE_CLOSE_SPRING_DAMPING = 21.6;

type OverlayKind = 'shade' | 'recents';
type OverlayMotion = {
	kind: OverlayKind;
	origin: ShadeOrigin;
	progress: number;
	phase: 'dragging' | 'settling';
	target?: 0 | 1;
};

function clamp(value: number, min: number, max: number) {
	return Math.min(max, Math.max(min, value));
}

function rubberBand(distance: number, dimension: number) {
	const safeDimension = Math.max(1, dimension);
	return (safeDimension * .55 * distance) / (safeDimension + .55 * distance);
}

function gestureProgress(distance: number, extent: number) {
	const safeExtent = Math.max(1, extent);
	if (distance <= safeExtent) return Math.max(0, distance / safeExtent);
	return 1 + rubberBand(distance - safeExtent, safeExtent) / safeExtent * .14;
}

function smoothStep(value: number) {
	const boundedValue = clamp(value, 0, 1);
	return boundedValue * boundedValue * (3 - 2 * boundedValue);
}

function lockDismissDistance(viewportHeight: number) {
	return clamp(viewportHeight * .52, 240, 420);
}

type ViewTransitionDocument = Document & {
	startViewTransition?: (update: () => void) => {
		finished: Promise<void>;
	};
};

export function LauncherScreen() {
	const navigate = useNavigate();
	const location = useLocation();
	const skipHomeEntrance = Boolean((location.state as LauncherLocationState | null)?.skipHomeEntrance);
	const [mode, setMode] = useState<LauncherMode>(() => (isLauncherUnlocked() ? 'home' : 'lock'));
	const [pinLength, setPinLength] = useState(0);
	const [blackout, setBlackout] = useState(false);
	const [dragOffset, setDragOffsetState] = useState(0);
	const [lockSwipeExtent, setLockSwipeExtent] = useState(800);
	const [isLockSettling, setIsLockSettling] = useState(false);
	const [homePage, setHomePage] = useState(0);
	const [homePageDrag, setHomePageDrag] = useState(0);
	const [homePageWidth, setHomePageWidth] = useState(360);
	const [isHomePageDragging, setIsHomePageDragging] = useState(false);
	const [isHomePageSettling, setIsHomePageSettling] = useState(false);
	const [launch, setLaunch] = useState<LaunchState | null>(null);
	const [recentTransition, setRecentTransition] = useState<RecentTransitionState | null>(null);
	const [activeApp, setActiveApp] = useState<LaunchableApp | null>(null);
	const [shadeOrigin, setShadeOrigin] = useState<ShadeOrigin>('home');
	const [recentsOrigin, setRecentsOrigin] = useState<ShadeOrigin>('home');
	const [overlayMotion, setOverlayMotion] = useState<OverlayMotion | null>(null);
	const timersRef = useRef<number[]>([]);
	const launchTokenRef = useRef(0);
	const dragRef = useRef<LauncherDrag | null>(null);
	const dragDeltaRef = useRef(0);
	const dragOffsetRef = useRef(0);
	const lockAnimationRef = useRef<number | null>(null);
	const lockAnimationTokenRef = useRef(0);
	const homePageDragRef = useRef(0);
	const homePageAnimationRef = useRef<number | null>(null);
	const overlayAnimationRef = useRef<number | null>(null);
	const overlayAnimationTokenRef = useRef(0);
	const overlayProgressRef = useRef(0);
	const overlayMotionRef = useRef<OverlayMotion | null>(null);
	const recentTransitionRef = useRef<RecentTransitionState | null>(null);
	const modeRef = useRef(mode);
	const activeAppRef = useRef(activeApp);
	modeRef.current = mode;
	activeAppRef.current = activeApp;
	recentTransitionRef.current = recentTransition;

	const schedule = (callback: () => void, delay: number) => {
		const timer = window.setTimeout(callback, delay);
		timersRef.current.push(timer);
	};

	useEffect(() => () => {
		timersRef.current.forEach(window.clearTimeout);
		if (lockAnimationRef.current !== null) cancelAnimationFrame(lockAnimationRef.current);
		if (homePageAnimationRef.current !== null) cancelAnimationFrame(homePageAnimationRef.current);
		if (overlayAnimationRef.current !== null) cancelAnimationFrame(overlayAnimationRef.current);
	}, []);

	const updateDragOffset = (offset: number) => {
		dragOffsetRef.current = offset;
		setDragOffsetState(offset);
	};

	const cancelLockAnimation = () => {
		lockAnimationTokenRef.current += 1;
		if (lockAnimationRef.current !== null) {
			cancelAnimationFrame(lockAnimationRef.current);
			lockAnimationRef.current = null;
		}
		setIsLockSettling(false);
	};

	const settleLockScreen = (
		target: 'lock' | 'pin',
		releaseVelocity = 0,
		extent = lockSwipeExtent,
	) => {
		cancelLockAnimation();
		const token = lockAnimationTokenRef.current;
		const targetOffset = target === 'pin' ? -lockDismissDistance(extent) : 0;

		const finish = () => {
			lockAnimationRef.current = null;
			setIsLockSettling(false);
			if (target === 'pin') setMode('pin');
			updateDragOffset(0);
		};

		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			finish();
			return;
		}

		let position = dragOffsetRef.current;
		let velocity = clamp(releaseVelocity * 1000, -2800, 1200);
		let previousTime = performance.now();
		const startedAt = previousTime;
		setIsLockSettling(true);

		const animate = (time: number) => {
			if (token !== lockAnimationTokenRef.current) return;
			const deltaTime = clamp((time - previousTime) / 1000, 1 / 240, 1 / 30);
			previousTime = time;
			const acceleration = -LOCK_SWIPE_SPRING_STIFFNESS * (position - targetOffset)
				- LOCK_SWIPE_SPRING_DAMPING * velocity;
			velocity += acceleration * deltaTime;
			position += velocity * deltaTime;
			position = clamp(position, targetOffset - 28, 10);
			updateDragOffset(position);

			const isAtRest = Math.abs(position - targetOffset) < .45 && Math.abs(velocity) < 9;
			if (isAtRest || time - startedAt > 760) {
				finish();
				return;
			}
			lockAnimationRef.current = requestAnimationFrame(animate);
		};

		lockAnimationRef.current = requestAnimationFrame(animate);
	};

	const setOverlayProgress = (motion: Omit<OverlayMotion, 'progress'>, progress: number) => {
		overlayProgressRef.current = progress;
		const nextMotion = { ...motion, progress };
		overlayMotionRef.current = nextMotion;
		setOverlayMotion(nextMotion);
	};

	const clearOverlayMotion = () => {
		overlayMotionRef.current = null;
		setOverlayMotion(null);
	};

	const cancelOverlayAnimation = () => {
		overlayAnimationTokenRef.current += 1;
		if (overlayAnimationRef.current !== null) {
			cancelAnimationFrame(overlayAnimationRef.current);
			overlayAnimationRef.current = null;
		}
	};

	const settleOverlay = (
		kind: OverlayKind,
		origin: ShadeOrigin,
		target: 0 | 1,
		releaseVelocity = 0,
		onComplete?: () => void,
	) => {
		cancelOverlayAnimation();
		const token = overlayAnimationTokenRef.current;
		const motion = { kind, origin, phase: 'settling' as const, target };

		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			setOverlayProgress(motion, target);
			clearOverlayMotion();
			onComplete?.();
			return;
		}

		let position = overlayProgressRef.current;
		let velocity = clamp(releaseVelocity, -4.8, 4.8);
		let previousTime = performance.now();
		const startedAt = previousTime;
		const isShadeClosing = kind === 'shade' && target === 0;
		const springStiffness = isShadeClosing
			? SHADE_CLOSE_SPRING_STIFFNESS
			: OVERLAY_SPRING_STIFFNESS;
		const springDamping = isShadeClosing
			? SHADE_CLOSE_SPRING_DAMPING
			: OVERLAY_SPRING_DAMPING;
		const maximumDuration = isShadeClosing ? 1000 : 820;
		setOverlayProgress(motion, position);

		const animate = (time: number) => {
			if (token !== overlayAnimationTokenRef.current) return;
			const deltaTime = clamp((time - previousTime) / 1000, 1 / 240, 1 / 30);
			previousTime = time;
			const acceleration = -springStiffness * (position - target)
				- springDamping * velocity;
			velocity += acceleration * deltaTime;
			position += velocity * deltaTime;
			position = clamp(position, -.055, 1.065);
			setOverlayProgress(motion, position);

			const isAtRest = Math.abs(position - target) < .0025 && Math.abs(velocity) < .025;
			if (isAtRest || time - startedAt > maximumDuration) {
				overlayAnimationRef.current = null;
				overlayProgressRef.current = target;
				clearOverlayMotion();
				onComplete?.();
				return;
			}
			overlayAnimationRef.current = requestAnimationFrame(animate);
		};

		overlayAnimationRef.current = requestAnimationFrame(animate);
	};

	const closeOverlay = (
		kind: OverlayKind,
		origin: ShadeOrigin,
		releaseVelocity = 0,
		destination: ShadeOrigin = origin,
		onComplete?: () => void,
	) => {
		if (!overlayMotionRef.current || overlayMotionRef.current.kind !== kind) overlayProgressRef.current = 1;
		setOverlayProgress({ kind, origin, phase: 'settling' }, overlayProgressRef.current);
		settleOverlay(kind, origin, 0, releaseVelocity, () => {
			setMode(destination === 'app' && activeAppRef.current ? 'app' : 'home');
			onComplete?.();
		});
	};

	const updateHomePageDrag = (offset: number) => {
		homePageDragRef.current = offset;
		setHomePageDrag(offset);
	};

	const cancelHomePageAnimation = () => {
		if (homePageAnimationRef.current !== null) {
			cancelAnimationFrame(homePageAnimationRef.current);
			homePageAnimationRef.current = null;
		}
		setIsHomePageSettling(false);
	};

	const settleHomePage = (targetPage: number, releaseVelocity = 0, pageWidth = homePageWidth) => {
		cancelHomePageAnimation();
		const boundedTarget = clamp(targetPage, 0, homePages.length - 1);
		const targetOffset = (homePage - boundedTarget) * pageWidth;

		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			setHomePage(boundedTarget);
			updateHomePageDrag(0);
			return;
		}

		let position = homePageDragRef.current;
		let velocity = clamp(releaseVelocity * 1000, -1600, 1600);
		let previousTime = performance.now();
		const startedAt = previousTime;
		setIsHomePageDragging(false);
		setIsHomePageSettling(true);

		const animate = (time: number) => {
			const deltaTime = clamp((time - previousTime) / 1000, 1 / 240, 1 / 30);
			previousTime = time;
			const acceleration = -HOME_PAGE_SPRING_STIFFNESS * (position - targetOffset)
				- HOME_PAGE_SPRING_DAMPING * velocity;
			velocity += acceleration * deltaTime;
			position += velocity * deltaTime;
			updateHomePageDrag(position);

			const isAtRest = Math.abs(position - targetOffset) < .35 && Math.abs(velocity) < 8;
			if (isAtRest || time - startedAt > 760) {
				homePageAnimationRef.current = null;
				setHomePage(boundedTarget);
				updateHomePageDrag(0);
				setIsHomePageSettling(false);
				return;
			}

			homePageAnimationRef.current = requestAnimationFrame(animate);
		};

		homePageAnimationRef.current = requestAnimationFrame(animate);
	};

	useEffect(() => {
		const handleSystemHome = () => {
			launchTokenRef.current += 1;
			if (modeRef.current === 'shade' || modeRef.current === 'recents') {
				cancelHomePageAnimation();
				setLaunch(null);
				setRecentTransition(null);
				const kind = modeRef.current;
				setActiveApp(null);
				setShadeOrigin('home');
				setRecentsOrigin('home');
				closeOverlay(kind, 'home', -1.35, 'home');
				updateDragOffset(0);
				setHomePage(0);
				updateHomePageDrag(0);
				setIsHomePageDragging(false);
				return;
			}

			const resetToHome = () => {
				cancelHomePageAnimation();
				cancelOverlayAnimation();
				clearOverlayMotion();
				setLaunch(null);
				setRecentTransition(null);
				setActiveApp(null);
				setShadeOrigin('home');
				setRecentsOrigin('home');
				updateDragOffset(0);
				setHomePage(0);
				updateHomePageDrag(0);
				setIsHomePageDragging(false);
				setMode('home');
			};

			const activeApp = activeAppRef.current;
			const transitionDocument = document as ViewTransitionDocument;
			const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
			if (modeRef.current !== 'app' || !activeApp || !transitionDocument.startViewTransition || reduceMotion) {
				resetToHome();
				return;
			}

			document.documentElement.dataset.launcherMinimize = activeApp.id;
			const clearTransitionState = () => {
				delete document.documentElement.dataset.launcherMinimize;
			};

			try {
				const transition = transitionDocument.startViewTransition(() => {
					flushSync(resetToHome);
				});
				void transition.finished.then(clearTransitionState, clearTransitionState);
			} catch {
				clearTransitionState();
				resetToHome();
			}
		};

		window.addEventListener('launcher:home', handleSystemHome);
		return () => window.removeEventListener('launcher:home', handleSystemHome);
	}, []);

	const completeTransition = (nextMode: LauncherMode) => {
		setBlackout(true);
		schedule(() => {
			setMode(nextMode);
			updateDragOffset(0);
			schedule(() => setBlackout(false), 30);
		}, TRANSITION_DURATION_MS);
	};

	const handlePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
		if (launch || (mode !== 'lock' && mode !== 'home' && mode !== 'app' && mode !== 'shade')) return;
		if (mode === 'home') cancelHomePageAnimation();
		if (mode === 'lock') {
			cancelLockAnimation();
			setLockSwipeExtent(event.currentTarget.clientHeight);
		}
		const currentOverlay = overlayMotionRef.current;
		cancelOverlayAnimation();
		const now = performance.now();
		dragRef.current = {
			pointerId: event.pointerId,
			startX: event.clientX,
			startY: event.clientY,
			viewportWidth: event.currentTarget.clientWidth,
			viewportHeight: event.currentTarget.clientHeight,
			mode,
			homePage,
			homePageOffset: mode === 'home' ? homePageDragRef.current : 0,
			lockOffset: mode === 'lock' ? dragOffsetRef.current : 0,
			overlayStartProgress: currentOverlay ? overlayProgressRef.current : 0,
			overlayKind: currentOverlay?.kind ?? null,
			overlayTarget: currentOverlay?.target ?? null,
			overlayOrigin: currentOverlay?.origin ?? null,
			lastX: event.clientX,
			lastY: event.clientY,
			lastSampleAt: now,
			velocityX: 0,
			velocityY: 0,
			axis: null,
			verticalIntent: null,
		};
		if (mode === 'home' && event.currentTarget.clientWidth > 0) {
			setHomePageWidth(event.currentTarget.clientWidth);
		}
		dragDeltaRef.current = 0;
	};

	const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
		const drag = dragRef.current;
		if (!drag || drag.pointerId !== event.pointerId) return;
		const deltaX = event.clientX - drag.startX;
		const deltaY = event.clientY - drag.startY;
		const now = performance.now();
		const sampleDuration = now - drag.lastSampleAt;
		if (sampleDuration > 0) {
			const sampledVelocity = (event.clientX - drag.lastX) / sampleDuration;
			const sampledVelocityY = (event.clientY - drag.lastY) / sampleDuration;
			drag.velocityX = drag.velocityX * .62 + sampledVelocity * .38;
			drag.velocityY = drag.velocityY * .62 + sampledVelocityY * .38;
			drag.lastX = event.clientX;
			drag.lastY = event.clientY;
			drag.lastSampleAt = now;
		}
		dragDeltaRef.current = Math.max(dragDeltaRef.current, Math.hypot(deltaX, deltaY));

		if (!drag.axis && Math.max(Math.abs(deltaX), Math.abs(deltaY)) > 7) {
			drag.axis = drag.mode === 'home' && Math.abs(deltaX) > Math.abs(deltaY)
				? 'horizontal'
				: 'vertical';
			event.currentTarget.setPointerCapture(event.pointerId);
			if (drag.axis === 'horizontal') setIsHomePageDragging(true);
			if (drag.axis === 'vertical') {
				if (drag.mode === 'shade') drag.verticalIntent = 'close-shade';
				if (drag.mode === 'home' || drag.mode === 'app') {
					drag.verticalIntent = drag.overlayKind ?? (deltaY >= 0 ? 'shade' : 'recents');
				}
			}
		}

		if (drag.axis === 'horizontal') {
			event.preventDefault();
			const rawOffset = drag.homePageOffset + deltaX;
			const minimumOffset = -(homePages.length - 1 - drag.homePage) * drag.viewportWidth;
			const maximumOffset = drag.homePage * drag.viewportWidth;
			let resistedOffset = rawOffset;
			if (rawOffset < minimumOffset) {
				resistedOffset = minimumOffset - rubberBand(minimumOffset - rawOffset, drag.viewportWidth);
			}
			if (rawOffset > maximumOffset) {
				resistedOffset = maximumOffset + rubberBand(rawOffset - maximumOffset, drag.viewportWidth);
			}
			updateHomePageDrag(resistedOffset);
			return;
		}

		if (drag.axis !== 'vertical') return;
		event.preventDefault();
		if (drag.mode === 'lock') {
			const dismissDistance = lockDismissDistance(drag.viewportHeight);
			const rawOffset = Math.min(0, drag.lockOffset + deltaY);
			const offset = rawOffset < -dismissDistance
				? -dismissDistance - rubberBand(-dismissDistance - rawOffset, dismissDistance) * .06
				: rawOffset;
			updateDragOffset(offset);
			return;
		}

		const extent = Math.min(270, Math.max(190, drag.viewportHeight * .32));
		if (!drag.overlayKind && (drag.mode === 'home' || drag.mode === 'app') && drag.verticalIntent === 'shade' && deltaY < -10) {
			drag.verticalIntent = 'recents';
		}
		if (!drag.overlayKind && (drag.mode === 'home' || drag.mode === 'app') && drag.verticalIntent === 'recents' && deltaY > 10) {
			drag.verticalIntent = 'shade';
			if (recentTransitionRef.current) {
				recentTransitionRef.current = null;
				setRecentTransition(null);
			}
		}
		if (drag.verticalIntent === 'shade') {
			const distanceProgress = deltaY >= 0
				? gestureProgress(deltaY, extent)
				: deltaY / extent;
			const progress = clamp(drag.overlayStartProgress + distanceProgress, -.08, 1.14);
			setShadeOrigin(drag.mode as ShadeOrigin);
			setOverlayProgress({ kind: 'shade', origin: drag.mode as ShadeOrigin, phase: 'dragging' }, progress);
			updateDragOffset(Math.max(0, deltaY));
		}
		if (drag.verticalIntent === 'recents') {
			const distance = -deltaY;
			const distanceProgress = distance >= 0
				? gestureProgress(distance, extent)
				: distance / extent;
			const progress = clamp(drag.overlayStartProgress + distanceProgress, -.08, 1.14);
			if (drag.mode === 'app' && activeAppRef.current && !recentTransitionRef.current) {
				const transition = { app: activeAppRef.current };
				recentTransitionRef.current = transition;
				setRecentTransition(transition);
			}
			setRecentsOrigin(drag.mode as ShadeOrigin);
			setOverlayProgress({ kind: 'recents', origin: drag.mode as ShadeOrigin, phase: 'dragging' }, progress);
			updateDragOffset(Math.min(0, deltaY));
		}
		if (drag.verticalIntent === 'close-shade') {
			const progress = drag.overlayKind ? drag.overlayStartProgress : 1;
			const nextProgress = clamp(progress + deltaY / extent, -.08, 1.14);
			setOverlayProgress({ kind: 'shade', origin: shadeOrigin, phase: 'dragging' }, nextProgress);
			updateDragOffset(Math.min(0, deltaY));
		}
	};

	const handlePointerUp = (event: ReactPointerEvent<HTMLElement>, cancelled = false) => {
		const drag = dragRef.current;
		if (!drag || drag.pointerId !== event.pointerId) return;
		dragRef.current = null;
		if (event.currentTarget.hasPointerCapture(event.pointerId)) {
			event.currentTarget.releasePointerCapture(event.pointerId);
		}

		if (drag.axis === 'horizontal') {
			const idleTime = performance.now() - drag.lastSampleAt;
			const releaseVelocity = cancelled
				? 0
				: drag.velocityX * clamp(1 - idleTime / 90, 0, 1);
			const currentOffset = homePageDragRef.current;
			const projectedOffset = currentOffset
				+ clamp(releaseVelocity * 240, -drag.viewportWidth * .48, drag.viewportWidth * .48);
			let pageDelta = 0;
			if (!cancelled && Math.abs(currentOffset) > 8 && Math.abs(releaseVelocity) > .5) {
				pageDelta = releaseVelocity < 0 ? 1 : -1;
			} else if (!cancelled && Math.abs(projectedOffset) > drag.viewportWidth * .31) {
				pageDelta = projectedOffset < 0 ? 1 : -1;
			}
			const targetPage = clamp(drag.homePage + pageDelta, 0, homePages.length - 1);
			settleHomePage(
				targetPage,
				targetPage === drag.homePage ? releaseVelocity * .28 : releaseVelocity,
				drag.viewportWidth,
			);
			setIsHomePageDragging(false);
			updateDragOffset(0);
			dragDeltaRef.current = 0;
			return;
		}
		if (drag.axis === null && drag.mode === 'home' && Math.abs(homePageDragRef.current) > .5) {
			const nearestPage = clamp(
				Math.round(drag.homePage - homePageDragRef.current / drag.viewportWidth),
				0,
				homePages.length - 1,
			);
			settleHomePage(nearestPage, 0, drag.viewportWidth);
			dragDeltaRef.current = 0;
			return;
		}
		if (drag.axis === null && drag.overlayKind && drag.overlayTarget !== null) {
			const { overlayKind, overlayTarget } = drag;
			const origin = drag.overlayOrigin ?? (drag.mode === 'app' ? 'app' : 'home');
			settleOverlay(overlayKind, origin, overlayTarget, 0, () => {
				if (overlayTarget === 1) setMode(overlayKind);
				else setMode(origin === 'app' && activeAppRef.current ? 'app' : 'home');
				if (overlayKind === 'recents') setRecentTransition(null);
			});
			dragDeltaRef.current = 0;
			return;
		}
		if (cancelled) {
			if (drag.mode === 'lock') {
				settleLockScreen('lock', 0, drag.viewportHeight);
				updateHomePageDrag(0);
				setIsHomePageDragging(false);
				dragDeltaRef.current = 0;
				return;
			}
			if (drag.verticalIntent) {
				const kind = drag.verticalIntent === 'recents' ? 'recents' : 'shade';
				const target = drag.mode === 'shade' ? 1 : 0;
				settleOverlay(kind, drag.mode === 'shade' ? shadeOrigin : drag.mode as ShadeOrigin, target, 0, () => {
					if (kind === 'recents') setRecentTransition(null);
				});
			}
			updateDragOffset(0);
			updateHomePageDrag(0);
			setIsHomePageDragging(false);
			dragDeltaRef.current = 0;
			return;
		}

		const idleTime = performance.now() - drag.lastSampleAt;
		const velocityY = drag.velocityY * clamp(1 - idleTime / 100, 0, 1);
		if (drag.mode === 'lock') {
			const travelled = -dragOffsetRef.current;
			const projectedTravel = travelled - velocityY * 180;
			const distanceThreshold = Math.min(155, lockDismissDistance(drag.viewportHeight) * .42);
			const shouldOpen = projectedTravel > distanceThreshold || velocityY < -.58;
			settleLockScreen(shouldOpen ? 'pin' : 'lock', velocityY, drag.viewportHeight);
		}
		else if (drag.verticalIntent === 'shade') {
			const progress = overlayProgressRef.current;
			const progressVelocity = velocityY * 1000 / Math.min(270, Math.max(190, drag.viewportHeight * .32));
			const shouldOpen = progress + progressVelocity * .1 > .42;
			settleOverlay('shade', drag.mode as ShadeOrigin, shouldOpen ? 1 : 0, progressVelocity, () => {
				if (shouldOpen) setMode('shade');
			});
		}
		else if (drag.verticalIntent === 'recents') {
			const progress = overlayProgressRef.current;
			const progressVelocity = -velocityY * 1000 / Math.min(270, Math.max(190, drag.viewportHeight * .32));
			const shouldOpen = progress + progressVelocity * .1 > .38;
			settleOverlay('recents', drag.mode as ShadeOrigin, shouldOpen ? 1 : 0, progressVelocity, () => {
				if (shouldOpen) setMode('recents');
				setRecentTransition(null);
			});
		}
		else if (drag.verticalIntent === 'close-shade') {
			const progress = overlayProgressRef.current;
			const progressVelocity = velocityY * 1000 / Math.min(270, Math.max(190, drag.viewportHeight * .32));
			const shouldClose = progress + progressVelocity * .1 < .68;
			settleOverlay('shade', shadeOrigin, shouldClose ? 0 : 1, progressVelocity, () => {
				if (shouldClose) setMode(shadeOrigin === 'app' && activeApp ? 'app' : 'home');
			});
		}
		else updateDragOffset(0);
		if (drag.mode !== 'lock') updateDragOffset(0);
		updateHomePageDrag(0);
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
		if (pointerDistance > 6 || Math.abs(homePageDragRef.current) > 1 || launch) return;
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
			updateDragOffset(0);
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
			updateDragOffset(0);
			setLaunch(null);
		}, 440);
	};

	const handleRecentTransitionReady = (appId: string, bounds: RecentTransitionBounds) => {
		setRecentTransition((transition) => {
			if (!transition || transition.app.id !== appId || transition.target) return transition;
			const nextTransition = { ...transition, target: bounds };
			recentTransitionRef.current = nextTransition;
			return nextTransition;
		});
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
	const dismissDistance = lockDismissDistance(lockSwipeExtent);
	const lockTravelProgress = clamp(-dragOffset / dismissDistance, 0, 1);
	const lockRevealDistance = Math.min(230, dismissDistance * .62);
	const lockRevealProgress = smoothStep(clamp((-dragOffset - 18) / lockRevealDistance, 0, 1));
	const lockOpacity = 1 - smoothStep(clamp((lockTravelProgress - .18) / .74, 0, 1));
	const lockStyle = {
		'--launcher-drag': `${dragOffset}px`,
		'--launcher-lock-progress': lockRevealProgress,
		'--launcher-lock-opacity': lockOpacity,
	} as CSSProperties;
	const pinRevealStyle = mode === 'lock' ? ({
		'--launcher-pin-reveal': lockRevealProgress,
		'--launcher-pin-y': `${(1 - lockRevealProgress) * 22}px`,
		'--launcher-pin-scale': .96 + lockRevealProgress * .04,
		'--launcher-pin-blur': `${(1 - lockRevealProgress) * 3}px`,
	} as CSSProperties) : undefined;
	const normalizedHomeDrag = homePageDrag / Math.max(1, homePageWidth);
	const effectiveHomePage = homePage - normalizedHomeDrag;
	const launcherStyle = {
		'--launcher-wallpaper-x': `${clamp(-effectiveHomePage * 7, -12, 5)}px`,
	} as CSSProperties;
	const stableOverlayKind: OverlayKind | null = mode === 'shade' || mode === 'recents' ? mode : null;
	const overlayKind = overlayMotion?.kind ?? stableOverlayKind;
	const rawOverlayProgress = overlayMotion?.progress ?? (stableOverlayKind ? 1 : 0);
	const overlayProgress = clamp(rawOverlayProgress, 0, 1);
	const overlayEasedProgress = smoothStep(overlayProgress);
	const recentTransitionStyle = useMemo(() => {
		if (!recentTransition?.target) return undefined;
		const progress = overlayEasedProgress;
		return {
			'--recent-transition-left': `${recentTransition.target.left * progress}px`,
			'--recent-transition-top': `${recentTransition.target.top * progress}px`,
			'--recent-transition-width': `calc(${(1 - progress) * 100}% + ${recentTransition.target.width * progress}px)`,
			'--recent-transition-height': `calc(${(1 - progress) * 100}% + ${recentTransition.target.height * progress}px)`,
			'--recent-transition-radius': `${18 * progress}px`,
			'--recent-transition-shadow-opacity': progress,
		} as CSSProperties;
	}, [overlayEasedProgress, recentTransition]);
	const stagger = (start: number) => clamp((overlayProgress - start) / (1 - start), 0, 1);
	const overlayStyle = {
		'--launcher-overlay-progress': overlayProgress,
		'--launcher-overlay-eased': overlayEasedProgress,
		'--launcher-overlay-overshoot': rawOverlayProgress - overlayProgress,
		'--launcher-shade-source-scale': 1 + overlayEasedProgress * .035,
		'--launcher-shade-source-blur': `${overlayEasedProgress * 17}px`,
		'--launcher-shade-source-brightness': 1 - overlayEasedProgress * .28,
		'--launcher-shade-source-opacity': 1 - overlayProgress * .22,
		'--launcher-recents-source-scale': 1 - overlayEasedProgress * .055,
		'--launcher-recents-source-y': `${overlayEasedProgress * 10}px`,
		'--launcher-recents-source-blur': recentsOrigin === 'app' ? '0px' : `${overlayEasedProgress * 12}px`,
		'--launcher-recents-source-brightness': 1 - overlayEasedProgress * .18,
		'--launcher-recents-source-opacity': recentsOrigin === 'app'
			? 1 - overlayProgress
			: 1 - overlayProgress * .42,
		'--shade-clock-progress': stagger(.02),
		'--shade-clock-y': `${(1 - stagger(.02)) * -14}px`,
		'--shade-clock-scale': .96 + stagger(.02) * .04,
		'--shade-network-progress': stagger(.07),
		'--shade-network-y': `${(1 - stagger(.07)) * -18}px`,
		'--shade-network-scale': .94 + stagger(.07) * .06,
		'--shade-quick-progress': stagger(.13),
		'--shade-quick-y': `${(1 - stagger(.13)) * -20}px`,
		'--shade-quick-scale': .92 + stagger(.13) * .08,
		'--shade-slider-progress': stagger(.18),
		'--shade-slider-y': `${(1 - stagger(.18)) * -18}px`,
		'--shade-slider-scale': .95 + stagger(.18) * .05,
		'--shade-footer-progress': stagger(.24),
		'--shade-footer-y': `${(1 - stagger(.24)) * -12}px`,
		'--recents-header-progress': stagger(.12),
		'--recents-header-y': `${(1 - stagger(.12)) * 12}px`,
		'--recents-cards-progress': stagger(.04),
		'--recents-panel-scale': clamp(.9 + rawOverlayProgress * .1, .89, 1.012),
		'--recents-panel-y': `${(1 - rawOverlayProgress) * 54}px`,
		'--recents-panel-radius': `${(1 - overlayEasedProgress) * 30}px`,
		'--recents-card-scale': clamp(.94 + rawOverlayProgress * .06, .93, 1.008),
	} as CSSProperties;
	const shadeGestureStyle = {
		'--shade-translate': `${(rawOverlayProgress - 1) * 104}%`,
		'--shade-surface-opacity': clamp(overlayProgress * 1.18, 0, 1),
		'--shade-content-opacity': clamp((overlayProgress - .03) * 1.2, 0, 1),
		'--shade-content-scale': .82 + overlayEasedProgress * .18,
	} as CSSProperties;
	const overlayIsDragging = overlayMotion?.phase === 'dragging';
	const showShade = overlayKind === 'shade';
	const showRecents = overlayKind === 'recents';
	const sourceIsShadeBackground = overlayKind === 'shade' && overlayProgress > 0;
	const sourceIsRecentsBackground = overlayKind === 'recents' && overlayProgress > 0;

	return (
		<App
			className={`launcher-screen launcher-screen--${mode}${blackout ? ' is-blackout' : ''}${overlayMotion ? ' is-overlay-moving' : ''}${overlayIsDragging ? ' is-overlay-dragging' : ''}`}
			style={{ ...launcherStyle, ...overlayStyle }}
			onPointerDown={handlePointerDown}
			onPointerMove={handlePointerMove}
			onPointerUp={handlePointerUp}
			onPointerCancel={(event) => handlePointerUp(event, true)}
		>
			<img className="launcher-wallpaper" src={wallpaperImage} alt="" aria-hidden="true" draggable="false" />
			<LauncherStatus dark={mode === 'app' && activeApp?.statusBar === 'dark'} />

			{mode === 'lock' ? (
				<div className={`launcher-lock${isLockSettling ? ' is-settling' : ''}`} style={lockStyle}>
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

			{mode === 'lock' || mode === 'pin' ? (
				<PinPad
					className={`launcher-pin--swipe-stage${mode === 'lock' ? ' launcher-pin--under-lock' : ''}`}
					style={pinRevealStyle}
					interactive={mode === 'pin'}
					entered={pinLength}
					onDigit={handleDigit}
					onCancel={() => { setPinLength(0); completeTransition('lock'); }}
				/>
			) : null}

			{mode === 'home' || mode === 'shade' || mode === 'recents' || (overlayMotion?.origin === 'home') ? (
				<div className={`launcher-home${sourceIsShadeBackground ? ' is-shade-background' : ''}${sourceIsRecentsBackground ? ' is-recents-background' : ''}${skipHomeEntrance ? ' is-settled' : ''}`} style={mode === 'home' ? lockStyle : undefined}>
					<HomeGrid
						activePage={homePage}
						dragOffset={homePageDrag}
						viewportWidth={homePageWidth}
						isDragging={isHomePageDragging}
						isSettling={isHomePageSettling}
						onLaunch={startHomeLaunch}
						onViewportResize={setHomePageWidth}
						onPageChange={(page) => {
							if (page === homePage && Math.abs(homePageDragRef.current) < .5) return;
							const direction = Math.sign(homePage - page);
							settleHomePage(page, direction * .58);
						}}
					/>
				</div>
			) : null}

			{activeApp && (mode === 'app' || (overlayKind === 'shade' && shadeOrigin === 'app') || (overlayKind === 'recents' && recentsOrigin === 'app')) ? (
				<div
					className={`launcher-app-placeholder${sourceIsShadeBackground ? ' is-shade-background' : ''}${sourceIsRecentsBackground ? ' is-recents-background' : ''}${recentTransition ? ' is-recents-transition' : ''}`}
					style={recentTransition ? recentTransitionStyle : mode === 'app' ? lockStyle : undefined}
					aria-label={`Приложение «${activeApp.label}»`}
				>
					<img src={activeApp.preview} alt={`Экран приложения «${activeApp.label}»`} draggable="false" />
				</div>
			) : null}

			{showShade ? (
				<ControlShade
					className={`launcher-shade--gesture launcher-shade--motion${mode !== 'shade' ? ' launcher-shade--pull' : ''}${overlayIsDragging ? ' is-dragging' : ''}${overlayMotion?.phase === 'settling' ? ' is-settling' : ''}`}
					style={shadeGestureStyle}
					preview={mode !== 'shade'}
					onClose={() => closeOverlay('shade', shadeOrigin, -1.1)}
					onSettings={() => navigate('/app/Components/navigation')}
				/>
			) : null}

			{showRecents ? (
				<RecentApps
					motionManaged
					isTransitioning={Boolean(overlayMotion)}
					interactive={mode === 'recents' && overlayMotion?.phase !== 'settling'}
					onOpen={startRecentLaunch}
					onEmpty={() => {
						setRecentTransition(null);
						setActiveApp(null);
						setRecentsOrigin('home');
						closeOverlay('recents', 'home', -1.25, 'home');
					}}
					onRequestClose={() => closeOverlay('recents', recentsOrigin, -1.05)}
					onExitDrag={(progress) => {
						cancelOverlayAnimation();
						setOverlayProgress({ kind: 'recents', origin: recentsOrigin, phase: 'dragging' }, progress);
					}}
					onExitEnd={(shouldClose, velocity) => {
						settleOverlay('recents', recentsOrigin, shouldClose ? 0 : 1, velocity, () => {
							if (shouldClose) setMode(recentsOrigin === 'app' && activeApp ? 'app' : 'home');
						});
					}}
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

		</App>
	);
}
