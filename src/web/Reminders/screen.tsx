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
};

function ReminderRow({ task }: { task: ReminderTask }) {
	return (
		<div className="reminders-row" role="listitem">
			<div className={`reminders-row__check ${task.done ? 'is-done' : ''}`} aria-hidden="true">
				{task.done ? <Icon name="done" width={16} height={16} alt="" aria-hidden="true" /> : null}
			</div>

			<div className="reminders-row__content">
				<Text as="p" variant="medium-18" color="primary">
					{task.title}
				</Text>

				<Text as="p" variant="regular-14" color="secondary">
					{task.details}
				</Text>
			</div>

			<Text as="p" variant="regular-14" color="secondary">
				{task.timeLabel}
			</Text>
		</div>
	);
}

export function RemindersMainScreen({ tasks }: RemindersScreenProps) {
	return (
		<App>
			<div className="reminders-screen">
				<Header title="Напоминания" />

				<View>
					<div className="reminders-screen__content">
						<Text as="p" variant="regular-16" color="secondary">
							Задачи по посадке винограда
						</Text>

						<ListContainer>
							<List>
								<div role="list" className="reminders-list">
									{tasks.map((task) => (
										<ReminderRow key={task.id} task={task} />
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
