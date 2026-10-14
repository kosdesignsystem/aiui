import { ReactNode, useState } from 'react';
import { Button } from '../../ui/Button';
import { Icon } from '../../ui/Icon';
import { IconButton } from '../../ui/IconButton';
import { Nav } from '../../ui/Nav';
import { Search } from '../../ui/Search';
import { Tabs } from '../../ui/Tabs';
import { FlowPage, FlowPageList } from '../FlowPage';
import './view.scss';
import {
	type BottomActionsVariant,
	type SideButtonPosition,
	type TopActionsVariant,
	bottomActionsVariantTabs,
	componentOverviewTabs,
	sideButtonTabs,
	topActionIcons,
	topActionsVariantTabs,
	TOP_ICONS_MAX,
	TOP_ICONS_MIN,
} from './model';
import {
	buildPromptSpec,
	ComponentSection,
	InputCell,
	ToggleCell,
} from './shared';

export default function ComponentsViewPage() {
	const [showHeader, setShowHeader] = useState(true);
	const [showTopActions, setShowTopActions] = useState(true);
	const [topActionsVariant, setTopActionsVariant] = useState<TopActionsVariant>('tabs');
	const [topTabsButtonPosition, setTopTabsButtonPosition] = useState<SideButtonPosition>('left');
	const [topIconsCount, setTopIconsCount] = useState(3);
	const [showBottomActions, setShowBottomActions] = useState(true);
	const [bottomActionsVariant, setBottomActionsVariant] =
		useState<BottomActionsVariant>('buttons');
	const [bottomSearchButtonPosition, setBottomSearchButtonPosition] =
		useState<SideButtonPosition>('right');
	const [activeTab, setActiveTab] = useState(componentOverviewTabs[1].id);
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
			<IconButton
				size={60}
				variant="primary"
				aria-label="Дополнительное действие поиска"
			>
				<Icon
					name={bottomSearchButtonPosition === 'left' ? 'filter' : 'add'}
					width={24}
					height={24}
					alt=""
					aria-hidden="true"
				/>
			</IconButton>
		);

	const handleTopIconsCountChange = (nextValue: string) => {
		const parsedValue = Number(nextValue);

		if (Number.isNaN(parsedValue)) {
			return;
		}

		setTopIconsCount(
			Math.min(TOP_ICONS_MAX, Math.max(TOP_ICONS_MIN, Math.trunc(parsedValue))),
		);
	};

	const renderTopActions = (): ReactNode => {
		if (!showTopActions) {
			return undefined;
		}

		if (topActionsVariant === 'icons') {
			return (
				<div className="components-screen__top-icons">
					{Array.from({ length: topIconsCount }, (_, index) => {
						const icon = topActionIcons[index % topActionIcons.length];

						return (
							<IconButton
								key={`${icon.name}-${index}`}
								size={60}
								variant="primary"
								aria-label={icon.label}
							>
								<Icon
									name={icon.name}
									width={24}
									height={24}
									alt=""
									aria-hidden="true"
								/>
							</IconButton>
						);
					})}
				</div>
			);
		}

		return (
			<div className="components-screen__top-actions-shell">
				<Tabs
					tabs={componentOverviewTabs}
					value={activeTab}
					onChange={setActiveTab}
					button={topTabsActionButton ?? undefined}
					buttonPosition={
						topTabsButtonPosition === 'none' ? undefined : topTabsButtonPosition
					}
				/>
			</div>
		);
	};

	const renderBottomActions = () => {
		if (!showBottomActions) {
			return null;
		}

		if (bottomActionsVariant === 'buttons') {
			return (
				<div className="components-screen__bottom-row">
					<Button size={60} variant="secondary">
						Отмена
					</Button>
					<Button size={60} variant="accent">
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
			<Search
				type="search"
				placeholder="Поиск по компоненту"
				value={searchValue}
				onChange={(event) => setSearchValue(event.target.value)}
				before={bottomSearchButtonPosition === 'left' ? searchSideButton : undefined}
				after={bottomSearchButtonPosition === 'right' ? searchSideButton : undefined}
				inputTrailing={
						searchValue ? (
							<IconButton
								size={32}
								variant="primary"
								aria-label="Очистить поиск"
								onClick={() => setSearchValue('')}
							>
								<Icon name="close" width={16} height={16} alt="" aria-hidden="true" />
							</IconButton>
						) : undefined
					}
				/>
		);
	};

	const renderContent = () => {
		return (
			<>
				<ComponentSection
					title="ScreenScaffold"
					copyText={buildPromptSpec('ScreenScaffold', {
						header: showHeader,
						topActions: showTopActions ? topActionsVariant : 'none',
						topActionsButtonPosition:
							showTopActions && topActionsVariant === 'tabs'
								? topTabsButtonPosition
								: undefined,
						topIconsCount:
							showTopActions && topActionsVariant === 'icons'
								? topIconsCount
								: undefined,
						bottomActions: showBottomActions ? bottomActionsVariant : 'none',
						bottomActionsButtonPosition:
							showBottomActions && bottomActionsVariant === 'search'
								? bottomSearchButtonPosition
								: undefined,
					})}
					description="Композиция экрана на базе ScreenScaffold, Header и action-блоков."
				>
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
				</ComponentSection>

				{showTopActions ? (
					<ComponentSection
						title="TopActions"
						copyText={buildPromptSpec('TopActions', {
							variant: topActionsVariant,
							buttonPosition:
								topActionsVariant === 'tabs' ? topTabsButtonPosition : undefined,
							iconsCount:
								topActionsVariant === 'icons' ? topIconsCount : undefined,
						})}
						description="Верхний sticky-блок с вкладками или группой icon buttons."
					>
						<Tabs
							tabs={topActionsVariantTabs}
							value={topActionsVariant}
							onChange={(nextValue) =>
								setTopActionsVariant(nextValue as TopActionsVariant)
							}
						/>
						{topActionsVariant === 'icons' ? (
							<InputCell
								label="Количество иконок"
								description={`От ${TOP_ICONS_MIN} до ${TOP_ICONS_MAX}`}
								type="number"
								min={TOP_ICONS_MIN}
								max={TOP_ICONS_MAX}
								inputMode="numeric"
								value={topIconsCount}
								onChange={handleTopIconsCountChange}
							/>
						) : null}
					</ComponentSection>
				) : null}
				{showTopActions && topActionsVariant === 'tabs' ? (
					<ComponentSection
						title="TopActions Button"
						copyText={buildPromptSpec('TopActionsButton', {
							position: topTabsButtonPosition,
						})}
						description="Положение дополнительной кнопки внутри блока Tabs."
					>
						<Tabs
							tabs={sideButtonTabs}
							value={topTabsButtonPosition}
							onChange={(nextValue) =>
								setTopTabsButtonPosition(nextValue as SideButtonPosition)
							}
						/>
					</ComponentSection>
				) : null}

				{showBottomActions ? (
					<ComponentSection
						title="BottomActions"
						copyText={buildPromptSpec('BottomActions', {
							variant: bottomActionsVariant,
							buttonPosition:
								bottomActionsVariant === 'search'
									? bottomSearchButtonPosition
									: undefined,
						})}
						description="Нижний action-блок: кнопки, навигация или поиск."
					>
						<Tabs
							tabs={bottomActionsVariantTabs}
							value={bottomActionsVariant}
							onChange={(nextValue) =>
								setBottomActionsVariant(nextValue as BottomActionsVariant)
							}
						/>
					</ComponentSection>
				) : null}
				{showBottomActions && bottomActionsVariant === 'search' ? (
					<ComponentSection
						title="Search Side Action"
						copyText={buildPromptSpec('SearchSideAction', {
							position: bottomSearchButtonPosition,
						})}
						description="Расположение иконочной кнопки рядом с поиском."
					>
						<Tabs
							tabs={sideButtonTabs}
							value={bottomSearchButtonPosition}
							onChange={(nextValue) =>
								setBottomSearchButtonPosition(nextValue as SideButtonPosition)
							}
						/>
					</ComponentSection>
				) : null}
			</>
		);
	};

	return (
		<FlowPage
			title={showHeader ? 'Компоненты' : undefined}
			topActions={renderTopActions()}
			bottomActions={
				showBottomActions ? (
					<div className="components-screen__bottom-actions-shell">
						{renderBottomActions()}
					</div>
				) : undefined
			}
		>
			<FlowPageList>{renderContent()}</FlowPageList>
		</FlowPage>
	);
}
