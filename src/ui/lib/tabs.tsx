import type { ReactNode } from 'react';
import { Icon, type IconName } from '../Icon';
import { IconButton } from '../IconButton';
import type { ActionSize, ActionVariant } from './action';
import type { CssToken } from './styles';

export type TabItem = {
	id: string;
	label: string;
	disabled?: boolean;
};

export type TabItemList<T extends TabItem = TabItem> =
	| readonly [T]
	| readonly [T, T]
	| readonly [T, T, T];

export type TabsActionPosition = 'left' | 'right';
export type LegacyTabsLayout = 'tabs-only' | 'button-left' | 'button-right';

export type TabsActionConfig = {
	element?: ReactNode;
	position?: TabsActionPosition;
	onClick?: () => void;
	ariaLabel?: string;
	title?: string;
	icon?: ReactNode;
	iconName?: IconName;
	size?: ActionSize;
	variant?: ActionVariant;
	background?: CssToken;
};

type ResolveTabsActionOptions = {
	action?: TabsActionConfig;
	button?: ReactNode;
	buttonPosition?: TabsActionPosition;
	variant?: LegacyTabsLayout;
	onButtonClick?: () => void;
	defaultActionVariant?: ActionVariant;
	defaultActionBackground?: CssToken;
	defaultActionAriaLabel?: string;
	defaultActionIconName?: IconName;
};

export function resolveTabsValue<T extends TabItem>(tabs: readonly T[], value: string) {
	return tabs.some((tab) => tab.id === value) ? value : tabs[0]?.id ?? value;
}

export function resolveTabsAction({
	action,
	button,
	buttonPosition,
	variant = 'tabs-only',
	onButtonClick,
	defaultActionVariant = 'primary',
	defaultActionBackground,
	defaultActionAriaLabel = 'Действие',
	defaultActionIconName = 'search',
}: ResolveTabsActionOptions) {
	const legacyPosition =
		variant === 'button-left' ? 'left' : variant === 'button-right' ? 'right' : undefined;
	const hasLegacyAction = button != null || variant !== 'tabs-only';
	const resolvedAction =
		action ??
		(hasLegacyAction
			? {
					element: button,
					position: buttonPosition ?? legacyPosition,
					onClick: onButtonClick,
				}
			: undefined);

	if (!resolvedAction) {
		return {
			actionButton: null,
			isOnLeft: false,
		};
	}

	const position = resolvedAction.position ?? legacyPosition ?? 'right';

	if (resolvedAction.element) {
		return {
			actionButton: resolvedAction.element,
			isOnLeft: position === 'left',
		};
	}

	const icon = resolvedAction.icon ?? (
		<Icon
			name={resolvedAction.iconName ?? defaultActionIconName}
			alt=""
			width={24}
			height={24}
			aria-hidden="true"
		/>
	);

	return {
		actionButton: (
			<IconButton
				size={resolvedAction.size ?? 60}
				variant={resolvedAction.variant ?? defaultActionVariant}
				background={resolvedAction.background ?? defaultActionBackground}
				aria-label={resolvedAction.ariaLabel ?? defaultActionAriaLabel}
				title={resolvedAction.title}
				onClick={resolvedAction.onClick}
			>
				{icon}
			</IconButton>
		),
		isOnLeft: position === 'left',
	};
}
