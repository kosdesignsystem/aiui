import { ReactNode } from 'react';
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
import './SegmentedTabs.scss';

export type SegmentedTab = TabItem;
type SegmentedTabsList = TabItemList<SegmentedTab>;

export type SegmentedTabsProps = {
	tabs: SegmentedTabsList;
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

export function SegmentedTabs({
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
}: SegmentedTabsProps) {
	const selectedTabId = resolveTabsValue(tabs, value);
	const { actionButton, isOnLeft } = resolveTabsAction({
		action,
		button,
		buttonPosition,
		variant,
		onButtonClick,
		defaultActionVariant: 'primary',
		defaultActionAriaLabel: 'Поиск',
	});

	const tabsList = (
		<div className="ui-segmented-tabs__list" role="tablist" aria-label={ariaLabel}>
			{tabs.map((tab) => {
				const isActive = tab.id === selectedTabId;
				const isDisabled = !interactive || tab.disabled;

				return (
					<button
						key={tab.id}
						type="button"
						role="tab"
						className={cn('ui-segmented-tabs__tab', isActive ? 'is-active' : '')}
						aria-selected={isActive}
						tabIndex={!isDisabled && isActive ? 0 : -1}
						disabled={isDisabled}
						onClick={() => {
							if (!isDisabled && tab.id !== selectedTabId) {
								onChange(tab.id);
							}
						}}
					>
						<Text variant="medium-18" color={isActive ? 'primary' : 'secondary'}>
							{tab.label}
						</Text>
					</button>
				);
			})}
		</div>
	);

	return (
		<section className={cn('ui-segmented-tabs', className)}>
			{actionButton && isOnLeft ? actionButton : null}
			{tabsList}
			{actionButton && !isOnLeft ? actionButton : null}
		</section>
	);
}
