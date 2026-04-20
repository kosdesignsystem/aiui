import { ReactNode, WheelEvent, useRef } from 'react';
import { Text } from './Fonts';
import { Icon } from './Icon';
import { IconButton } from './IconButton';
import './Tabs.scss';

export type Tab = {
	id: string;
	label: string;
};

type TabsList =
	// Prefer 2 tabs. Use 3 only when labels are short enough to avoid truncation.
	readonly [Tab] | readonly [Tab, Tab] | readonly [Tab, Tab, Tab];

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
	const viewportRef = useRef<HTMLDivElement | null>(null);
	const hasCustomButton = button != null;
	const hasLegacyButton = variant !== 'tabs-only';
	const customButtonOnLeft =
		(buttonPosition ?? (variant === 'button-left' ? 'left' : 'right')) === 'left';
	const buttonOnLeft = hasCustomButton ? customButtonOnLeft : variant === 'button-left';
	const selectedTabId = tabs.some((tab) => tab.id === value) ? value : tabs[0].id;

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
				<div className="ui-tabs__track" role="tablist" aria-label="Фильтр звонков">
					{tabs.map((tab) => {
						const isActive = tab.id === selectedTabId;

						return (
							<button
								key={tab.id}
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

	const actionButton = hasCustomButton ? (
		button
	) : hasLegacyButton ? (
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
	) : null;

	return (
		<section className="ui-tabs">
			{actionButton && buttonOnLeft ? actionButton : null}
			{tabsList}
			{actionButton && !buttonOnLeft ? actionButton : null}
		</section>
	);
}
