import { ReactNode } from 'react';
import { Text } from './Fonts';
import { Icon } from './Icon';
import { IconButton } from './IconButton';
import './SegmentedTabs.scss';

export type SegmentedTab = {
	id: string;
	label: string;
};

type SegmentedTabsList =
	| readonly [SegmentedTab]
	| readonly [SegmentedTab, SegmentedTab]
	| readonly [SegmentedTab, SegmentedTab, SegmentedTab];

export type SegmentedTabsProps = {
	tabs: SegmentedTabsList;
	value: string;
	onChange: (tabId: string) => void;
	button?: ReactNode;
	buttonPosition?: 'left' | 'right';
	variant?: 'tabs-only' | 'button-left' | 'button-right';
	onButtonClick?: () => void;
};

export function SegmentedTabs({
	tabs,
	value,
	onChange,
	button,
	buttonPosition,
	variant = 'tabs-only',
	onButtonClick,
}: SegmentedTabsProps) {
	const hasCustomButton = button != null;
	const hasLegacyButton = variant !== 'tabs-only';
	const customButtonOnLeft =
		(buttonPosition ?? (variant === 'button-left' ? 'left' : 'right')) === 'left';
	const buttonOnLeft = hasCustomButton ? customButtonOnLeft : variant === 'button-left';
	const selectedTabId = tabs.some((tab) => tab.id === value) ? value : tabs[0].id;

	const tabsList = (
		<div className="ui-segmented-tabs__list" role="tablist" aria-label="Фильтр звонков">
			{tabs.map((tab) => {
				const isActive = tab.id === selectedTabId;

				return (
					<button
						key={tab.id}
						type="button"
						role="tab"
						className={`ui-segmented-tabs__tab${isActive ? ' is-active' : ''}`}
						aria-selected={isActive}
						tabIndex={isActive ? 0 : -1}
						onClick={() => {
							if (tab.id !== selectedTabId) {
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
		<section className="ui-segmented-tabs">
			{actionButton && buttonOnLeft ? actionButton : null}
			{tabsList}
			{actionButton && !buttonOnLeft ? actionButton : null}
		</section>
	);
}
