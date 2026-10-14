import { Avatar } from '../../ui/Avatar';
import { Cell } from '../../ui/Cell';
import { Text } from '../../ui/Fonts';
import { Icon } from '../../ui/Icon';
import { List } from '../../ui/List';
import { getReminderList, type Reminder, type ReminderFilter } from './model';
import { TaskProgressMeter, WeekdayPlan } from './progress';

export function formatReminderMeta(reminder: Reminder) {
	const list = getReminderList(reminder.listId);
	const segments = [
		reminder.dueTime ? `${reminder.dueLabel}, ${reminder.dueTime}` : reminder.dueLabel,
		list.label,
		reminder.repeatLabel,
	].filter(Boolean);

	return segments.join(' · ');
}

export function getPlanProgress(reminders: Reminder[]) {
	return {
		completedCount: reminders.filter((reminder) => reminder.completed).length,
	};
}

export function PlanProgress({
	filter,
	completedCount,
	planGoal,
	selectedDays,
}: {
	filter: ReminderFilter;
	completedCount: number;
	planGoal: number;
	selectedDays: number[];
}) {
	if (filter === 'all') {
		return (
			<section className="reminders-screen__plan" aria-label="Прогресс недели">
				<WeekdayPlan
					selectedDays={selectedDays}
					disabledDays={[5, 6]}
					className="reminders-screen__week-stat"
				/>
			</section>
		);
	}

	return (
		<section className="reminders-screen__plan" aria-label="Прогресс дневной нормы">
			<TaskProgressMeter value={completedCount} max={planGoal} />
		</section>
	);
}

export function ReminderRow({
	reminder,
	onToggle,
}: {
	reminder: Reminder;
	onToggle: () => void;
}) {
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

export function EmptyRemindersState({ filter }: { filter: ReminderFilter }) {
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

export function SearchEmptyState() {
	return (
		<div className="reminders-screen__search-empty">
			<Text variant="regular-20" color="secondary">
				Ничего не найдено
			</Text>
		</div>
	);
}
