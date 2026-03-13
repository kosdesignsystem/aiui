import { App } from '../../ui/App';
import { Text } from '../../ui/Fonts';
import { Header } from '../../ui/Header';
import { Icon } from '../../ui/Icon';
import { List, ListContainer } from '../../ui/List';
import { View } from '../../ui/View';
import { ReminderTask } from './model';
import './screen.scss';

type RemindersScreenProps = {
	tasks: ReminderTask[];
	onToggleTask: (taskId: string) => void;
};

function ReminderRow({ task, onToggleTask }: { task: ReminderTask; onToggleTask: (taskId: string) => void }) {
	return (
		<div className="reminders-row" role="listitem">
			<button
				type="button"
				className={`reminders-row__check ${task.done ? 'is-done' : ''}`}
				onClick={() => onToggleTask(task.id)}
				aria-label={`${task.done ? 'Снять отметку' : 'Отметить как выполненную'}: ${task.title}`}
			>
				{task.done ? <Icon name="done" width={16} height={16} alt="" aria-hidden="true" /> : null}
			</button>

			<div className="reminders-row__content">
				<Text as="p" variant="medium-18" color="primary">
					{task.title}
				</Text>

				<Text as="p" variant="regular-14" color="secondary">
					{task.details}
				</Text>

				<Text as="p" variant="regular-14" color="secondary">
					{task.timeLabel}
				</Text>
			</div>
		</div>
	);
}

export function RemindersMainScreen({ tasks, onToggleTask }: RemindersScreenProps) {
	const completedCount = tasks.filter((task) => task.done).length;
	const completedPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

	return (
		<App>
			<div className="reminders-screen">
				<Header title="Напоминания" />

				<View>
					<div className="reminders-screen__content">
						<Text as="p" variant="regular-16" color="secondary">
							Задачи по посадке винограда
						</Text>

						<Text as="p" variant="regular-14" color="secondary">
							Выполнено: {completedPercent}%
						</Text>

						<ListContainer>
							<List>
								<div role="list" className="reminders-list">
									{tasks.map((task) => (
										<ReminderRow key={task.id} task={task} onToggleTask={onToggleTask} />
									))}
								</div>
							</List>
						</ListContainer>
					</div>
				</View>
			</div>
		</App>
	);
}
