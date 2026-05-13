import {
	ChangeEvent,
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
import {
	clampProgress,
	DAILY_GOAL_DEFAULT,
	DAILY_PROGRESS_DEFAULT,
	GOAL_SETUP_PROGRESS_PREVIEW,
	TaskProgressMeter,
	WeekdayPlan,
} from './progress';
import './screen.scss';

type RemindersScreenProps = {
	title: string;
	filter: ReminderFilter;
	mode?: 'default' | 'search';
	modalPreview?: 'goal-setup' | 'success';
	previewGoal?: number;
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

function PlanProgress({
	filter,
	dailyProgress,
	planGoal,
}: {
	filter: ReminderFilter;
	dailyProgress: number;
	planGoal: number;
}) {
	if (filter === 'all') {
		return (
			<section className="reminders-screen__plan" aria-label="Прогресс недели">
				<WeekdayPlan
					selectedDays={[0, 3]}
					disabledDays={[5, 6]}
					count={3}
					className="reminders-screen__week-stat"
				/>
			</section>
		);
	}

	return (
		<section className="reminders-screen__plan" aria-label="Прогресс дневной нормы">
			<TaskProgressMeter value={dailyProgress} max={planGoal} />
		</section>
	);
}

function GoalSetupModal({
	initialGoal,
	onSave,
}: {
	initialGoal: number;
	onSave: (goal: number) => void;
}) {
	const [draftGoal, setDraftGoal] = useState(clampProgress(initialGoal, DAILY_GOAL_DEFAULT));
	const [selectedDays, setSelectedDays] = useState([0, 3]);

	const toggleWeekday = (dayId: number) => {
		setSelectedDays((current) => {
			if (current.includes(dayId)) {
				return current.filter((selectedDay) => selectedDay !== dayId);
			}

			return [...current, dayId].sort((left, right) => left - right);
		});
	};

	return (
		<div className="reminders-screen__modal-layer" role="presentation">
			<div
				className="reminders-screen__sheet reminders-screen__goal-modal"
				role="dialog"
				aria-modal="true"
				aria-labelledby="reminders-goal-title"
			>
				<div className="reminders-screen__goal-panel">
					<h2 id="reminders-goal-title">Настройка задач</h2>

					<section className="reminders-screen__goal-section">
						<div className="reminders-screen__setting-row">
							<h3>Количество задач в день</h3>
							<span>{draftGoal}</span>
						</div>
						<div className="reminders-screen__goal-range">
							<TaskProgressMeter
								value={Math.min(GOAL_SETUP_PROGRESS_PREVIEW, draftGoal)}
								max={DAILY_GOAL_DEFAULT}
								showCount={false}
								variant="goal"
								ariaLabel="Количество задач в день"
							/>
							<input
								type="range"
								min="1"
								max={DAILY_GOAL_DEFAULT}
								value={draftGoal}
								aria-label="Количество задач в день"
								onChange={(event) => setDraftGoal(Number(event.target.value))}
							/>
						</div>
						<p>Не нужно героизма. Поставьте реалистичную норму</p>
					</section>

					<section className="reminders-screen__goal-section">
						<div className="reminders-screen__setting-row">
							<h3>План на неделю</h3>
							<span>{selectedDays.length}</span>
						</div>
						<WeekdayPlan
							selectedDays={selectedDays}
							interactive
							onToggleDay={toggleWeekday}
							className="reminders-screen__goal-weekdays"
						/>
						<p>а мы будем показывать прогресс и вовремя отпразднуем закрытые дела.</p>
					</section>
				</div>
				<Button
					className="reminders-screen__modal-button"
					type="button"
					size={60}
					variant="accent"
					onClick={() => onSave(draftGoal)}
				>
					Начать
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
				className="reminders-screen__sheet reminders-screen__congrats-modal"
				role="dialog"
				aria-modal="true"
				aria-labelledby="reminders-congrats-title"
			>
				<div className="reminders-screen__congrats-panel">
					<div className="reminders-screen__achievement">
						<div className="reminders-screen__achievement-icon" aria-hidden="true">
							<span>🎉</span>
						</div>
						<span className="reminders-screen__achievement-badge">
							{completedCount} из {planGoal}
						</span>
					</div>
					<h2 id="reminders-congrats-title">Сегодня вы правда продвинулись.</h2>
					<p>
						Можно продолжать, а можно зафиксировать этот маленький, но честный выигрыш.
					</p>
				</div>
				<Button
					className="reminders-screen__modal-button"
					type="button"
					size={60}
					variant="accent"
					onClick={onClose}
				>
					Начать
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
	previewGoal,
}: RemindersScreenProps) {
	const navigate = useNavigate();
	const location = useLocation();
	const routeState = (location.state ?? {}) as RouteState;
	const isSearchMode = mode === 'search';
	const [reminders, setReminders] = useReminderStore();
	const [searchQuery, setSearchQuery] = useState('');
	const [planGoal, setPlanGoal] = useState(previewGoal ?? DAILY_GOAL_DEFAULT);
	const [dailyProgress, setDailyProgress] = useState(
		clampProgress(
			modalPreview === 'success' ? planGoal : DAILY_PROGRESS_DEFAULT,
			planGoal,
		),
	);
	const { filteredReminders, groupedReminders } = useMemo(
		() => createReminderScreenState(reminders, filter),
		[filter, reminders],
	);
	const searchResults = useMemo(
		() => searchReminders(reminders, searchQuery),
		[reminders, searchQuery],
	);
	const groupedSearchResults = useMemo(() => groupReminders(searchResults), [searchResults]);

	const handleSaveGoal = (goal: number) => {
		setPlanGoal(goal);
		setDailyProgress((current) => clampProgress(current, goal));
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
		const reminderToToggle = reminders.find((reminder) => reminder.id === reminderId);

		if (reminderToToggle) {
			setDailyProgress((current) =>
				clampProgress(current + (reminderToToggle.completed ? -1 : 1), planGoal),
			);
		}

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
					initialGoal={planGoal}
					onSave={handleSaveGoal}
				/>
			) : null}
			{modalPreview === 'success' ? (
				<CongratulationsModal
					completedCount={planGoal}
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
						title={title}
						meta={
							<PlanProgress
								filter={filter}
								dailyProgress={dailyProgress}
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
