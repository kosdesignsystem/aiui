import { ReactNode, WheelEvent, useRef } from 'react';
import { Text } from './Fonts';
import { cn } from './lib/cn';
import {
	resolveTabsAction,
	resolveTabsValue,
	type LegacyTabsLayout,
	type TabItem,
	type TabItemList,
	type TabsActionConfig,
	type TabsActionPosition,
} from './lib/tabs';
import './Tabs.scss';

export type Tab = TabItem;
type TabsList = TabItemList<Tab>;

export type TabsProps = {
	tabs: TabsList;
	value: string;
	onChange: (tabId: string) => void;
	interactive?: boolean;
	ariaLabel?: string;
	className?: string;
	action?: TabsActionConfig;
	button?: ReactNode;
	buttonPosition?: TabsActionPosition;
	variant?: LegacyTabsLayout;
	onButtonClick?: () => void;
};

export function Tabs({
	tabs,
	value,
	onChange,
	interactive = true,
	ariaLabel = 'Переключение вкладок',
	className,
	action,
	button,
	buttonPosition,
	variant = 'tabs-only',
	onButtonClick,
}: TabsProps) {
	const viewportRef = useRef<HTMLDivElement | null>(null);
	const selectedTabId = resolveTabsValue(tabs, value);
	const { actionButton, isOnLeft } = resolveTabsAction({
		action,
		button,
		buttonPosition,
		variant,
		onButtonClick,
		defaultActionVariant: 'accent',
		defaultActionBackground: 'content-background',
		defaultActionAriaLabel: 'Поиск',
	});

	const handleViewportWheel = (event: WheelEvent<HTMLDivElement>) => {
		const viewport = viewportRef.current;

		if (!viewport || viewport.scrollWidth <= viewport.clientWidth) {
			return;
		}

		if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
			return;
		}

		viewport.scrollLeft += event.deltaY;
		event.preventDefault();
	};

	const tabsList = (
		<div className="ui-tabs__list">
			<div ref={viewportRef} className="ui-tabs__viewport" onWheel={handleViewportWheel}>
				<div className="ui-tabs__track" role="tablist" aria-label={ariaLabel}>
					{tabs.map((tab) => {
						const isActive = tab.id === selectedTabId;
						const isDisabled = !interactive || tab.disabled;

						return (
							<button
								key={tab.id}
								type="button"
								role="tab"
								className={cn('ui-tabs__tab', isActive ? 'is-active' : '')}
								aria-selected={isActive}
								tabIndex={!isDisabled && isActive ? 0 : -1}
								disabled={isDisabled}
								onClick={
									!isDisabled
										? () => {
												if (tab.id !== selectedTabId) {
													onChange(tab.id);
												}
											}
										: undefined
								}
							>
								<Text variant="regular-18" color="primary">
									<span className="ui-tabs__tab-label">{tab.label}</span>
								</Text>
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);

	return (
		<section className={cn('ui-tabs', className)}>
			{actionButton && isOnLeft ? actionButton : null}
			{tabsList}
			{actionButton && !isOnLeft ? actionButton : null}
		</section>
	);
}
