import {
	ReactNode,
	useEffect,
	useId,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';
import { Text } from './Fonts';
import { Icon } from './Icon';
import { IconButton } from './IconButton';
import './Tabs.scss';

export type Tab = {
	id: string;
	label: string;
};

type TabsList =
	| readonly [Tab]
	| readonly [Tab, Tab]
	| readonly [Tab, Tab, Tab];

export type TabsProps = {
	tabs: TabsList;
	value: string;
	onChange: (tabId: string) => void;
	interactive?: boolean;
	button?: ReactNode;
	buttonPosition?: 'left' | 'right';
	variant?: 'tabs-only' | 'button-left' | 'button-right';
	onButtonClick?: () => void;
};

function areEqualIds(left: readonly string[], right: readonly string[]) {
	if (left.length !== right.length) {
		return false;
	}

	return left.every((value, index) => value === right[index]);
}

export function Tabs({
	tabs,
	value,
	onChange,
	interactive = true,
	button,
	buttonPosition,
	variant = 'tabs-only',
	onButtonClick,
}: TabsProps) {
	const listRef = useRef<HTMLDivElement | null>(null);
	const viewportRef = useRef<HTMLDivElement | null>(null);
	const trackRef = useRef<HTMLDivElement | null>(null);
	const tabRefs = useRef<Partial<Record<string, HTMLButtonElement | null>>>({});
	const overflowMenuId = useId();
	const [hasOverflow, setHasOverflow] = useState(false);
	const [hiddenTabIds, setHiddenTabIds] = useState<string[]>([]);
	const [isOverflowMenuOpen, setIsOverflowMenuOpen] = useState(false);
	const hasCustomButton = button != null;
	const hasLegacyButton = variant !== 'tabs-only';
	const customButtonOnLeft =
		(buttonPosition ?? (variant === 'button-left' ? 'left' : 'right')) === 'left';
	const buttonOnLeft = hasCustomButton ? customButtonOnLeft : variant === 'button-left';
	const selectedTabId = tabs.some((tab) => tab.id === value) ? value : tabs[0].id;
	const hiddenTabIdsSet = new Set(hiddenTabIds);
	const hiddenTabs = tabs.filter((tab) => hiddenTabIdsSet.has(tab.id));
	const isMoreButtonActive =
		isOverflowMenuOpen || hiddenTabIdsSet.has(selectedTabId);

	useLayoutEffect(() => {
		const measureOverflow = () => {
			const viewport = viewportRef.current;
			const track = trackRef.current;

			if (!viewport || !track) {
				return;
			}

			const nextHasOverflow = track.scrollWidth - viewport.clientWidth > 1;
			const nextHiddenTabIds = nextHasOverflow
				? tabs.flatMap((tab) => {
						const element = tabRefs.current[tab.id];

						if (!element) {
							return [];
						}

						const rightEdge = element.offsetLeft + element.offsetWidth;
						return rightEdge - viewport.clientWidth > 1 ? [tab.id] : [];
					})
				: [];

			setHasOverflow((current) =>
				current === nextHasOverflow ? current : nextHasOverflow,
			);
			setHiddenTabIds((current) =>
				areEqualIds(current, nextHiddenTabIds) ? current : nextHiddenTabIds,
			);

			if (!nextHasOverflow) {
				setIsOverflowMenuOpen(false);
			}
		};

		measureOverflow();

		if (typeof ResizeObserver === 'undefined') {
			return;
		}

		const observer = new ResizeObserver(() => {
			measureOverflow();
		});

		if (listRef.current) {
			observer.observe(listRef.current);
		}

		if (trackRef.current) {
			observer.observe(trackRef.current);
		}

		tabs.forEach((tab) => {
			const element = tabRefs.current[tab.id];

			if (element) {
				observer.observe(element);
			}
		});

		return () => {
			observer.disconnect();
		};
	}, [hasOverflow, tabs]);

	useEffect(() => {
		if (!interactive && isOverflowMenuOpen) {
			setIsOverflowMenuOpen(false);
			return;
		}

		if (!interactive || !isOverflowMenuOpen) {
			return;
		}

		const handlePointerDown = (event: PointerEvent) => {
			const target = event.target;

			if (!(target instanceof Node)) {
				return;
			}

			if (!listRef.current?.contains(target)) {
				setIsOverflowMenuOpen(false);
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsOverflowMenuOpen(false);
			}
		};

		document.addEventListener('pointerdown', handlePointerDown);
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('pointerdown', handlePointerDown);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [interactive, isOverflowMenuOpen]);

	const tabsList = (
		<div
			ref={listRef}
			className={`ui-tabs__list${hasOverflow ? ' has-overflow' : ''}`}
		>
			<div className="ui-tabs__viewport" ref={viewportRef}>
				<div
					ref={trackRef}
					className="ui-tabs__track"
					role="tablist"
					aria-label="Фильтр звонков"
				>
					{tabs.map((tab) => {
						const isActive = tab.id === selectedTabId;

						return (
							<button
								key={tab.id}
								ref={(element) => {
									tabRefs.current[tab.id] = element;
								}}
								type="button"
								role="tab"
								className={`ui-tabs__tab${isActive ? ' is-active' : ''}`}
								aria-selected={isActive}
								tabIndex={interactive && isActive ? 0 : -1}
								disabled={!interactive}
								onClick={
									interactive
										? () => {
												if (tab.id !== selectedTabId) {
													onChange(tab.id);
												}
											}
										: undefined
								}
							>
								<Text variant="medium-18" color={isActive ? 'primary' : 'secondary'}>
									<span className="ui-tabs__tab-label">{tab.label}</span>
								</Text>
							</button>
						);
					})}
				</div>
			</div>
			{hasOverflow ? (
				<div className="ui-tabs__overflow">
					<button
						type="button"
						className={`ui-tabs__more-button${isMoreButtonActive ? ' is-active' : ''}`}
						aria-label="Ещё вкладки"
						aria-haspopup="menu"
						aria-expanded={interactive && isOverflowMenuOpen}
						aria-controls={overflowMenuId}
						disabled={!interactive}
						onClick={
							interactive
								? () => {
										setIsOverflowMenuOpen((current) => !current);
									}
								: undefined
						}
					>
						<Icon
							name="more-horizontal"
							width={24}
							height={24}
							alt=""
							aria-hidden="true"
						/>
					</button>
					{interactive && isOverflowMenuOpen && hiddenTabs.length > 0 ? (
						<div
							id={overflowMenuId}
							role="menu"
							className="ui-tabs__menu"
							aria-label="Скрытые вкладки"
						>
							{hiddenTabs.map((tab) => {
								const isActive = tab.id === selectedTabId;

								return (
									<button
										key={tab.id}
										type="button"
										role="menuitemradio"
										aria-checked={isActive}
										className={`ui-tabs__menu-item${isActive ? ' is-active' : ''}`}
										onClick={() => {
											setIsOverflowMenuOpen(false);

											if (tab.id !== selectedTabId) {
												onChange(tab.id);
											}
										}}
									>
										<Text
											variant="medium-16"
											color={isActive ? 'primary' : 'secondary'}
										>
											{tab.label}
										</Text>
									</button>
								);
							})}
						</div>
					) : null}
				</div>
			) : null}
		</div>
	);

	const actionButton = hasCustomButton
		? button
		: hasLegacyButton
			? (
				<IconButton
					size={60}
					aria-label="Поиск"
					background={'content-background'}
					onClick={() => {
						onButtonClick?.();
					}}
				>
					<Icon name="search" alt="" width={24} height={24} />
				</IconButton>
			)
			: null;

	return (
		<section className="ui-tabs">
			{actionButton && buttonOnLeft ? actionButton : null}
			{tabsList}
			{actionButton && !buttonOnLeft ? actionButton : null}
		</section>
	);
}
