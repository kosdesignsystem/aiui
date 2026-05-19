import {
	ChangeEvent,
	KeyboardEvent,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../ui/Button';
import { Header } from '../../ui/Header';
import { Icon } from '../../ui/Icon';
import { IconButton } from '../../ui/IconButton';
import { List } from '../../ui/List';
import { Search } from '../../ui/Search';
import { SegmentedTabs } from '../../ui/SegmentedTabs';
import { FlowPage, FlowPageList } from '../FlowPage';
import {
	EmptyRemindersState,
	getPlanProgress,
	PlanProgress,
	ReminderRow,
	SearchEmptyState,
} from './components';
import {
	createReminderScreenState,
	groupReminders,
	reminderFilterTabs,
	remindersRoutes,
	searchReminders,
	type ReminderFilter,
} from './model';
import {
	CongratulationsModal,
	CreateTaskModal,
	GoalSetupModal,
	normalizeGoal,
} from './modals';
import { DAILY_GOAL_DEFAULT } from './progress';
import {
	defaultSelectedGoalDays,
	goalSetupModalResetEventName,
	getStoredPlanGoal,
	getStoredSelectedDays,
	hasShownGoalSetupModalInSession,
	markGoalSetupModalShownInSession,
	savePlanGoalInSession,
	saveSelectedDaysInSession,
} from './session';
import {
	completeReminder,
	createReminderFromTitle,
	persistCompletedReminderIds,
	reopenReminder,
	syncRemindersWithCompletedIds,
	useReminderStore,
} from './store';
import './screen.scss';

type RemindersScreenProps = {
	title: string;
	filter: ReminderFilter;
	mode?: 'default' | 'search';
	modalPreview?: 'goal-setup' | 'success' | 'create-task';
	previewGoal?: number;
	autoShowGoalSetup?: boolean;
};

type RouteState = {
	from?: string;
};

type ActiveModal = NonNullable<RemindersScreenProps['modalPreview']>;

function hasCompletedPlan(previousCount: number, nextCount: number, planGoal: number) {
	return planGoal > 0 && previousCount < planGoal && nextCount >= planGoal;
}

function getFilterRoute(filter: ReminderFilter) {
	return filter === 'all' ? remindersRoutes.all : remindersRoutes.today;
}

function getModalLayerClassName(activeModal: ActiveModal | undefined) {
	if (!activeModal) {
		return undefined;
	}

	const modifiers = [
		activeModal === 'success' ? 'is-celebration' : '',
		activeModal === 'create-task' ? 'is-create-task' : '',
	].filter(Boolean);

	return ['reminders-screen__modal-layer', ...modifiers].join(' ');
}

export function RemindersScreen({
	title,
	filter,
	mode = 'default',
	modalPreview,
	previewGoal,
	autoShowGoalSetup = false,
}: RemindersScreenProps) {
	const navigate = useNavigate();
	const location = useLocation();
	const routeState = (location.state ?? {}) as RouteState;
	const isSearchMode = mode === 'search';
	const [reminders, setReminders] = useReminderStore();
	const [searchQuery, setSearchQuery] = useState('');
	const [createTaskTitle, setCreateTaskTitle] = useState('');
	const [planGoal, setPlanGoal] = useState(() =>
		previewGoal ?? normalizeGoal(getStoredPlanGoal(DAILY_GOAL_DEFAULT)),
	);
	const [selectedDays, setSelectedDays] = useState(() =>
		modalPreview ? defaultSelectedGoalDays : getStoredSelectedDays(),
	);
	const [activeModal, setActiveModal] = useState<ActiveModal | undefined>(modalPreview);
	const { filteredReminders, groupedReminders } = useMemo(
		() => createReminderScreenState(reminders, filter),
		[filter, reminders],
	);
	const planProgress = useMemo(() => getPlanProgress(reminders), [reminders]);
	const searchResults = useMemo(
		() => searchReminders(reminders, searchQuery),
		[reminders, searchQuery],
	);
	const groupedSearchResults = useMemo(() => groupReminders(searchResults), [searchResults]);
	const closeModal = useCallback(() => {
		if (!modalPreview) {
			setActiveModal(undefined);
		}
	}, [modalPreview]);

	useEffect(() => {
		if (modalPreview) {
			setActiveModal(modalPreview);
			return;
		}

		if (!autoShowGoalSetup || hasShownGoalSetupModalInSession()) {
			return;
		}

		markGoalSetupModalShownInSession();
		setActiveModal('goal-setup');
	}, [autoShowGoalSetup, modalPreview]);

	useEffect(() => {
		if (modalPreview || typeof window === 'undefined') {
			return undefined;
		}

		const handleGoalSetupReset = () => {
			setPlanGoal(DAILY_GOAL_DEFAULT);
			setSelectedDays(defaultSelectedGoalDays);
			setReminders((current) => syncRemindersWithCompletedIds(current, []));

			if (autoShowGoalSetup) {
				markGoalSetupModalShownInSession();
				setActiveModal('goal-setup');
			}
		};

		window.addEventListener(goalSetupModalResetEventName, handleGoalSetupReset);

		return () => window.removeEventListener(goalSetupModalResetEventName, handleGoalSetupReset);
	}, [autoShowGoalSetup, modalPreview, setReminders]);

	const handleSaveGoal = (goal: number, nextSelectedDays: number[]) => {
		const nextGoal = normalizeGoal(goal);

		setPlanGoal(nextGoal);
		setSelectedDays(nextSelectedDays);

		if (modalPreview) {
			return;
		}

		savePlanGoalInSession(nextGoal);
		saveSelectedDaysInSession(nextSelectedDays);
		setActiveModal(undefined);
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

	const handleOpenCreateTask = () => {
		setCreateTaskTitle('');
		setActiveModal('create-task');
	};

	const handleCloseCreateTask = () => {
		setCreateTaskTitle('');
		closeModal();
	};

	const handleCreateTask = () => {
		const taskTitle = createTaskTitle.trim();

		if (!taskTitle) {
			return;
		}

		setReminders((current) => [createReminderFromTitle(taskTitle), ...current]);
		setCreateTaskTitle('');
		closeModal();
		navigate(remindersRoutes.today);
	};

	const toggleReminder = (reminderId: string) => {
		setReminders((current) => {
			const previousCompletedCount = getPlanProgress(current).completedCount;
			let completedTask = false;
			const nextReminders = current.map((reminder) => {
				if (reminder.id !== reminderId) {
					return reminder;
				}

				if (reminder.completed) {
					return reopenReminder(reminder);
				}

				completedTask = true;
				return completeReminder(reminder);
			});
			const nextCompletedCount = getPlanProgress(nextReminders).completedCount;

			if (
				completedTask &&
				!modalPreview &&
				hasCompletedPlan(previousCompletedCount, nextCompletedCount, planGoal)
			) {
				setActiveModal('success');
			}

			if (!modalPreview) {
				persistCompletedReminderIds(nextReminders);
			}

			return nextReminders;
		});
	};

	const bottomActions = (
		<div className="reminders-screen__bottom">
			{isSearchMode ? null : (
				<Button
					className="reminders-screen__add-task"
					type="button"
					size={60}
					variant="accent"
					onClick={handleOpenCreateTask}
				>
					Создать задачу
				</Button>
			)}
		</div>
	);

	const modalOverlay = (
		<>
			{activeModal === 'goal-setup' ? (
				<GoalSetupModal
					initialGoal={planGoal}
					initialSelectedDays={selectedDays}
					onSave={handleSaveGoal}
				/>
			) : null}
			{activeModal === 'success' ? (
				<CongratulationsModal
					completedCount={modalPreview ? planGoal : planProgress.completedCount}
					planGoal={planGoal}
					onClose={closeModal}
				/>
			) : null}
			{activeModal === 'create-task' ? (
				<CreateTaskModal
					title={createTaskTitle}
					onChangeTitle={setCreateTaskTitle}
					onSubmit={handleCreateTask}
					onClose={handleCloseCreateTask}
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
								completedCount={planProgress.completedCount}
								planGoal={planGoal}
								selectedDays={selectedDays}
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
							hideSearchIcon
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
			overlayClassName={getModalLayerClassName(activeModal)}
			overlay={activeModal ? modalOverlay : undefined}
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
