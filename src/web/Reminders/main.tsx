import { ChangeEvent, KeyboardEvent, useMemo, useState } from 'react';
import { App } from '../../ui/App';
import { Avatar } from '../../ui/Avatar';
import { Cell } from '../../ui/Cell';
import { Text } from '../../ui/Fonts';
import { Header } from '../../ui/Header';
import { Icon } from '../../ui/Icon';
import { IconButton } from '../../ui/IconButton';
import { List, ListContainer } from '../../ui/List';
import { SearchBar, SearchBarButton } from '../../ui/SearchBar';
import { SegmentedTabs } from '../../ui/SegmentedTabs';
import { View } from '../../ui/View';
import './main.scss';

type Reminder = {
	id: string;
	title: string;
	timeLabel: string;
	completed: boolean;
};

type ReminderFilter = 'all' | 'active' | 'completed';

const reminderFilterTabs = [
	{ id: 'all', label: 'Все' },
	{ id: 'active', label: 'Активные' },
	{ id: 'completed', label: 'Выполненные' },
] as const;

const initialReminders: Reminder[] = [
	{ id: 'rem-1', title: 'Оплатить интернет', timeLabel: 'Сегодня, 17:30', completed: false },
	{ id: 'rem-2', title: 'Купить продукты', timeLabel: 'Сегодня, 19:00', completed: false },
	{ id: 'rem-3', title: 'Позвонить маме', timeLabel: 'Завтра, 09:00', completed: true },
	{ id: 'rem-4', title: 'Подготовить отчёт', timeLabel: 'Завтра, 11:45', completed: false },
];

function makeReminderId() {
	return `rem-${Date.now()}-${Math.round(Math.random() * 1000)}`;
}

function createReminder(title: string) {
	const time = new Intl.DateTimeFormat('ru-RU', {
		hour: '2-digit',
		minute: '2-digit',
	}).format(new Date());

	return {
		id: makeReminderId(),
		title,
		timeLabel: `Сегодня, ${time}`,
		completed: false,
	};
}

function isReminderVisible(reminder: Reminder, filter: ReminderFilter) {
	if (filter === 'active') {
		return !reminder.completed;
	}

	if (filter === 'completed') {
		return reminder.completed;
	}

	return true;
}

function ReminderRow({
	reminder,
	onToggle,
	onDelete,
}: {
	reminder: Reminder;
	onToggle: () => void;
	onDelete: () => void;
}) {
	return (
		<Cell
			variant={reminder.completed ? 'primary' : 'default'}
			leading={
				<Avatar background={reminder.completed ? 'system-success-background' : 'accent-background'}>
					<Icon
						name={reminder.completed ? 'done' : 'clock-outline'}
						width={20}
						height={20}
						alt=""
						aria-hidden="true"
						colorToken={reminder.completed ? 'system-success-primary' : 'accent-primary'}
					/>
				</Avatar>
			}
			title={
				<Text variant="regular-18" color={reminder.completed ? 'secondary' : 'primary'}>
					<span className={reminder.completed ? 'reminders-main__title--completed' : undefined}>
						{reminder.title}
					</span>
				</Text>
			}
			subtitle={
				<Text variant="regular-14" color="secondary">
					{reminder.timeLabel}
				</Text>
			}
			trailing={
				<div className="reminders-main__actions">
					<IconButton
						type="button"
						size={44}
						variant={reminder.completed ? 'primary' : 'success'}
						aria-label={reminder.completed ? 'Вернуть в активные' : 'Отметить как выполненное'}
						onClick={onToggle}
					>
						<Icon
							name={reminder.completed ? 'undo' : 'done-all'}
							alt=""
							width={20}
							height={20}
							aria-hidden="true"
							colorToken="var(--ui-icon-button-color)"
						/>
					</IconButton>
					<IconButton
						type="button"
						size={44}
						variant="danger"
						aria-label="Удалить напоминание"
						onClick={onDelete}
					>
						<Icon
							name="delete-outline"
							alt=""
							width={20}
							height={20}
							aria-hidden="true"
							colorToken="var(--ui-icon-button-color)"
						/>
					</IconButton>
				</div>
			}
		/>
	);
}

function ReminderSection({
	title,
	reminders,
	onToggle,
	onDelete,
}: {
	title: string;
	reminders: Reminder[];
	onToggle: (id: string) => void;
	onDelete: (id: string) => void;
}) {
	if (reminders.length === 0) {
		return null;
	}

	return (
		<List title={title}>
			{reminders.map((reminder) => (
				<ReminderRow
					key={reminder.id}
					reminder={reminder}
					onToggle={() => onToggle(reminder.id)}
					onDelete={() => onDelete(reminder.id)}
				/>
			))}
		</List>
	);
}

function EmptyReminderState({ filter }: { filter: ReminderFilter }) {
	const titleByFilter: Record<ReminderFilter, string> = {
		all: 'Напоминаний пока нет',
		active: 'Активных напоминаний нет',
		completed: 'Выполненных напоминаний нет',
	};

	const subtitleByFilter: Record<ReminderFilter, string> = {
		all: 'Добавьте новое напоминание через поле выше.',
		active: 'Все текущие задачи уже выполнены.',
		completed: 'Отмечайте задачи выполненными, чтобы увидеть их здесь.',
	};

	return (
		<List title="Пусто">
			<Cell
				leading={
					<Avatar background="content-background">
						<Icon name="note-outline" width={20} height={20} alt="" aria-hidden="true" />
					</Avatar>
				}
				title={
					<Text variant="medium-18" color="primary">
						{titleByFilter[filter]}
					</Text>
				}
				subtitle={
					<Text variant="regular-14" color="secondary">
						{subtitleByFilter[filter]}
					</Text>
				}
			/>
		</List>
	);
}

export default function RemindersMainPage() {
	const [filter, setFilter] = useState<ReminderFilter>('all');
	const [draft, setDraft] = useState('');
	const [reminders, setReminders] = useState(initialReminders);

	const visibleReminders = useMemo(
		() => reminders.filter((reminder) => isReminderVisible(reminder, filter)),
		[filter, reminders],
	);
	const completedCount = useMemo(
		() => reminders.filter((reminder) => reminder.completed).length,
		[reminders],
	);
	const activeCount = reminders.length - completedCount;

	const addReminder = () => {
		const title = draft.trim();

		if (!title) {
			return;
		}

		setReminders((prev) => [createReminder(title), ...prev]);
		setDraft('');
	};

	const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key !== 'Enter') {
			return;
		}

		event.preventDefault();
		addReminder();
	};

	const toggleReminder = (id: string) => {
		setReminders((prev) =>
			prev.map((reminder) =>
				reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder,
			),
		);
	};

	const deleteReminder = (id: string) => {
		setReminders((prev) => prev.filter((reminder) => reminder.id !== id));
	};

	const activeReminders = visibleReminders.filter((reminder) => !reminder.completed);
	const doneReminders = visibleReminders.filter((reminder) => reminder.completed);

	return (
		<App>
			<Header title="Напоминания" />

			<div className="reminders-main__composer">
				<SearchBar
					type="text"
					hideSearchIcon={true}
					placeholder="Добавить напоминание"
					aria-label="Новое напоминание"
					value={draft}
					onChange={(event: ChangeEvent<HTMLInputElement>) => setDraft(event.target.value)}
					onKeyDown={handleInputKeyDown}
					rightButton={
						<SearchBarButton
							type="button"
							onClick={addReminder}
							disabled={draft.trim().length === 0}
							aria-label="Добавить напоминание"
						>
							<Icon name="add" alt="" width={20} height={20} aria-hidden="true" />
						</SearchBarButton>
					}
				/>
			</div>

			<SegmentedTabs
				tabs={reminderFilterTabs}
				value={filter}
				onChange={(tabId) => setFilter(tabId as ReminderFilter)}
			/>

			<View>
				<ListContainer>
					<List title="Статус">
						<Cell
							leading={
								<Avatar background="accent-background">
									<Icon
										name="list-check"
										alt=""
										width={20}
										height={20}
										aria-hidden="true"
										colorToken="accent-primary"
									/>
								</Avatar>
							}
							title={
								<Text variant="medium-18" color="primary">
									Активных: {activeCount}
								</Text>
							}
							subtitle={
								<Text variant="regular-14" color="secondary">
									Выполнено: {completedCount}
								</Text>
							}
						/>
					</List>

					{visibleReminders.length === 0 ? <EmptyReminderState filter={filter} /> : null}
					<ReminderSection
						title={filter === 'all' ? 'Активные' : 'Список'}
						reminders={activeReminders}
						onToggle={toggleReminder}
						onDelete={deleteReminder}
					/>
					<ReminderSection
						title="Выполненные"
						reminders={doneReminders}
						onToggle={toggleReminder}
						onDelete={deleteReminder}
					/>
				</ListContainer>
			</View>
		</App>
	);
}
