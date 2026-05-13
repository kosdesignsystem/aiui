import {
	ChangeEvent,
	type CSSProperties,
	KeyboardEvent,
	SetStateAction,
	useMemo,
	useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar } from '../../ui/Avatar';
import { Button } from '../../ui/Button';
import { Cell } from '../../ui/Cell';
import { Text } from '../../ui/Fonts';
import { Header } from '../../ui/Header';
import { Icon } from '../../ui/Icon';
import { IconButton } from '../../ui/IconButton';
import { List } from '../../ui/List';
import { Search } from '../../ui/Search';
import { SegmentedTabs } from '../../ui/SegmentedTabs';
import { FlowPage, FlowPageList } from '../FlowPage';
import {
	createReminderScreenState,
	getReminderList,
	groupReminders,
	reminderFilterTabs,
	reminderSeeds,
	remindersRoutes,
	searchReminders,
	type Reminder,
	type ReminderFilter,
	type ReminderListId,
	type ReminderSectionId,
} from './model';
import './screen.scss';

type RemindersScreenProps = {
	title: string;
	filter: ReminderFilter;
	mode?: 'default' | 'search';
	modalPreview?: 'goal-setup' | 'success';
};

type PreparedReminder = {
	title: string;
	dateOffset: number | null;
	dueTime?: string;
	listId: ReminderListId;
};

type RouteState = {
	from?: string;
};

const preparedReminders: PreparedReminder[] = [
	{
		title: 'Подготовить статус по проекту',
		dateOffset: 0,
		dueTime: '12:00',
		listId: 'work',
	},
	{
		title: 'Оплатить интернет',
		dateOffset: 1,
		dueTime: '19:00',
		listId: 'home',
	},
	{
		title: 'Записаться к врачу',
		dateOffset: 3,
		dueTime: '10:00',
		listId: 'personal',
	},
	{
		title: 'Отнести документы в офис',
		dateOffset: 7,
		dueTime: '09:30',
		listId: 'work',
	},
	{
		title: 'Разобрать список покупок',
		dateOffset: null,
		listId: 'home',
	},
];

let reminderStore = reminderSeeds;
let preparedReminderCursor = 0;

const DEFAULT_PLAN_GOAL = 3;

const confettiPieces = Array.from({ length: 64 }, (_, index) => index);
const confettiColors = [
	'#2fd0a8',
	'#2f8bf2',
	'#ffd047',
	'#ff4d7d',
	'#8c7bff',
	'#ffffff',
];

function useReminderStore() {
	const [reminders, setReminderState] = useState(reminderStore);

	const setReminders = (updater: SetStateAction<Reminder[]>) => {
		setReminderState((current) => {
			const nextReminders =
				typeof updater === 'function'
					? (updater as (value: Reminder[]) => Reminder[])(current)
					: updater;

			reminderStore = nextReminders;
			return nextReminders;
		});
	};

	return [reminders, setReminders] as const;
}

function getFilterRoute(filter: ReminderFilter) {
	if (filter === 'all') {
		return remindersRoutes.all;
	}

	return remindersRoutes.today;
}

function toDateKey(date: Date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
}

function getTomorrow(date: Date) {
	const tomorrow = new Date(date);
	tomorrow.setDate(date.getDate() + 1);

	return tomorrow;
}

function getDateByOffset(offset: number) {
	const date = new Date();
	date.setDate(date.getDate() + offset);

	return date;
}

function formatReminderDateLabel(dateKey: string) {
	if (!dateKey) {
		return 'Без срока';
	}

	const today = new Date();
	const tomorrow = getTomorrow(today);

	if (dateKey === toDateKey(today)) {
		return 'Сегодня';
	}

	if (dateKey === toDateKey(tomorrow)) {
		return 'Завтра';
	}

	const [year, month, day] = dateKey.split('-').map(Number);
	const date = new Date(year, month - 1, day);

	return new Intl.DateTimeFormat('ru-RU', {
		day: 'numeric',
		month: 'long',
	}).format(date);
}

function getReminderSection(dateKey: string): Exclude<ReminderSectionId, 'completed'> {
	if (!dateKey) {
		return 'no-date';
	}

	const todayKey = toDateKey(new Date());

	if (dateKey < todayKey) {
		return 'overdue';
	}

	if (dateKey === todayKey) {
		return 'today';
	}

	return 'upcoming';
}

function getPreparedReminderDateKey(preset: PreparedReminder) {
	if (preset.dateOffset === null) {
		return '';
	}

	return toDateKey(getDateByOffset(preset.dateOffset));
}

function restoreReminderSection(reminder: Reminder): Exclude<ReminderSectionId, 'completed'> {
	if (reminder.dueLabel === 'Вчера') {
		return 'overdue';
	}

	if (reminder.dueLabel === 'Сегодня') {
		return 'today';
	}

	if (reminder.dueLabel === 'Без срока') {
		return 'no-date';
	}

	return 'upcoming';
}

function createReminderFromPreset(preset: PreparedReminder): Reminder {
	const dateKey = getPreparedReminderDateKey(preset);
	const section = getReminderSection(dateKey);

	return {
		id: `reminder-${Date.now()}-${preparedReminderCursor}`,
		title: preset.title,
		note: '',
		listId: preset.listId,
		section,
		activeSection: section,
		dueLabel: formatReminderDateLabel(dateKey),
		dueTime: preset.dueTime,
		priority: 'normal',
		completed: false,
	};
}

function formatReminderMeta(reminder: Reminder) {
	const list = getReminderList(reminder.listId);
	const segments = [
		reminder.dueTime ? `${reminder.dueLabel}, ${reminder.dueTime}` : reminder.dueLabel,
		list.label,
		reminder.repeatLabel,
	].filter(Boolean);

	return segments.join(' · ');
}

function getCompletedReminderCount(reminders: Reminder[]) {
	return reminders.filter((reminder) => reminder.completed).length;
}

function formatTaskWord(count: number) {
	const absoluteCount = Math.abs(count);
	const lastDigit = absoluteCount % 10;
	const lastTwoDigits = absoluteCount % 100;

	if (lastDigit === 1 && lastTwoDigits !== 11) {
		return 'задача';
	}

	if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 12 || lastTwoDigits > 14)) {
		return 'задачи';
	}

	return 'задач';
}

function PlanProgress({
	activeCount,
	completedCount,
	planGoal,
}: {
	activeCount: number;
	completedCount: number;
	planGoal: number;
}) {
	const remainingToGoal = Math.max(planGoal - completedCount, 0);
	const progress = Math.min((completedCount / planGoal) * 100, 100);
	const isGoalDone = remainingToGoal === 0;

	return (
		<section className="reminders-screen__plan" aria-label="Прогресс плана">
			<div className="reminders-screen__plan-copy">
				<span className="reminders-screen__plan-kicker">
					{isGoalDone ? 'План выполнен' : 'Сегодняшний темп'}
				</span>
				<span className="reminders-screen__plan-title">
					{isGoalDone
						? `${completedCount} ${formatTaskWord(completedCount)} закрыто`
						: `${remainingToGoal} до отметки ${planGoal}`}
				</span>
			</div>
			<div className="reminders-screen__plan-track" aria-hidden="true">
				<span
					className="reminders-screen__plan-fill"
					style={{ width: `${progress}%` }}
				/>
				<span className="reminders-screen__plan-marker" style={{ left: `${progress}%` }} />
			</div>
			<div className="reminders-screen__plan-stats">
				<span>{activeCount} осталось всего</span>
				<span>{completedCount} выполнено</span>
				<span>{remainingToGoal} до нормы</span>
			</div>
		</section>
	);
}

function GoalSetupModal({
	activeCount,
	completedCount,
	initialGoal,
	onSave,
}: {
	activeCount: number;
	completedCount: number;
	initialGoal: number;
	onSave: (goal: number) => void;
}) {
	const maxGoal = Math.max(8, activeCount + completedCount + 2);
	const [draftGoal, setDraftGoal] = useState(Math.min(initialGoal, maxGoal));
	const plannedProgress = Math.min((completedCount / draftGoal) * 100, 100);
	const remainingToGoal = Math.max(draftGoal - completedCount, 0);

	return (
		<div className="reminders-screen__modal-layer" role="presentation">
			<div
				className="reminders-screen__goal-modal"
				role="dialog"
				aria-modal="true"
				aria-labelledby="reminders-goal-title"
			>
				<div className="reminders-screen__goal-hero" aria-hidden="true">
					<div className="reminders-screen__goal-card">
						<div className="reminders-screen__goal-card-top">
							<span className="reminders-screen__goal-badge">
								<Icon
									name="list-check"
									width={20}
									height={20}
									alt=""
									aria-hidden="true"
								/>
							</span>
							<span className="reminders-screen__goal-card-label">focus plan</span>
						</div>
						<div className="reminders-screen__goal-card-number">{draftGoal}</div>
						<div className="reminders-screen__goal-card-track">
							<span style={{ width: `${plannedProgress}%` }} />
						</div>
						<div className="reminders-screen__goal-card-days">
							{['M', 'T', 'W', 'T', 'F'].map((day, index) => (
								<span
									key={`${day}-${index}`}
									className={index < completedCount ? 'is-done' : ''}
								>
									{day}
								</span>
							))}
						</div>
					</div>
				</div>
				<div className="reminders-screen__goal-content">
					<p className="reminders-screen__eyebrow">Личный план на сегодня</p>
					<h2 id="reminders-goal-title">Выберите отметку, до которой приятно дойти</h2>
					<p>
						Не нужно героизма. Поставьте реалистичную норму, а мы будем показывать
						прогресс и вовремя отпразднуем закрытые дела.
					</p>
				</div>
				<div className="reminders-screen__goal-slider">
					<div className="reminders-screen__goal-value">
						<span>{draftGoal}</span>
						<small>{formatTaskWord(draftGoal)} в плане</small>
					</div>
					<input
						type="range"
						min="1"
						max={maxGoal}
						value={draftGoal}
						aria-label="Норма задач"
						onChange={(event) => setDraftGoal(Number(event.target.value))}
					/>
					<div className="reminders-screen__goal-scale">
						<span>1</span>
						<span>{Math.round(maxGoal / 2)}</span>
						<span>{maxGoal}</span>
					</div>
				</div>
				<div className="reminders-screen__goal-summary">
					<span>{activeCount} задач ждут внимания</span>
					<span>{remainingToGoal} до выбранной отметки</span>
				</div>
				<Button
					className="reminders-screen__modal-button"
					type="button"
					size={60}
					variant="accent"
					onClick={() => onSave(draftGoal)}
				>
					Начать с этой отметки
				</Button>
			</div>
		</div>
	);
}

function CongratulationsModal({
	completedCount,
	planGoal,
	onClose,
}: {
	completedCount: number;
	planGoal: number;
	onClose: () => void;
}) {
	return (
		<div className="reminders-screen__modal-layer is-celebration" role="presentation">
			<div
				className="reminders-screen__congrats-modal"
				role="dialog"
				aria-modal="true"
				aria-labelledby="reminders-congrats-title"
			>
				<div className="reminders-screen__congrats-icon" aria-hidden="true">
					<div className="reminders-screen__confetti" aria-hidden="true">
						{confettiPieces.map((piece) => {
							const side = piece % 2 === 0 ? 1 : -1;
							const spread = 18 + ((piece * 29) % 132);
							const lift = 92 + ((piece * 37) % 154);
							const style = {
								'--piece-delay': `${(piece % 18) * 22}ms`,
								'--piece-x': `${side * spread}px`,
								'--piece-y': `${-lift}px`,
								'--piece-rotate': `${side * (180 + piece * 17)}deg`,
								'--piece-color': confettiColors[piece % confettiColors.length],
								'--piece-scale': `${0.74 + (piece % 5) * 0.12}`,
							} as CSSProperties;

							return <span key={piece} style={style} />;
						})}
					</div>
					<span className="reminders-screen__congrats-emoji">🎉</span>
				</div>
				<p className="reminders-screen__eyebrow">Отметка взята</p>
				<h2 id="reminders-congrats-title">Готово. Сегодня вы правда продвинулись.</h2>
				<p>
					Закрыто {completedCount} из {planGoal}. Можно продолжать, а можно зафиксировать
					этот маленький, но честный выигрыш.
				</p>
				<Button
					className="reminders-screen__modal-button"
					type="button"
					size={60}
					variant="success"
					onClick={onClose}
				>
					Продолжить
				</Button>
			</div>
		</div>
	);
}

function ReminderRow({ reminder, onToggle }: { reminder: Reminder; onToggle: () => void }) {
	const isDone = reminder.completed;

	return (
		<Cell
			className={isDone ? 'reminders-screen__cell is-completed' : 'reminders-screen__cell'}
			leading={
				<button
					className={
						isDone
							? 'reminders-screen__checkbox is-checked'
							: 'reminders-screen__checkbox'
					}
					type="button"
					role="checkbox"
					aria-checked={isDone}
					aria-label={isDone ? 'Вернуть в активные' : 'Отметить выполненным'}
					title={isDone ? 'Вернуть в активные' : 'Отметить выполненным'}
					onClick={onToggle}
				>
					<Avatar
						size={32}
						background={isDone ? 'accent-primary' : 'background-primary'}
						className="reminders-screen__checkbox-avatar"
					>
						{isDone ? (
							<Icon
								name="done"
								width={20}
								height={20}
								alt=""
								aria-hidden="true"
								colorToken="content-constant"
							/>
						) : null}
					</Avatar>
				</button>
			}
			title={
				<Text variant="medium-18" color={isDone ? 'secondary' : 'primary'}>
					<span className="reminders-screen__title">{reminder.title}</span>
				</Text>
			}
			subtitle={
				<Text variant="regular-14" color="secondary">
					{formatReminderMeta(reminder)}
				</Text>
			}
		/>
	);
}

function EmptyRemindersState({ filter }: { filter: ReminderFilter }) {
	const title = filter === 'today' ? 'На сегодня пусто' : 'Список пуст';
	const description =
		filter === 'today'
			? 'Новые задачи на сегодня появятся здесь.'
			: 'Добавьте первое напоминание.';

	return (
		<List title="Напоминания">
			<Cell
				leading={
					<Avatar background="content-background">
						<Icon
							name="list-check"
							width={22}
							height={22}
							alt=""
							aria-hidden="true"
							colorToken="content-secondary"
						/>
					</Avatar>
				}
				title={
					<Text variant="medium-18" color="primary">
						{title}
					</Text>
				}
				subtitle={
					<Text variant="regular-14" color="secondary">
						{description}
					</Text>
				}
			/>
		</List>
	);
}

function SearchEmptyState() {
	return (
		<div className="reminders-screen__search-empty">
			<Text variant="regular-20" color="secondary">
				Ничего не найдено
			</Text>
		</div>
	);
}

export function RemindersScreen({
	title,
	filter,
	mode = 'default',
	modalPreview,
}: RemindersScreenProps) {
	const navigate = useNavigate();
	const location = useLocation();
	const routeState = (location.state ?? {}) as RouteState;
	const isSearchMode = mode === 'search';
	const [reminders, setReminders] = useReminderStore();
	const [searchQuery, setSearchQuery] = useState('');
	const [planGoal, setPlanGoal] = useState(DEFAULT_PLAN_GOAL);
	const { activeCount, overdueCount, filteredReminders, groupedReminders } = useMemo(
		() => createReminderScreenState(reminders, filter),
		[filter, reminders],
	);
	const completedCount = useMemo(() => getCompletedReminderCount(reminders), [reminders]);
	const searchResults = useMemo(
		() => searchReminders(reminders, searchQuery),
		[reminders, searchQuery],
	);
	const groupedSearchResults = useMemo(() => groupReminders(searchResults), [searchResults]);
	const headerTitle = overdueCount > 0 ? `${title}: ${overdueCount} просрочено` : title;

	const handleSaveGoal = (goal: number) => {
		setPlanGoal(goal);
	};

	const handleOpenSearch = () => {
		setSearchQuery('');
		navigate(remindersRoutes.search, { state: { from: getFilterRoute(filter) } });
	};

	const handleCloseSearch = () => {
		setSearchQuery('');
		navigate(routeState.from ?? remindersRoutes.today);
	};

	const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key !== 'Escape') {
			return;
		}

		event.preventDefault();
		handleCloseSearch();
	};

	const handleCreateTask = () => {
		const preset = preparedReminders[preparedReminderCursor % preparedReminders.length];
		preparedReminderCursor += 1;
		const nextReminder = createReminderFromPreset(preset);

		setReminders((current) => [nextReminder, ...current]);
		navigate(
			nextReminder.section === 'today' || nextReminder.section === 'overdue'
				? remindersRoutes.today
				: remindersRoutes.all,
		);
	};

	const toggleReminder = (reminderId: string) => {
		setReminders((current) =>
			current.map((reminder) => {
				if (reminder.id !== reminderId) {
					return reminder;
				}

				if (reminder.completed) {
					return {
						...reminder,
						completed: false,
						section: reminder.activeSection ?? restoreReminderSection(reminder),
					};
				}

				return {
					...reminder,
					completed: true,
					activeSection: reminder.section as Exclude<ReminderSectionId, 'completed'>,
					section: 'completed',
				};
			}),
		);
	};

	const bottomActions = (
		<div className="reminders-screen__bottom">
			{!isSearchMode ? (
				<Button
					className="reminders-screen__add-task"
					type="button"
					size={60}
					variant="accent"
					onClick={handleCreateTask}
				>
					Создать задачу
				</Button>
			) : null}
		</div>
	);

	const modalOverlay = (
		<>
			{modalPreview === 'goal-setup' ? (
				<GoalSetupModal
					activeCount={activeCount}
					completedCount={completedCount}
					initialGoal={planGoal}
					onSave={handleSaveGoal}
				/>
			) : null}
			{modalPreview === 'success' ? (
				<CongratulationsModal
					completedCount={Math.max(completedCount, planGoal)}
					planGoal={planGoal}
					onClose={() => undefined}
				/>
			) : null}
		</>
	);

	return (
		<FlowPage
			title={isSearchMode ? undefined : title}
			header={
				isSearchMode ? undefined : (
					<Header
						title={headerTitle}
						meta={
							<PlanProgress
								activeCount={activeCount}
								completedCount={completedCount}
								planGoal={planGoal}
							/>
						}
					/>
				)
			}
			topActions={
				isSearchMode ? (
					<div className="reminders-screen__search">
						<Search
							type="search"
							hideSearchIcon={true}
							autoFocus
							placeholder="Поиск"
							aria-label="Поиск по напоминаниям"
							value={searchQuery}
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								setSearchQuery(event.target.value)
							}
							onKeyDown={handleSearchKeyDown}
							inputTrailing={
								<IconButton
									size={32}
									variant="primary"
									onClick={handleCloseSearch}
									aria-label="Назад"
								>
									<Icon
										name="close"
										width={16}
										height={16}
										alt=""
										aria-hidden="true"
									/>
								</IconButton>
							}
						/>
					</div>
				) : (
					<SegmentedTabs
						className="reminders-screen__tabs"
						tabs={reminderFilterTabs}
						value={filter}
						onChange={(tabId) => navigate(getFilterRoute(tabId as ReminderFilter))}
						ariaLabel="Фильтр напоминаний"
						action={{
							position: 'left',
							element: (
								<IconButton
									size={60}
									variant="primary"
									aria-label="Поиск"
									onClick={handleOpenSearch}
								>
									<Icon name="search" alt="" width={24} height={24} />
								</IconButton>
							),
						}}
					/>
				)
			}
			bottomActions={bottomActions}
			overlay={modalOverlay}
		>
			{isSearchMode ? (
				<div className="reminders-screen__search-content">
					{searchQuery.trim().length === 0 ? null : searchResults.length === 0 ? (
						<SearchEmptyState />
					) : (
						<FlowPageList>
							{groupedSearchResults.map((section) => (
								<List key={section.id} title={section.title}>
									{section.reminders.map((reminder) => (
										<ReminderRow
											key={reminder.id}
											reminder={reminder}
											onToggle={() => toggleReminder(reminder.id)}
										/>
									))}
								</List>
							))}
						</FlowPageList>
					)}
				</div>
			) : (
				<FlowPageList>
					{filteredReminders.length === 0 ? (
						<EmptyRemindersState filter={filter} />
					) : null}
					{groupedReminders.map((section) => (
						<List
							key={section.id}
							title={section.title}
							collapsible={filter === 'all' && section.id === 'completed'}
							defaultCollapsed={filter === 'all' && section.id === 'completed'}
						>
							{section.reminders.map((reminder) => (
								<ReminderRow
									key={reminder.id}
									reminder={reminder}
									onToggle={() => toggleReminder(reminder.id)}
								/>
							))}
						</List>
					))}
				</FlowPageList>
			)}
		</FlowPage>
	);
}
