import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
	type CSSProperties,
	type MouseEvent as ReactMouseEvent,
	type PointerEvent as ReactPointerEvent,
} from 'react';
import { cn } from '../../ui/lib/cn';
import {
	recentApps,
	type LaunchableApp,
	type RecentTransitionBounds,
} from './model';
import { clamp, launcherGesture, launcherMotion } from './motion';
import { useManagedTimeouts } from './useManagedTimeouts';

const recentCardMetrics = {
	activeWidth: 222.11,
	activeHeight: 493.58,
	inactiveWidth: 183.24,
	inactiveHeight: 407.2,
	gap: 24,
	lift: 40,
	iconShift: 94,
} as const;

type RecentDrag = {
	pointerId: number;
	appId: string;
	startActiveId: string;
	startX: number;
	startY: number;
	startScrollLeft: number;
	axis: 'horizontal' | 'vertical' | null;
	offsetY: number;
	lastX: number;
	lastY: number;
	lastAt: number;
	velocityX: number;
	velocityY: number;
};

type RecentAppsProps = {
	onOpen: (
		event: ReactPointerEvent<HTMLButtonElement> | ReactMouseEvent<HTMLButtonElement>,
		app: LaunchableApp,
	) => void;
	onEmpty: () => void;
	initialActiveId?: string;
	transitioningAppId?: string;
	onTransitionReady?: (appId: string, bounds: RecentTransitionBounds) => void;
};

export function RecentApps({
	onOpen,
	onEmpty,
	initialActiveId,
	transitioningAppId,
	onTransitionReady,
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
	const initialPresentationRef = useRef({ activeId, transitioningAppId, onTransitionReady });
	const scrollFrameRef = useRef<number | null>(null);
	const motionFrameRef = useRef<number | null>(null);
	const { schedule } = useManagedTimeouts();

	useEffect(() => () => {
		if (scrollFrameRef.current !== null) cancelAnimationFrame(scrollFrameRef.current);
		if (motionFrameRef.current !== null) cancelAnimationFrame(motionFrameRef.current);
	}, []);

	const updateCardPresentation = useCallback(() => {
		const track = trackRef.current;
		if (!track) return;
		const trackCenter = track.scrollLeft + track.clientWidth / 2;
		let nearestId = '';
		let nearestDistance = Number.POSITIVE_INFINITY;

		track.querySelectorAll<HTMLElement>('[data-recent-id]').forEach((card) => {
			if (card.classList.contains('is-closing')) return;
			const signedDistance = card.offsetLeft + card.offsetWidth / 2 - trackCenter;
			const distance = Math.abs(signedDistance);
			const step = card.offsetWidth + recentCardMetrics.gap;
			const progress = Math.min(1, distance / step);
			const opacity = 1 - progress * .3;
			const previewWidth = recentCardMetrics.activeWidth
				- progress * (recentCardMetrics.activeWidth - recentCardMetrics.inactiveWidth);
			const previewHeight = recentCardMetrics.activeHeight
				- progress * (recentCardMetrics.activeHeight - recentCardMetrics.inactiveHeight);
			const lift = progress * recentCardMetrics.lift;
			const iconShift = Math.sign(signedDistance) * progress * -recentCardMetrics.iconShift;

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

		if (nearestId) setActiveId((currentId) => currentId === nearestId ? currentId : nearestId);
	}, []);

	const animateCardPresentation = useCallback((duration: number) => {
		if (motionFrameRef.current !== null) cancelAnimationFrame(motionFrameRef.current);
		const startedAt = performance.now();
		const update = (now: number) => {
			updateCardPresentation();
			if (now - startedAt < duration) motionFrameRef.current = requestAnimationFrame(update);
			else motionFrameRef.current = null;
		};
		motionFrameRef.current = requestAnimationFrame(update);
	}, [updateCardPresentation]);

	useLayoutEffect(() => {
		const track = trackRef.current;
		if (!track) return;
		const initialPresentation = initialPresentationRef.current;
		const targetSlide = Array.from(track.querySelectorAll<HTMLElement>('[data-recent-id]'))
			.find((slide) => slide.dataset.recentId === initialPresentation.activeId);
		if (!targetSlide) return;

		track.scrollLeft = targetSlide.offsetLeft + targetSlide.offsetWidth / 2 - track.clientWidth / 2;
		updateCardPresentation();
		if (
			!initialPresentation.transitioningAppId
			|| initialPresentation.transitioningAppId !== initialPresentation.activeId
			|| !initialPresentation.onTransitionReady
		) return;

		let secondFrame: number | null = null;
		const firstFrame = requestAnimationFrame(() => {
			secondFrame = requestAnimationFrame(() => {
				const preview = targetSlide.querySelector<HTMLElement>('.launcher-recent-card__preview');
				const surface = targetSlide.closest<HTMLElement>('.launcher-screen');
				if (!preview || !surface) return;
				const previewRect = preview.getBoundingClientRect();
				const surfaceRect = surface.getBoundingClientRect();
				initialPresentation.onTransitionReady?.(initialPresentation.activeId, {
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
	}, [updateCardPresentation]);

	useEffect(() => {
		const frame = requestAnimationFrame(updateCardPresentation);
		return () => cancelAnimationFrame(frame);
	}, [items.length, updateCardPresentation]);

	const handleScroll = () => {
		if (scrollFrameRef.current !== null) cancelAnimationFrame(scrollFrameRef.current);
		scrollFrameRef.current = requestAnimationFrame(updateCardPresentation);
	};

	const snapToNearestCard = (direction = 0, fromAppId?: string) => {
		const track = trackRef.current;
		if (!track) return;
		const trackCenter = track.scrollLeft + track.clientWidth / 2;
		const cards = Array.from(track.querySelectorAll<HTMLElement>('[data-recent-id]'))
			.filter((card) => !card.classList.contains('is-closing'));
		const nearestCard = cards.reduce<HTMLElement | null>((nearest, card) => {
				if (!nearest) return card;
				const cardDistance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - trackCenter);
				const nearestDistance = Math.abs(nearest.offsetLeft + nearest.offsetWidth / 2 - trackCenter);
				return cardDistance < nearestDistance ? card : nearest;
			}, null);

		if (nearestCard) {
			const fromIndex = direction !== 0 && fromAppId
				? cards.findIndex((card) => card.dataset.recentId === fromAppId)
				: -1;
			const baseIndex = fromIndex >= 0 ? fromIndex : cards.indexOf(nearestCard);
			const targetCard = cards[clamp(baseIndex + direction, 0, cards.length - 1)] ?? nearestCard;
			track.scrollTo({
				left: targetCard.offsetLeft + targetCard.offsetWidth / 2 - track.clientWidth / 2,
				behavior: 'smooth',
			});
			animateCardPresentation(launcherMotion.recentSnap);
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
				animateCardPresentation(launcherMotion.recentTransition);
			}, launcherMotion.recentCollapseDelay);
		}

		schedule(() => {
			setItems((currentItems) => currentItems.filter((app) => app.id !== appId));
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
			if (!hasRemainingApps) schedule(onEmpty, 0);
		}, hasRemainingApps ? launcherMotion.recentCollapseComplete : launcherMotion.recentDismiss);
	};

	const handleCloseAll = () => {
		if (items.length === 0 || isClosingAll) return;
		setIsClosingAll(true);
		setClosingIds(new Set(items.map((app) => app.id)));
		schedule(onEmpty, launcherMotion.recentDismiss + items.length * launcherMotion.recentCloseAllStagger);
	};

	const handleCardPointerDown = (event: ReactPointerEvent<HTMLButtonElement>, app: LaunchableApp) => {
		if (!event.isPrimary || event.button !== 0 || closingIds.size > 0) return;
		event.currentTarget.setPointerCapture(event.pointerId);
		dragRef.current = {
			pointerId: event.pointerId,
			appId: app.id,
			startActiveId: activeId,
			startX: event.clientX,
			startY: event.clientY,
			startScrollLeft: trackRef.current?.scrollLeft ?? 0,
			axis: null,
			offsetY: 0,
			lastX: event.clientX,
			lastY: event.clientY,
			lastAt: performance.now(),
			velocityX: 0,
			velocityY: 0,
		};
		setDraggedCard({ id: app.id, offsetY: 0 });
	};

	const handleCardPointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
		const drag = dragRef.current;
		if (!drag || drag.pointerId !== event.pointerId) return;
		const deltaX = event.clientX - drag.startX;
		const deltaY = event.clientY - drag.startY;
		const now = performance.now();
		const sampleDuration = Math.max(1, now - drag.lastAt);
		const nextVelocityX = (event.clientX - drag.lastX) / sampleDuration;
		const nextVelocityY = (event.clientY - drag.lastY) / sampleDuration;
		drag.velocityX = drag.velocityX * .35 + nextVelocityX * .65;
		drag.velocityY = drag.velocityY * .35 + nextVelocityY * .65;
		drag.lastX = event.clientX;
		drag.lastY = event.clientY;
		drag.lastAt = now;

		if (!drag.axis && Math.max(Math.abs(deltaX), Math.abs(deltaY)) > launcherGesture.axisLockDistance) {
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
			const direction = Math.abs(drag.velocityX) > launcherGesture.recentFlingVelocity
				? drag.velocityX < 0 ? 1 : -1
				: 0;
			requestAnimationFrame(() => snapToNearestCard(direction, drag.startActiveId));
			return;
		}

		if (drag.axis === 'vertical') {
			const isFastUpwardSwipe = drag.offsetY < -32 && drag.velocityY < -launcherGesture.recentDismissVelocity;
			if (!cancelled && (drag.offsetY < -launcherGesture.recentDismissDistance || isFastUpwardSwipe)) dismissCard(app.id);
			else setDraggedCard(null);
			return;
		}

		setDraggedCard(null);
		if (!cancelled) onOpen(event, app);
	};

	return (
		<div
			className={cn(
				'launcher-recents',
				isClosingAll && 'is-closing-all',
				initialActiveId && 'is-opened-from-app',
				transitioningAppId && 'is-entering-from-app',
			)}
			role="dialog"
			aria-label="Открытые приложения"
		>
			<button className="launcher-recents__close-all" type="button" onClick={handleCloseAll}>Закрыть все</button>
			<div
				ref={trackRef}
				className={cn('launcher-recents__track', isScrolling && 'is-dragging')}
				onScroll={handleScroll}
				role="list"
				aria-label="Открытые приложения"
			>
				{items.map((app, index) => {
					const isClosing = closingIds.has(app.id);
					const isCollapsing = collapsingIds.has(app.id);
					const offsetY = draggedCard?.id === app.id ? draggedCard.offsetY : 0;
					const dragProgress = clamp(-offsetY / 150, 0, 1);
					const style = {
						'--recent-drag-y': `${offsetY}px`,
						'--recent-drag-opacity': 1 - dragProgress * .16,
						'--recent-drag-scale': 1 - dragProgress * .025,
						'--recent-index': index,
					} as CSSProperties;

					return (
						<div
							className={cn(
								'launcher-recents__slide',
								activeId === app.id && 'is-active',
								transitioningAppId === app.id && 'is-transition-target',
								draggedCard?.id === app.id && 'is-being-dragged',
								isClosing && 'is-closing',
								isCollapsing && 'is-collapsing',
							)}
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
								onClick={(event) => {
									if (event.detail === 0) onOpen(event, app);
								}}
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

