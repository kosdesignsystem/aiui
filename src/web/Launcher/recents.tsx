import {
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
	type CSSProperties,
	type PointerEvent as ReactPointerEvent,
} from 'react';
import {
	recentApps,
	type LaunchableApp,
	type RecentTransitionBounds,
} from './model';

type RecentDrag = {
	pointerId: number;
	appId: string;
	startX: number;
	startY: number;
	startScrollLeft: number;
	startedAt: number;
	lastY: number;
	lastSampleAt: number;
	velocityY: number;
	axis: 'horizontal' | 'vertical' | null;
	offsetY: number;
	isExiting: boolean;
};

type RecentAppsProps = {
	onOpen: (event: ReactPointerEvent<HTMLButtonElement>, app: LaunchableApp) => void;
	onEmpty: () => void;
	onRequestClose?: () => void;
	onExitDrag?: (progress: number) => void;
	onExitEnd?: (shouldClose: boolean, velocity: number) => void;
	initialActiveId?: string;
	transitioningAppId?: string;
	onTransitionReady?: (appId: string, bounds: RecentTransitionBounds) => void;
	motionManaged?: boolean;
	isTransitioning?: boolean;
	interactive?: boolean;
};

export function RecentApps({
	onOpen,
	onEmpty,
	onRequestClose,
	onExitDrag,
	onExitEnd,
	initialActiveId,
	transitioningAppId,
	onTransitionReady,
	motionManaged = false,
	isTransitioning = false,
	interactive = true,
}: RecentAppsProps) {
	const [items, setItems] = useState(recentApps);
	const [activeId, setActiveId] = useState(() => (
		recentApps.some((app) => app.id === initialActiveId) ? initialActiveId ?? '' : recentApps[0]?.id ?? ''
	));
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
			const step = card.offsetWidth + 24;
			const progress = Math.min(1, distance / step);
			const opacity = 1 - progress * .3;
			const previewWidth = 222.11 - progress * (222.11 - 183.24);
			const previewHeight = 493.58 - progress * (493.58 - 407.2);
			const lift = progress * 40;
			const iconShift = Math.sign(signedDistance) * progress * -94;

			card.style.setProperty('--recent-opacity', opacity.toFixed(4));
			card.style.setProperty('--recent-preview-width', `${previewWidth.toFixed(2)}px`);
			card.style.setProperty('--recent-preview-height', `${previewHeight.toFixed(2)}px`);
			card.style.setProperty('--recent-lift', `${lift.toFixed(2)}px`);
			card.style.setProperty('--recent-icon-shift', `${iconShift.toFixed(2)}px`);
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

	useLayoutEffect(() => {
		const track = trackRef.current;
		if (!track) return;
		const targetSlide = Array.from(track.querySelectorAll<HTMLElement>('[data-recent-id]'))
			.find((slide) => slide.dataset.recentId === activeId);
		if (!targetSlide) return;

		track.scrollLeft = targetSlide.offsetLeft + targetSlide.offsetWidth / 2 - track.clientWidth / 2;
		updateCardPresentation();
		if (!transitioningAppId || transitioningAppId !== activeId || !onTransitionReady) return;

		let secondFrame: number | null = null;
		const firstFrame = requestAnimationFrame(() => {
			secondFrame = requestAnimationFrame(() => {
				const preview = targetSlide.querySelector<HTMLElement>('.launcher-recent-card__preview');
				const surface = targetSlide.closest<HTMLElement>('.launcher-screen');
				const recents = targetSlide.closest<HTMLElement>('.launcher-recents');
				if (!preview || !surface || !recents) return;
				// Measure the resting card, not the temporarily scaled recents panel.
				// This keeps the gesture-driven app surface aligned with the card
				// when the overlay reaches its final position.
				recents.classList.add('is-measuring-target');
				const previewRect = preview.getBoundingClientRect();
				const surfaceRect = surface.getBoundingClientRect();
				recents.classList.remove('is-measuring-target');
				onTransitionReady(activeId, {
					left: previewRect.left - surfaceRect.left,
					top: previewRect.top - surfaceRect.top,
					width: previewRect.width,
					height: previewRect.height,
				});
			});
		});

		return () => {
			cancelAnimationFrame(firstFrame);
			if (secondFrame !== null) cancelAnimationFrame(secondFrame);
		};
	}, []);

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

	const handleCardPointerDown = (event: ReactPointerEvent<HTMLButtonElement>, app: LaunchableApp) => {
		if (closingIds.size > 0) return;
		event.currentTarget.setPointerCapture(event.pointerId);
		const now = performance.now();
		dragRef.current = {
			pointerId: event.pointerId,
			appId: app.id,
			startX: event.clientX,
			startY: event.clientY,
			startScrollLeft: trackRef.current?.scrollLeft ?? 0,
			startedAt: now,
			lastY: event.clientY,
			lastSampleAt: now,
			velocityY: 0,
			axis: null,
			offsetY: 0,
			isExiting: false,
		};
		setDraggedCard({ id: app.id, offsetY: 0 });
	};

	const handleCardPointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
		const drag = dragRef.current;
		if (!drag || drag.pointerId !== event.pointerId) return;
		const deltaX = event.clientX - drag.startX;
		const deltaY = event.clientY - drag.startY;
		const now = performance.now();
		const sampleDuration = now - drag.lastSampleAt;
		if (sampleDuration > 0) {
			const sampledVelocityY = (event.clientY - drag.lastY) / sampleDuration;
			drag.velocityY = drag.velocityY * .58 + sampledVelocityY * .42;
			drag.lastY = event.clientY;
			drag.lastSampleAt = now;
		}

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
			if (deltaY > 0 && onExitDrag) {
				drag.isExiting = true;
				drag.offsetY = deltaY;
				setDraggedCard(null);
				onExitDrag(Math.max(-.04, 1 - deltaY / 230));
				return;
			}
			drag.offsetY = deltaY;
			setDraggedCard({ id: drag.appId, offsetY: drag.offsetY });
		}
	};

	const finishCardGesture = (event: ReactPointerEvent<HTMLButtonElement>, app: LaunchableApp, cancelled = false) => {
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
			if (drag.isExiting && onExitEnd) {
				const idleTime = performance.now() - drag.lastSampleAt;
				const velocityY = drag.velocityY * Math.max(0, 1 - idleTime / 100);
				const shouldClose = !cancelled && (drag.offsetY > 74 || velocityY > .52);
				setDraggedCard(null);
				onExitEnd(shouldClose, cancelled ? 0 : -velocityY * 1000 / 230);
				return;
			}
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
		<div
			className={`launcher-recents${isClosingAll ? ' is-closing-all' : ''}${initialActiveId ? ' is-opened-from-app' : ''}${transitioningAppId ? ' is-entering-from-app' : ''}${motionManaged ? ' is-motion-managed' : ''}${isTransitioning ? ' is-transitioning' : ''}${interactive ? ' is-interactive' : ' is-passive'}`}
			role="dialog"
			aria-label="Открытые приложения"
			aria-hidden={!interactive || undefined}
		>
			<button className="launcher-recents__close-all" type="button" disabled={!interactive} onClick={handleCloseAll}>Закрыть все</button>
			<div
				ref={trackRef}
				className={`launcher-recents__track${isScrolling ? ' is-dragging' : ''}`}
				onScroll={handleScroll}
				onClick={(event) => {
					if (event.target === event.currentTarget) onRequestClose?.();
				}}
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
							className={`launcher-recents__slide${activeId === app.id ? ' is-active' : ''}${transitioningAppId === app.id ? ' is-transition-target' : ''}${draggedCard?.id === app.id ? ' is-being-dragged' : ''}${isClosing ? ' is-closing' : ''}${isCollapsing ? ' is-collapsing' : ''}`}
							data-recent-id={app.id}
							role="listitem"
							style={style}
							key={app.id}
						>
							<button
								className={`launcher-recent-card launcher-recent-card--${app.id}`}
								type="button"
									disabled={!interactive || isClosing}
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

