import { ChangeEvent, KeyboardEvent, MouseEvent, ReactNode, useState } from 'react';
import { App } from '../../ui/App';
import { Button } from '../../ui/Button';
import { Cell } from '../../ui/Cell';
import { Text } from '../../ui/Fonts';
import { Header } from '../../ui/Header';
import { Icon } from '../../ui/Icon';
import { IconButton } from '../../ui/IconButton';
import { List, ListContainer } from '../../ui/List';
import { Nav } from '../../ui/Nav';
import { SearchBar, SearchBarButton } from '../../ui/SearchBar';
import { ScreenScaffold } from '../../ui/ScreenScaffold';
import { type Tab, Tabs } from '../../ui/Tabs';
import { Switch } from '../../ui/Switch';
import { View } from '../../ui/View';
import './view.scss';

type TopActionsVariant = 'icons' | 'tabs';
type BottomActionsVariant = 'buttons' | 'navigation' | 'search';
type SideButtonPosition = 'none' | 'left' | 'right';
type ControlTabs =
	| readonly [Tab, Tab]
	| readonly [Tab, Tab, Tab];

type InfoItem = {
	id: string;
	title: string;
	subtitle: string;
	icon: string;
};

type SelectionSettingProps = {
	label: string;
	description?: string;
	tabs: ControlTabs;
	value: string;
	onChange: (nextValue: string) => void;
};

type ToggleCellProps = {
	label: string;
	description?: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
};

const topTabs: readonly [Tab, Tab, Tab] = [
	{ id: 'overview', label: 'Обзор' },
	{ id: 'states', label: 'Состояния' },
	{ id: 'notes', label: 'Заметки' },
];

const topActionsVariantTabs: readonly [Tab, Tab] = [
	{ id: 'icons', label: 'Иконки' },
	{ id: 'tabs', label: 'Табы' },
];

const bottomActionsVariantTabs: readonly [Tab, Tab, Tab] = [
	{ id: 'buttons', label: 'Кнопки' },
	{ id: 'navigation', label: 'Навигация' },
	{ id: 'search', label: 'Поиск' },
];

const sideButtonTabs: readonly [Tab, Tab, Tab] = [
	{ id: 'left', label: 'Кнопка слева' },
	{ id: 'right', label: 'Кнопка справа' },
	{ id: 'none', label: 'Без кнопки' },
];

const topActionsVariantLabels: Record<TopActionsVariant, string> = {
	icons: 'Иконки',
	tabs: 'Табы',
};

const bottomActionsVariantLabels: Record<BottomActionsVariant, string> = {
	buttons: 'Кнопки',
	navigation: 'Навигация',
	search: 'Поиск',
};

const sideButtonLabels: Record<SideButtonPosition, string> = {
	none: 'без кнопки',
	left: 'кнопка слева',
	right: 'кнопка справа',
};

const noteItems: readonly InfoItem[] = [
	{
		id: 'pattern',
		title: 'Композиция экрана настраивается прямо в списке',
		subtitle:
			'Главный список управляет Header, TopActions и BottomActions, а вложенные секции появляются только по условию.',
		icon: 'done-all',
	},
	{
		id: 'controls',
		title: 'Для булевых значений используется Cell со Switch',
		subtitle:
			'Выбор между несколькими вариантами перенесён в Tabs, чтобы состояние считывалось быстрее.',
		icon: 'switches',
	},
	{
		id: 'preview',
		title: 'Превью экрана живёт рядом с настройками',
		subtitle:
			'Изменения сразу отражаются в Header, TopActions и BottomActions ниже по экрану.',
		icon: 'copy-outline',
	},
];

function InfoCell({ title, subtitle, icon }: Omit<InfoItem, 'id'>) {
	return (
		<Cell
			title={
				<Text variant="medium-18" color="primary">
					{title}
				</Text>
			}
			subtitle={
				<Text variant="regular-14" color="secondary">
					{subtitle}
				</Text>
			}
			leading={
				<div className="components-screen__cell-icon">
					<Icon
						name={icon}
						width={20}
						height={20}
						alt=""
						aria-hidden="true"
						colorToken="accent-primary"
					/>
				</div>
			}
		/>
	);
}

function SelectionSetting({
	label,
	description,
	tabs,
	value,
	onChange,
}: SelectionSettingProps) {
	return (
		<div className="components-screen__segmented-setting">
			<div className="components-screen__segmented-setting-copy">
				<Text as="p" variant="medium-16" color="primary">
					{label}
				</Text>
				{description ? (
					<Text as="p" variant="regular-14" color="secondary">
						{description}
					</Text>
				) : null}
			</div>
			<Tabs tabs={tabs} value={value} onChange={onChange} />
		</div>
	);
}

function ToggleCell({ label, description, checked, onChange }: ToggleCellProps) {
	const toggle = () => onChange(!checked);
	const stopPropagation = (
		event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>,
	) => {
		event.stopPropagation();
	};

	return (
		<Cell
			title={
				<Text as="p" variant="medium-16" color="primary">
					{label}
				</Text>
			}
			subtitle={
				description ? (
					<Text as="p" variant="regular-14" color="secondary">
						{description}
					</Text>
				) : undefined
			}
			trailing={
				<div
					className="components-screen__switch"
					onClick={stopPropagation}
					onKeyDown={stopPropagation}
				>
					<Switch checked={checked} onChange={() => toggle()} aria-label={label} />
				</div>
			}
			variant="primary"
			onClick={toggle}
		/>
	);
}

export default function ComponentsViewPage() {
	const [showHeader, setShowHeader] = useState(true);
	const [showTopActions, setShowTopActions] = useState(true);
	const [topActionsVariant, setTopActionsVariant] =
		useState<TopActionsVariant>('tabs');
	const [topTabsButtonPosition, setTopTabsButtonPosition] =
		useState<SideButtonPosition>('left');
	const [showBottomActions, setShowBottomActions] = useState(true);
	const [bottomActionsVariant, setBottomActionsVariant] =
		useState<BottomActionsVariant>('buttons');
	const [bottomSearchButtonPosition, setBottomSearchButtonPosition] =
		useState<SideButtonPosition>('right');
	const [activeTab, setActiveTab] = useState(topTabs[1].id);
	const [searchValue, setSearchValue] = useState('');

	const activeTabLabel = topTabs.find((tab) => tab.id === activeTab)?.label ?? topTabs[0].label;
	const topActionsSummary = showTopActions
		? topActionsVariant === 'tabs'
			? `${topActionsVariantLabels[topActionsVariant]}, ${sideButtonLabels[topTabsButtonPosition]}`
			: topActionsVariantLabels[topActionsVariant]
		: 'Скрыт';
	const bottomActionsSummary = showBottomActions
		? bottomActionsVariant === 'search'
			? `${bottomActionsVariantLabels[bottomActionsVariant]}, ${sideButtonLabels[bottomSearchButtonPosition]}`
			: bottomActionsVariantLabels[bottomActionsVariant]
		: 'Скрыт';

	const topTabsActionButton =
		topTabsButtonPosition === 'none' ? null : (
			<IconButton size={60} variant="primary" aria-label="Дополнительное действие">
				<Icon
					name={topTabsButtonPosition === 'left' ? 'search' : 'filter'}
					width={24}
					height={24}
					alt=""
					aria-hidden="true"
				/>
			</IconButton>
		);

	const searchSideButton =
		bottomSearchButtonPosition === 'none' ? null : (
			<SearchBarButton
				aria-label="Дополнительное действие поиска"
				title="Дополнительное действие поиска"
			>
				<Icon
					name={bottomSearchButtonPosition === 'left' ? 'filter' : 'add'}
					width={24}
					height={24}
					alt=""
					aria-hidden="true"
				/>
			</SearchBarButton>
		);

	const renderTopActions = (): ReactNode => {
		if (!showTopActions) {
			return undefined;
		}

		if (topActionsVariant === 'icons') {
			return (
				<div className="components-screen__top-icons">
					<IconButton size={60} variant="primary" aria-label="Поиск">
						<Icon name="search" width={24} height={24} alt="" aria-hidden="true" />
					</IconButton>
					<IconButton size={60} variant="secondary" aria-label="Фильтр">
						<Icon name="filter" width={24} height={24} alt="" aria-hidden="true" />
					</IconButton>
					<IconButton size={60} variant="accent" aria-label="Добавить">
						<Icon name="add" width={24} height={24} alt="" aria-hidden="true" />
					</IconButton>
				</div>
			);
		}

		return (
			<Tabs
				tabs={topTabs}
				value={activeTab}
				onChange={setActiveTab}
				button={topTabsActionButton ?? undefined}
				buttonPosition={
					topTabsButtonPosition === 'none' ? undefined : topTabsButtonPosition
				}
			/>
		);
	};

	const renderBottomActions = () => {
		if (!showBottomActions) {
			return null;
		}

		if (bottomActionsVariant === 'buttons') {
			return (
				<div className="components-screen__bottom-row">
					<Button size={52} variant="secondary">
						Отмена
					</Button>
					<Button size={52} variant="accent">
						Сохранить
					</Button>
				</div>
			);
		}

		if (bottomActionsVariant === 'navigation') {
			return (
				<Nav
					items={[
						{
							id: 'home',
							label: 'Главная',
							active: true,
							icon: <Icon name="apps" width={20} height={20} alt="" aria-hidden="true" />,
						},
						{
							id: 'chat',
							label: 'Чаты',
							icon: <Icon name="chat" width={20} height={20} alt="" aria-hidden="true" />,
						},
						{
							id: 'settings',
							label: 'Настройки',
							icon: (
								<Icon
									name="settings"
									width={20}
									height={20}
									alt=""
									aria-hidden="true"
								/>
							),
						},
					]}
				/>
			);
		}

		return (
			<SearchBar
				type="search"
				placeholder="Поиск по компоненту"
				value={searchValue}
				onChange={(event: ChangeEvent<HTMLInputElement>) => setSearchValue(event.target.value)}
				leftButton={bottomSearchButtonPosition === 'left' ? searchSideButton : undefined}
				rightButton={bottomSearchButtonPosition === 'right' ? searchSideButton : undefined}
				fieldRightButton={
					searchValue ? (
						<SearchBarButton
							aria-label="Очистить поиск"
							title="Очистить поиск"
							onClick={() => setSearchValue('')}
						>
							<Icon name="close" width={16} height={16} alt="" aria-hidden="true" />
						</SearchBarButton>
					) : undefined
				}
			/>
		);
	};

	const renderContent = () => {
		return (
			<>
				<List title="Компоненты">
					<ToggleCell
						label="Header"
						checked={showHeader}
						onChange={setShowHeader}
					/>
					<ToggleCell
						label="TopActions"
						checked={showTopActions}
						onChange={setShowTopActions}
					/>
					<ToggleCell
						label="BottomActions"
						checked={showBottomActions}
						onChange={setShowBottomActions}
					/>
				</List>

				{showTopActions ? (
					<List title="TopActions">
						<SelectionSetting
							label="Вариант"
							tabs={topActionsVariantTabs}
							value={topActionsVariant}
							onChange={(nextValue) => setTopActionsVariant(nextValue as TopActionsVariant)}
						/>
						{topActionsVariant === 'tabs' ? (
							<SelectionSetting
								label="Кнопка"
								tabs={sideButtonTabs}
								value={topTabsButtonPosition}
								onChange={(nextValue) =>
									setTopTabsButtonPosition(nextValue as SideButtonPosition)
								}
							/>
						) : null}
					</List>
				) : null}

				{showBottomActions ? (
					<List title="BottomActions">
						<SelectionSetting
							label="Вариант"
							tabs={bottomActionsVariantTabs}
							value={bottomActionsVariant}
							onChange={(nextValue) =>
								setBottomActionsVariant(nextValue as BottomActionsVariant)
							}
						/>
						{bottomActionsVariant === 'search' ? (
							<SelectionSetting
								label="Кнопка"
								tabs={sideButtonTabs}
								value={bottomSearchButtonPosition}
								onChange={(nextValue) =>
									setBottomSearchButtonPosition(nextValue as SideButtonPosition)
								}
							/>
						) : null}
					</List>
				) : null}

				<List title="Текущее состояние">
					<InfoCell
						title={`Header: ${showHeader ? 'Да' : 'Нет'}`}
						subtitle="Верхний header отображается независимо от остальных блоков."
						icon="apps"
					/>
					<InfoCell
						title={`TopActions: ${showTopActions ? 'Да' : 'Нет'}`}
						subtitle={topActionsSummary}
						icon="switches"
					/>
					<InfoCell
						title={`BottomActions: ${showBottomActions ? 'Да' : 'Нет'}`}
						subtitle={bottomActionsSummary}
						icon="arrow-bottom-top"
					/>
					{showTopActions && topActionsVariant === 'tabs' ? (
						<InfoCell
							title={`Активный таб: ${activeTabLabel}`}
							subtitle="Tabs на превью остаётся интерактивным и переключается по клику."
							icon="done-all"
						/>
					) : null}
				</List>

				<List title="Заметки">
					{noteItems.map((item) => (
						<InfoCell
							key={item.id}
							title={item.title}
							subtitle={item.subtitle}
							icon={item.icon}
						/>
					))}
				</List>
			</>
		);
	};

	return (
		<App>
			<ScreenScaffold
				header={showHeader ? <Header title="Компоненты" /> : undefined}
				topActions={renderTopActions()}
				bottomActions={
					showBottomActions ? (
						<div className="components-screen__bottom-actions-shell">
							{renderBottomActions()}
						</div>
					) : undefined
				}
			>
				<View>
					<ListContainer>{renderContent()}</ListContainer>
				</View>
			</ScreenScaffold>
		</App>
	);
}
