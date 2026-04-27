import {
	ChangeEvent,
	FormEvent,
	KeyboardEvent,
	SetStateAction,
	useMemo,
	useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar } from '../../ui/Avatar';
import { Cell } from '../../ui/Cell';
import { Field } from '../../ui/Field';
import { Text } from '../../ui/Fonts';
import { Header } from '../../ui/Header';
import { Icon, type IconName } from '../../ui/Icon';
import { IconButton } from '../../ui/IconButton';
import { List } from '../../ui/List';
import { Nav } from '../../ui/Nav';
import { Search } from '../../ui/Search';
import { SegmentedTabs } from '../../ui/SegmentedTabs';
import { FlowPage, FlowPageList } from '../FlowPage';
import {
	createReminderScreenState,
	getReminderList,
	groupReminders,
	reminderFilterTabs,
	reminderLists,
	reminderSeeds,
	remindersNavItems,
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
};

type DraftReminder = {
	title: string;
	date: string;
	time: string;
	listId: ReminderListId;
};

type RouteState = {
	from?: string;
};

type ReminderAvatarMeta = {
	icon: IconName;
	label: string;
	colorToken: string;
};

const EMPTY_DRAFT: DraftReminder = {
	title: '',
	date: '',
	time: '',
	listId: 'work',
};

let reminderStore = reminderSeeds;

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

function formatDraftDateLabel(dateKey: string) {
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

function getDraftSection(dateKey: string): Exclude<ReminderSectionId, 'completed'> {
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

function createReminderFromDraft(draft: DraftReminder): Reminder {
	const section = getDraftSection(draft.date);

	return {
		id: `reminder-${Date.now()}`,
		title: draft.title.trim(),
		note: '',
		listId: draft.listId,
		section,
		activeSection: section,
		dueLabel: formatDraftDateLabel(draft.date),
		dueTime: draft.time || undefined,
		priority: 'normal',
		completed: false,
	};
}

function getReminderAvatarMeta(reminder: Reminder): ReminderAvatarMeta {
	if (reminder.completed) {
		return {
			icon: 'status-done-outline',
			label: 'Выполнено',
			colorToken: 'content-secondary',
		};
	}

	if (reminder.section === 'overdue') {
		return {
			icon: 'alarm-clock-warning-outline',
			label: 'Просрочено',
			colorToken: 'content-primary',
		};
	}

	if (reminder.section === 'today') {
		return {
			icon: 'calendar-today-outline',
			label: 'Сегодня',
			colorToken: 'content-primary',
		};
	}

	if (reminder.section === 'upcoming') {
		return {
			icon: 'calendar-week-outline',
			label: 'Позже',
			colorToken: 'content-secondary',
		};
	}

	return {
		icon: 'note-outline',
		label: 'Без срока',
		colorToken: 'content-secondary',
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

function ReminderRow({
	reminder,
	onToggle,
}: {
	reminder: Reminder;
	onToggle: () => void;
}) {
	const avatar = getReminderAvatarMeta(reminder);
	const isDone = reminder.completed;

	return (
		<Cell
			className={isDone ? 'reminders-screen__cell is-completed' : 'reminders-screen__cell'}
			leading={
				<Avatar background="content-background">
					<Icon
						name={avatar.icon}
						width={22}
						height={22}
						alt={avatar.label}
						colorToken={avatar.colorToken}
					/>
				</Avatar>
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
			trailing={
				<IconButton
					size={44}
					variant="primary"
					aria-label={isDone ? 'Вернуть в активные' : 'Отметить выполненным'}
					title={isDone ? 'Вернуть в активные' : 'Отметить выполненным'}
					onClick={onToggle}
				>
					<Icon
						name={isDone ? 'arrow-repeat' : 'done'}
						width={22}
						height={22}
						alt=""
						aria-hidden="true"
						colorToken="content-primary"
					/>
				</IconButton>
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
}: RemindersScreenProps) {
	const navigate = useNavigate();
	const location = useLocation();
	const routeState = (location.state ?? {}) as RouteState;
	const isSearchMode = mode === 'search';
	const [reminders, setReminders] = useReminderStore();
	const [searchQuery, setSearchQuery] = useState('');
	const [isComposerOpen, setIsComposerOpen] = useState(false);
	const [draft, setDraft] = useState<DraftReminder>(EMPTY_DRAFT);
	const {
		activeCount,
		overdueCount,
		filteredReminders,
		groupedReminders,
	} = useMemo(() => createReminderScreenState(reminders, filter), [filter, reminders]);
	const searchResults = useMemo(
		() => searchReminders(reminders, searchQuery),
		[reminders, searchQuery],
	);
	const groupedSearchResults = useMemo(
		() => groupReminders(searchResults),
		[searchResults],
	);
	const metaLabel =
		overdueCount > 0
			? `${activeCount} активных · ${overdueCount} просрочено`
			: `${activeCount} активных`;
	const isDraftValid = draft.title.trim().length > 0;
	const composerFormId = `reminders-composer-${filter}`;

	const updateDraft =
		(field: keyof DraftReminder) =>
		(event: ChangeEvent<HTMLInputElement>) => {
			setDraft((current) => ({
				...current,
				[field]: event.target.value,
			}));
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

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!isDraftValid) {
			return;
		}

		const nextReminder = createReminderFromDraft(draft);
		setReminders((current) => [nextReminder, ...current]);
		setDraft(EMPTY_DRAFT);
		setIsComposerOpen(false);
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
				<button
					className="reminders-screen__add-task"
					type={isComposerOpen ? 'submit' : 'button'}
					form={isComposerOpen ? composerFormId : undefined}
					disabled={isComposerOpen && !isDraftValid}
					onClick={() => {
						if (!isComposerOpen) {
							setIsComposerOpen(true);
						}
					}}
				>
					<Icon
						name={isComposerOpen ? 'done' : 'add'}
						width={20}
						height={20}
						alt=""
						aria-hidden="true"
					/>
					<span>{isComposerOpen ? 'Добавить' : 'Новая задача'}</span>
				</button>
			) : null}

			<Nav
				items={remindersNavItems.map((item) => {
					const isActive = item.id === 'tasks';

					return {
						id: item.id,
						label: item.label,
						active: isActive,
						disabled: !item.path,
						onClick: item.path ? () => navigate(item.path) : undefined,
						icon: (
							<Icon
								name={item.icon}
								width={20}
								height={20}
								alt=""
								aria-hidden="true"
								colorToken={isActive ? 'content-primary' : 'content-secondary'}
							/>
						),
					};
				})}
			/>
		</div>
	);

	return (
		<FlowPage
			title={isSearchMode ? undefined : title}
			header={
				isSearchMode ? undefined : (
					<Header
						title={title}
						meta={
							<Text variant="regular-14" color="secondary">
								{metaLabel}
							</Text>
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
		>
			{!isSearchMode && isComposerOpen ? (
				<form
					id={composerFormId}
					className="reminders-screen__composer"
					onSubmit={handleSubmit}
				>
					<div className="reminders-screen__composer-header">
						<Text variant="medium-18" color="primary">
							Новая задача
						</Text>
						<IconButton
							size={32}
							variant="secondary"
							aria-label="Закрыть ввод"
							onClick={() => {
								setIsComposerOpen(false);
								setDraft(EMPTY_DRAFT);
							}}
						>
							<Icon
								name="close"
								width={18}
								height={18}
								alt=""
								aria-hidden="true"
							/>
						</IconButton>
					</div>
					<Field
						label="Название"
						placeholder="Новое напоминание"
						value={draft.title}
						onChange={updateDraft('title')}
						autoFocus
					/>

					<div className="reminders-screen__draft-grid">
						<Field
							label="Дата"
							type="date"
							value={draft.date}
							onChange={updateDraft('date')}
						/>
						<Field
							label="Время"
							type="time"
							value={draft.time}
							onChange={updateDraft('time')}
						/>
					</div>

					<div className="reminders-screen__list-picker" aria-label="Список">
						{reminderLists.map((list) => (
							<button
								key={list.id}
								type="button"
								className={`reminders-screen__list-chip${
									draft.listId === list.id ? ' is-active' : ''
								}`}
								onClick={() =>
									setDraft((current) => ({ ...current, listId: list.id }))
								}
							>
								<Icon
									name={list.icon}
									width={18}
									height={18}
									alt=""
									aria-hidden="true"
									colorToken={
										draft.listId === list.id ? 'content-primary' : 'content-secondary'
									}
								/>
								<Text
									variant="medium-14"
									color={draft.listId === list.id ? 'primary' : 'secondary'}
								>
									{list.label}
								</Text>
							</button>
						))}
					</div>
				</form>
			) : null}

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
					{filteredReminders.length === 0 ? <EmptyRemindersState filter={filter} /> : null}
					{groupedReminders.map((section) => (
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
		</FlowPage>
	);
}
