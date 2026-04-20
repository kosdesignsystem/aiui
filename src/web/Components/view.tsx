import { ChangeEvent, KeyboardEvent, MouseEvent, ReactNode, useState } from 'react';
import { Button } from '../../ui/Button';
import { Cell } from '../../ui/Cell';
import { Text } from '../../ui/Fonts';
import { Icon } from '../../ui/Icon';
import { IconButton } from '../../ui/IconButton';
import { List } from '../../ui/List';
import { Nav } from '../../ui/Nav';
import { Search } from '../../ui/Search';
import { Tabs } from '../../ui/Tabs';
import { Switch } from '../../ui/Switch';
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

type ToggleCellProps = {
	label: string;
	description?: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
};

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

	const handleTopIconsCountChange = (event: ChangeEvent<HTMLInputElement>) => {
		const nextValue = Number(event.target.value);

		if (Number.isNaN(nextValue)) {
			return;
		}

		setTopIconsCount(Math.min(TOP_ICONS_MAX, Math.max(TOP_ICONS_MIN, Math.trunc(nextValue))));
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
				onChange={(event: ChangeEvent<HTMLInputElement>) =>
					setSearchValue(event.target.value)
				}
				leftButton={bottomSearchButtonPosition === 'left' ? searchSideButton : undefined}
				rightButton={bottomSearchButtonPosition === 'right' ? searchSideButton : undefined}
					fieldAction={
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
						{topActionsVariant === 'icons' ? (
							<Cell
								title={
									<Text as="p" variant="regular-18" color="primary">
										Количество иконок
									</Text>
								}
								subtitle={
									<Text as="p" variant="regular-14" color="secondary">
										От {TOP_ICONS_MIN} до {TOP_ICONS_MAX}
									</Text>
								}
								trailing={
									<input
										className="components-screen__field"
										type="number"
										min={TOP_ICONS_MIN}
										max={TOP_ICONS_MAX}
										inputMode="numeric"
										value={topIconsCount}
										onChange={handleTopIconsCountChange}
										aria-label="Количество иконок"
									/>
								}
							/>
						) : null}
					</List>
				) : null}
				{showTopActions && topActionsVariant === 'tabs' ? (
					<List title="Положение кнопки">
						<Tabs
							tabs={sideButtonTabs}
							value={topTabsButtonPosition}
							onChange={(nextValue) =>
								setTopTabsButtonPosition(nextValue as SideButtonPosition)
							}
						/>
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
					</List>
				) : null}
				{showBottomActions && bottomActionsVariant === 'search' ? (
					<List title="Положение кнопки">
						<Tabs
							tabs={sideButtonTabs}
							value={bottomSearchButtonPosition}
							onChange={(nextValue) =>
								setBottomSearchButtonPosition(nextValue as SideButtonPosition)
							}
						/>
					</List>
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
