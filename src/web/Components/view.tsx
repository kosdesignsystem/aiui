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

function ToggleCell({ label, description, checked, onChange }: ToggleCellProps) {
	const toggle = () => onChange(!checked);
	const stopPropagation = (event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => {
		event.stopPropagation();
	};

	return (
		<Cell
			title={
				<Text as="p" variant="regular-18" color="primary">
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
			onClick={toggle}
		/>
	);
}

export default function ComponentsViewPage() {
	const [showHeader, setShowHeader] = useState(true);
	const [showTopActions, setShowTopActions] = useState(true);
	const [topActionsVariant, setTopActionsVariant] = useState<TopActionsVariant>('tabs');
	const [topTabsButtonPosition, setTopTabsButtonPosition] = useState<SideButtonPosition>('left');
	const [showBottomActions, setShowBottomActions] = useState(true);
	const [bottomActionsVariant, setBottomActionsVariant] =
		useState<BottomActionsVariant>('buttons');
	const [bottomSearchButtonPosition, setBottomSearchButtonPosition] =
		useState<SideButtonPosition>('right');
	const [activeTab, setActiveTab] = useState(topTabs[1].id);
	const [searchValue, setSearchValue] = useState('');

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
							icon: (
								<Icon
									name="apps"
									width={20}
									height={20}
									alt=""
									aria-hidden="true"
								/>
							),
						},
						{
							id: 'chat',
							label: 'Чаты',
							icon: (
								<Icon
									name="chat"
									width={20}
									height={20}
									alt=""
									aria-hidden="true"
								/>
							),
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
				onChange={(event: ChangeEvent<HTMLInputElement>) =>
					setSearchValue(event.target.value)
				}
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
					<ToggleCell label="Header" checked={showHeader} onChange={setShowHeader} />
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
						<Tabs
							tabs={topActionsVariantTabs}
							value={topActionsVariant}
							onChange={(nextValue) =>
								setTopActionsVariant(nextValue as TopActionsVariant)
							}
						/>
						{topActionsVariant === 'tabs' ? (
							<Tabs
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
						<Tabs
							tabs={bottomActionsVariantTabs}
							value={bottomActionsVariant}
							onChange={(nextValue) =>
								setBottomActionsVariant(nextValue as BottomActionsVariant)
							}
						/>
						{bottomActionsVariant === 'search' ? (
							<Tabs
								tabs={sideButtonTabs}
								value={bottomSearchButtonPosition}
								onChange={(nextValue) =>
									setBottomSearchButtonPosition(nextValue as SideButtonPosition)
								}
							/>
						) : null}
					</List>
				) : null}
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
