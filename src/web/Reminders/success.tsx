import { RemindersScreen } from './screen';
import { SUCCESS_GOAL_PREVIEW } from './progress';

export function RemindersSuccessScreen() {
	return (
		<RemindersScreen
			title="Успех"
			filter="today"
			modalPreview="success"
			previewGoal={SUCCESS_GOAL_PREVIEW}
		/>
	);
}
