import { RemindersScreen } from './screen';

export function RemindersCreateTaskScreen() {
	return (
		<RemindersScreen
			title="Создание задачи"
			filter="today"
			modalPreview="create-task"
		/>
	);
}
