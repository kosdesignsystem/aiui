import { ChangeEvent, useState } from 'react';
import { App } from '../../ui/App';
import { Button } from '../../ui/Button';
import { Cell } from '../../ui/Cell';
import { Text } from '../../ui/Fonts';
import { Header } from '../../ui/Header';
import { Icon } from '../../ui/Icon';
import { IconButton } from '../../ui/IconButton';
import { List, ListContainer } from '../../ui/List';
import { SearchBar, SearchBarButton } from '../../ui/SearchBar';
import { type SegmentedTab, SegmentedTabs } from '../../ui/SegmentedTabs';
import { View } from '../../ui/View';
import './view.scss';

type TopActionsVariant = 'tabs' | 'icons';
type BottomActionsVariant = 'buttons-with-icon' | 'buttons-only' | 'search';
type SideButtonPosition = 'none' | 'left' | 'right';

type ControlOption = {
	value: string;
	label: string;
};

const topTabs: readonly [SegmentedTab, SegmentedTab, SegmentedTab] = [
	{ id: 'overview', label: 'Обзор' },
	{ id: 'states', label: 'Состояния' },
	{ id: 'notes', label: 'Заметки' },
];

const visibilityOptions: readonly ControlOption[] = [
	{ value: 'shown', label: 'Показать' },
	{ value: 'hidden', label: 'Скрыть' },
];

const topVariantOptions: readonly ControlOption[] = [
	{ value: 'tabs', label: 'Табы' },
	{ value: 'icons', label: 'Иконки' },
];

const bottomVariantOptions: readonly ControlOption[] = [
	{ value: 'buttons-with-icon', label: 'Текст + иконка' },
	{ value: 'buttons-only', label: 'Только текст' },
	{ value: 'search', label: 'Поиск' },
];

const sideButtonOptions: readonly ControlOption[] = [
	{ value: 'none', label: 'Без кнопки' },
	{ value: 'left', label: 'Слева' },
	{ value: 'right', label: 'Справа' },
];

const topVariantLabels: Record<TopActionsVariant, string> = {
	tabs: 'Табы',
	icons: 'Блок с иконочными кнопками',
};

const bottomVariantLabels: Record<BottomActionsVariant, string> = {
	'buttons-with-icon': 'Кнопки с иконками',
	'buttons-only': 'Кнопки с текстом',
	search: 'Поиск',
};

const sideButtonLabels: Record<SideButtonPosition, string> = {
	none: 'без боковой кнопки',
	left: 'кнопка слева',
	right: 'кнопка справа',
};

const sampleCells = [
	{
		id: 'layout',
		title: 'Header уходит первым',
		subtitle:
			'Начните скролл внутри View, чтобы верхний заголовок скрылся и освободил место для sticky actions.',
		icon: 'arrow-up',
	},
	{
		id: 'sticky',
		title: 'Верхний Actions остаётся доступным',
		subtitle:
			'Секция прилипает к верхней кромке экрана и помогает переключать контекст без возврата к началу.',
		icon: 'pinned-outline',
	},
	{
		id: 'variants',
		title: 'Варианты меняются на лету',
		subtitle:
			'Любая настройка ниже мгновенно перестраивает верхний и нижний action-блоки.',
		icon: 'switches',
	},
	{
		id: 'bottom',
		title: 'Нижний Actions держит CTA рядом',
		subtitle:
			'Для коротких сценариев подойдут кнопки, а для длинных списков можно переключиться на поиск.',
		icon: 'search',
	},
	{
		id: 'spacing',
		title: 'Секции собраны на реальных отступах',
		subtitle:
			'Экран опирается на те же App/View-компоненты, что и продуктовые страницы внутри проекта.',
		icon: 'documentation',
	},
	{
		id: 'testing',
		title: 'Эта зона специально длинная',
		subtitle:
			'Так проще проверить scroll-state и увидеть, как экран живёт в пределах устройства 360x800.',
		icon: 'bar-chart',
	},
];

type ControlGroupProps = {
	label: string;
	description?: string;
	value: string;
	options: readonly ControlOption[];
	onChange: (value: string) => void;
};

function ControlGroup({
	label,
	description,
	value,
	options,
	onChange,
}: ControlGroupProps) {
	return (
		<section className="components-view__control-group">
			<div className="components-view__control-copy">
				<Text as="p" variant="medium-16" color="primary">
					{label}
				</Text>
				{description ? (
					<Text as="p" variant="regular-14" color="secondary">
						{description}
					</Text>
				) : null}
			</div>

			<div className="components-view__control-options">
				{options.map((option) => {
					const isActive = option.value === value;

					return (
						<button
							key={option.value}
							type="button"
							className={`components-view__chip${isActive ? ' is-active' : ''}`}
							onClick={() => onChange(option.value)}
							aria-pressed={isActive}
						>
							<Text variant="medium-14" color={isActive ? 'primary' : 'secondary'}>
								{option.label}
							</Text>
						</button>
					);
				})}
			</div>
		</section>
	);
}

function StatePill({ label, value }: { label: string; value: string }) {
	return (
		<div className="components-view__state-pill">
			<Text as="p" variant="regular-12" color="secondary">
				{label}
			</Text>
			<Text as="p" variant="medium-14" color="primary">
				{value}
			</Text>
		</div>
	);
}

export default function ComponentsViewPage() {
	const [showTopActions, setShowTopActions] = useState(true);
	const [topActionsVariant, setTopActionsVariant] = useState<TopActionsVariant>('tabs');
	const [topTabsButtonPosition, setTopTabsButtonPosition] =
		useState<SideButtonPosition>('left');
	const [showBottomActions, setShowBottomActions] = useState(true);
	const [bottomActionsVariant, setBottomActionsVariant] =
		useState<BottomActionsVariant>('buttons-with-icon');
	const [bottomSearchButtonPosition, setBottomSearchButtonPosition] =
		useState<SideButtonPosition>('right');
	const [activeTab, setActiveTab] = useState(topTabs[0].id);
	const [searchValue, setSearchValue] = useState('');

	const topActionsSummary = showTopActions
		? topActionsVariant === 'tabs'
			? `${topVariantLabels[topActionsVariant]}, ${sideButtonLabels[topTabsButtonPosition]}`
			: topVariantLabels[topActionsVariant]
		: 'Скрыт';
	const bottomActionsSummary = showBottomActions
		? bottomActionsVariant === 'search'
			? `${bottomVariantLabels[bottomActionsVariant]}, ${sideButtonLabels[bottomSearchButtonPosition]}`
			: bottomVariantLabels[bottomActionsVariant]
		: 'Скрыт';

	const topTabsActionButton =
		topTabsButtonPosition === 'none' ? null : (
			<IconButton
				size={60}
				variant="primary"
				aria-label="Дополнительное действие"
			>
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

	const renderTopActions = () => {
		if (!showTopActions) {
			return null;
		}

		if (topActionsVariant === 'tabs') {
			return (
				<SegmentedTabs
					tabs={topTabs}
					value={activeTab}
					onChange={setActiveTab}
					button={topTabsActionButton ?? undefined}
					buttonPosition={topTabsButtonPosition === 'left' ? 'left' : 'right'}
				/>
			);
		}

		return (
			<div className="components-view__icon-actions">
				<IconButton size={60} variant="primary" aria-label="Поиск">
					<Icon name="search" width={24} height={24} alt="" aria-hidden="true" />
				</IconButton>
				<IconButton size={60} variant="primary" aria-label="Фильтры">
					<Icon name="filter" width={24} height={24} alt="" aria-hidden="true" />
				</IconButton>
				<IconButton size={60} variant="primary" aria-label="Ещё">
					<Icon
						name="more-horizontal"
						width={24}
						height={24}
						alt=""
						aria-hidden="true"
					/>
				</IconButton>
			</div>
		);
	};

	const renderBottomActions = () => {
		if (!showBottomActions) {
			return null;
		}

		if (bottomActionsVariant === 'buttons-with-icon') {
			return (
				<div className="components-view__bottom-row">
					<Button
						size={52}
						variant="primary"
						leftIcon={
							<Icon name="filter" width={18} height={18} alt="" aria-hidden="true" />
						}
					>
						Фильтр
					</Button>
					<Button
						size={52}
						variant="accent"
						leftIcon={
							<Icon name="add" width={18} height={18} alt="" aria-hidden="true" />
						}
					>
						Добавить
					</Button>
				</div>
			);
		}

		if (bottomActionsVariant === 'buttons-only') {
			return (
				<div className="components-view__bottom-row">
					<Button size={52} variant="secondary">
						Отмена
					</Button>
					<Button size={52} variant="accent">
						Сохранить
					</Button>
				</div>
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

	return (
		<App>
			<div className="components-view">
				<View>
					<div className="components-view__canvas">
						<Header
							title="View"
							button={
								<div className="components-view__header-badge">
									<Icon
										name="arrow-up"
										width={16}
										height={16}
										alt=""
										aria-hidden="true"
									/>
										<Text variant="medium-14" color="primary">
											Sticky state
										</Text>
									</div>
								}
						/>

						{showTopActions ? (
							<div className="components-view__sticky-actions">{renderTopActions()}</div>
						) : null}

						<div className="components-view__content">
							<ListContainer>
								<List title="Сценарий">
									<div className="components-view__hero">
										<div className="components-view__hero-copy">
											<Text as="p" variant="medium-20" color="primary">
												Шаблон экрана с управляемыми actions
											</Text>
											<Text as="p" variant="regular-16" color="secondary">
												Прокрутите страницу внутри View: Header скроется,
												а верхний action-блок закрепится у верхней границы.
											</Text>
										</div>

										<div className="components-view__state-grid">
											<StatePill label="Верхний блок" value={topActionsSummary} />
											<StatePill label="Нижний блок" value={bottomActionsSummary} />
											<StatePill label="Scroll" value="Header hide + sticky top" />
										</div>
									</div>
								</List>

								<List title="Верхний Actions">
									<ControlGroup
										label="Показать верхний блок"
										description="Секция располагается сразу под Header и участвует в sticky-сценарии."
										value={showTopActions ? 'shown' : 'hidden'}
										options={visibilityOptions}
										onChange={(value) => setShowTopActions(value === 'shown')}
									/>

									{showTopActions ? (
										<ControlGroup
											label="Вариант верхнего блока"
											value={topActionsVariant}
											options={topVariantOptions}
											onChange={(value) =>
												setTopActionsVariant(value as TopActionsVariant)
											}
										/>
									) : null}

									{showTopActions && topActionsVariant === 'tabs' ? (
										<ControlGroup
											label="Положение иконочной кнопки"
											description="Для табов можно оставить только сегменты или добавить боковую кнопку."
											value={topTabsButtonPosition}
											options={sideButtonOptions}
											onChange={(value) =>
												setTopTabsButtonPosition(value as SideButtonPosition)
											}
										/>
									) : null}
								</List>

								<List title="Нижний Actions">
									<ControlGroup
										label="Показать нижний блок"
										description="Нижний actions фиксируется под View и остаётся рядом с системной навигацией устройства."
										value={showBottomActions ? 'shown' : 'hidden'}
										options={visibilityOptions}
										onChange={(value) => setShowBottomActions(value === 'shown')}
									/>

									{showBottomActions ? (
										<ControlGroup
											label="Вариант нижнего блока"
											value={bottomActionsVariant}
											options={bottomVariantOptions}
											onChange={(value) =>
												setBottomActionsVariant(value as BottomActionsVariant)
											}
										/>
									) : null}

									{showBottomActions && bottomActionsVariant === 'search' ? (
										<ControlGroup
											label="Положение иконочной кнопки"
											description="Кнопка добавляется слева или справа от SearchBar, либо полностью убирается."
											value={bottomSearchButtonPosition}
											options={sideButtonOptions}
											onChange={(value) =>
												setBottomSearchButtonPosition(value as SideButtonPosition)
											}
										/>
									) : null}
								</List>

								<List title="Контент для скролла">
									{sampleCells.map((item) => (
										<Cell
											key={item.id}
											title={
												<Text variant="medium-18" color="primary">
													{item.title}
												</Text>
											}
											subtitle={
												<Text variant="regular-14" color="secondary">
													{item.subtitle}
												</Text>
											}
											leading={
												<div className="components-view__cell-icon">
													<Icon
														name={item.icon}
														width={20}
														height={20}
														alt=""
														aria-hidden="true"
														colorToken="accent-primary"
													/>
												</div>
											}
											trailing={
												<IconButton size={44} variant="secondary" aria-label="Подробнее">
													<Icon
														name="chevron-right"
														width={20}
														height={20}
														alt=""
														aria-hidden="true"
													/>
												</IconButton>
											}
										/>
									))}
								</List>
							</ListContainer>
						</div>
					</div>
				</View>

				{showBottomActions ? (
					<div className="components-view__bottom-actions">{renderBottomActions()}</div>
				) : null}
			</div>
		</App>
	);
}
