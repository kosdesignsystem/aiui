import { remindersSeed } from './model';
import { RemindersMainScreen } from './screen';

export default function RemindersMainPage() {
	return <RemindersMainScreen tasks={remindersSeed} />;
}
