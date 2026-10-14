import type { IconName } from '../../ui/Icon';
import type { Tab } from '../../ui/Tabs';

export type TopActionsVariant = 'icons' | 'tabs';
export type BottomActionsVariant = 'buttons' | 'navigation' | 'search';
export type SideButtonPosition = 'none' | 'left' | 'right';

export const componentOverviewTabs: readonly [Tab, Tab] = [
	{ id: 'overview', label: 'Обзор' },
	{ id: 'states', label: 'Состояния' },
];

export const topActionsVariantTabs: readonly [Tab, Tab] = [
	{ id: 'icons', label: 'Иконки' },
	{ id: 'tabs', label: 'Табы' },
];

export const bottomActionsVariantTabs: readonly [Tab, Tab, Tab] = [
	{ id: 'buttons', label: 'Кнопки' },
	{ id: 'navigation', label: 'Навигация' },
	{ id: 'search', label: 'Поиск' },
];

export const sideButtonTabs: readonly [Tab, Tab, Tab] = [
	{ id: 'left', label: 'Слева' },
	{ id: 'right', label: 'Справа' },
	{ id: 'none', label: 'Без кнопки' },
];

export const topActionIcons: ReadonlyArray<{ name: IconName; label: string }> = [
	{ name: 'search', label: 'Поиск' },
	{ name: 'filter', label: 'Фильтр' },
	{ name: 'add', label: 'Добавить' },
];

export const TOP_ICONS_MIN = 1;
export const TOP_ICONS_MAX = 4;
