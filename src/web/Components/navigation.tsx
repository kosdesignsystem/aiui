import { useState } from 'react';
import { Text } from '../../ui/Fonts';
import { Header } from '../../ui/Header';
import { Icon } from '../../ui/Icon';
import { IconButton } from '../../ui/IconButton';
import { Nav } from '../../ui/Nav';
import { SegmentedTabs } from '../../ui/SegmentedTabs';
import { Tabs } from '../../ui/Tabs';
import { FlowPage, FlowPageList } from '../FlowPage';
import {
	buildPromptSpec,
	ComponentSection,
	PreviewSurface,
	SelectCell,
	ToggleCell,
	type SelectOption,
} from './shared';

type ActionPosition = 'none' | 'left' | 'right';
type TabValue = 'feed' | 'files' | 'settings';
type NavValue = 'home' | 'chat' | 'settings';

const actionPositionOptions: readonly SelectOption<ActionPosition>[] = [
	{ value: 'none', label: 'None' },
	{ value: 'left', label: 'Left' },
	{ value: 'right', label: 'Right' },
];

const tabValueOptions: readonly SelectOption<TabValue>[] = [
	{ value: 'feed', label: 'Feed' },
	{ value: 'files', label: 'Files' },
	{ value: 'settings', label: 'Settings' },
];

const navValueOptions: readonly SelectOption<NavValue>[] = [
	{ value: 'home', label: 'Home' },
	{ value: 'chat', label: 'Chat' },
	{ value: 'settings', label: 'Settings' },
];

export default function ComponentsNavigationPage() {
	const [headerAction, setHeaderAction] = useState(true);
	const [headerMeta, setHeaderMeta] = useState(true);
	const [headerLongTitle, setHeaderLongTitle] = useState(false);

	const [tabsValue, setTabsValue] = useState<TabValue>('feed');
	const [tabsActionPosition, setTabsActionPosition] = useState<ActionPosition>('right');
	const [tabsInteractive, setTabsInteractive] = useState(true);
	const [tabsDisableLast, setTabsDisableLast] = useState(false);

	const [segmentedValue, setSegmentedValue] = useState<TabValue>('files');
	const [segmentedActionPosition, setSegmentedActionPosition] =
		useState<ActionPosition>('none');
	const [segmentedInteractive, setSegmentedInteractive] = useState(true);
	const [segmentedDisableLast, setSegmentedDisableLast] = useState(false);

	const [navValue, setNavValue] = useState<NavValue>('home');
	const [navLabels, setNavLabels] = useState(true);
	const [navDisableLast, setNavDisableLast] = useState(false);

	const tabsItems = [
		{ id: 'feed', label: 'Лента' },
		{ id: 'files', label: 'Файлы' },
		{ id: 'settings', label: 'Настройки', disabled: tabsDisableLast },
	] as const;

	const segmentedItems = [
		{ id: 'feed', label: 'Лента' },
		{ id: 'files', label: 'Проекты' },
		{ id: 'settings', label: 'Настройки', disabled: segmentedDisableLast },
	] as const;

	const tabsActionButton =
		tabsActionPosition === 'none' ? undefined : (
			<IconButton size={60} variant="primary" aria-label="Поиск">
				<Icon name="search" width={24} height={24} alt="" aria-hidden="true" />
			</IconButton>
		);

	const segmentedActionButton =
		segmentedActionPosition === 'none' ? undefined : (
			<IconButton size={60} variant="primary" aria-label="Фильтр">
				<Icon name="filter" width={24} height={24} alt="" aria-hidden="true" />
			</IconButton>
		);

	return (
		<FlowPage title="Navigation">
			<FlowPageList>
				<ComponentSection
					title="Header"
					copyText={buildPromptSpec('Header', {
						title: headerLongTitle ? 'Мои последние проекты' : 'Проекты',
						action: headerAction,
						meta: headerMeta,
					})}
					description="Крупный заголовок экрана с дополнительным action и метаданными."
				>
					<ToggleCell
						label="Action button"
						checked={headerAction}
						onChange={setHeaderAction}
					/>
					<ToggleCell label="Meta" checked={headerMeta} onChange={setHeaderMeta} />
					<ToggleCell
						label="Long title"
						checked={headerLongTitle}
						onChange={setHeaderLongTitle}
					/>

					<PreviewSurface className="components-catalog__preview-header">
						<Header
							title={headerLongTitle ? 'Мои последние проекты' : 'Проекты'}
							action={
								headerAction ? (
									<IconButton size={44} variant="secondary" aria-label="Поиск">
										<Icon
											name="search"
											width={20}
											height={20}
											alt=""
											aria-hidden="true"
										/>
									</IconButton>
								) : undefined
							}
							meta={
								headerMeta ? (
									<Text as="p" variant="regular-14" color="secondary">
										8 элементов, 2 в работе
									</Text>
								) : undefined
							}
						/>
					</PreviewSurface>
				</ComponentSection>

				<ComponentSection
					title="Tabs"
					copyText={buildPromptSpec('Tabs', {
						value: tabsValue,
						actionPosition: tabsActionPosition,
						interactive: tabsInteractive,
						disabledLast: tabsDisableLast,
					})}
					description="Линейные вкладки для верхней навигации и фильтров."
				>
					<SelectCell
						label="Active tab"
						value={tabsValue}
						options={tabValueOptions}
						onChange={setTabsValue}
					/>
					<SelectCell
						label="Action button"
						value={tabsActionPosition}
						options={actionPositionOptions}
						onChange={setTabsActionPosition}
					/>
					<ToggleCell
						label="Interactive"
						checked={tabsInteractive}
						onChange={setTabsInteractive}
					/>
					<ToggleCell
						label="Disable last tab"
						checked={tabsDisableLast}
						onChange={setTabsDisableLast}
					/>

					<PreviewSurface stack>
						<Tabs
							tabs={tabsItems}
							value={tabsValue}
							onChange={(nextValue) => setTabsValue(nextValue as TabValue)}
							interactive={tabsInteractive}
							button={tabsActionButton}
							buttonPosition={
								tabsActionPosition === 'none' ? undefined : tabsActionPosition
							}
						/>
					</PreviewSurface>
				</ComponentSection>

				<ComponentSection
					title="SegmentedTabs"
					copyText={buildPromptSpec('SegmentedTabs', {
						value: segmentedValue,
						actionPosition: segmentedActionPosition,
						interactive: segmentedInteractive,
						disabledLast: segmentedDisableLast,
					})}
					description="Плотные вкладки для локального переключения состояний."
				>
					<SelectCell
						label="Active tab"
						value={segmentedValue}
						options={tabValueOptions}
						onChange={setSegmentedValue}
					/>
					<SelectCell
						label="Action button"
						value={segmentedActionPosition}
						options={actionPositionOptions}
						onChange={setSegmentedActionPosition}
					/>
					<ToggleCell
						label="Interactive"
						checked={segmentedInteractive}
						onChange={setSegmentedInteractive}
					/>
					<ToggleCell
						label="Disable last tab"
						checked={segmentedDisableLast}
						onChange={setSegmentedDisableLast}
					/>

					<PreviewSurface stack>
						<SegmentedTabs
							tabs={segmentedItems}
							value={segmentedValue}
							onChange={(nextValue) => setSegmentedValue(nextValue as TabValue)}
							interactive={segmentedInteractive}
							button={segmentedActionButton}
							buttonPosition={
								segmentedActionPosition === 'none'
									? undefined
									: segmentedActionPosition
							}
						/>
					</PreviewSurface>
				</ComponentSection>

				<ComponentSection
					title="Nav"
					copyText={buildPromptSpec('Nav', {
						activeItem: navValue,
						labels: navLabels,
						disabledLast: navDisableLast,
					})}
					description="Нижняя навигация приложения с активным разделом."
				>
					<SelectCell
						label="Active item"
						value={navValue}
						options={navValueOptions}
						onChange={setNavValue}
					/>
					<ToggleCell
						label="Labels"
						checked={navLabels}
						onChange={setNavLabels}
					/>
					<ToggleCell
						label="Disable last item"
						checked={navDisableLast}
						onChange={setNavDisableLast}
					/>

					<PreviewSurface className="components-catalog__preview-nav">
						<Nav
							items={[
								{
									id: 'home',
									label: navLabels ? 'Главная' : undefined,
									active: navValue === 'home',
									'aria-label': 'Главная',
									onClick: () => setNavValue('home'),
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
									label: navLabels ? 'Чаты' : undefined,
									active: navValue === 'chat',
									'aria-label': 'Чаты',
									onClick: () => setNavValue('chat'),
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
									label: navLabels ? 'Настройки' : undefined,
									active: navValue === 'settings',
									'aria-label': 'Настройки',
									onClick: () => setNavValue('settings'),
									disabled: navDisableLast,
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
					</PreviewSurface>
				</ComponentSection>
			</FlowPageList>
		</FlowPage>
	);
}
