import { useState } from 'react';
import { remindersSeed } from './model';
import { RemindersMainScreen } from './screen';

export default function RemindersMainPage() {
	const [tasks, setTasks] = useState(remindersSeed);

	const handleToggleTask = (taskId: string) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) => (task.id === taskId ? { ...task, done: !task.done } : task)),
		);
	};

	return <RemindersMainScreen tasks={tasks} onToggleTask={handleToggleTask} />;
}
