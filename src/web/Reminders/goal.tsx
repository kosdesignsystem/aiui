import { RemindersScreen } from './screen';

export function RemindersGoalSetupScreen() {
	return (
		<RemindersScreen
			title="Продуктивность"
			filter="today"
			modalPreview="goal-setup"
			previewGoal={15}
		/>
	);
}
