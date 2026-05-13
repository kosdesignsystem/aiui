import { RemindersScreen } from './screen';

export function RemindersGoalSetupScreen() {
	return (
		<RemindersScreen
			title="Настройка количества дневных задач"
			filter="today"
			modalPreview="goal-setup"
		/>
	);
}
