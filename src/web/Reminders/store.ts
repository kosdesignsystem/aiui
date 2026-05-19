import { SetStateAction, useCallback, useState } from 'react';
import {
	formatReminderDateLabel,
	getReminderSection,
	restoreReminderSection,
	toDateKey,
} from './date';
import { reminderSeeds, type Reminder, type ReminderListId } from './model';
import {
	getStoredCompletedReminderIds,
	saveCompletedReminderIdsInSession,
} from './session';

const defaultCreateTaskListId: ReminderListId = 'personal';

let reminderStore = reminderSeeds;
let createdReminderCursor = 0;

export function getDefaultCreateTaskListId() {
	return defaultCreateTaskListId;
}

export function createReminderFromTitle(title: string): Reminder {
	const dateKey = toDateKey(new Date());
	const section = getReminderSection(dateKey);
	createdReminderCursor += 1;

	return {
		id: `reminder-${Date.now()}-${createdReminderCursor}`,
		title,
		note: '',
		listId: defaultCreateTaskListId,
		section,
		activeSection: section,
		dueLabel: formatReminderDateLabel(dateKey),
		priority: 'normal',
		completed: false,
	};
}

export function getCompletedReminderIds(reminders: Reminder[]) {
	return reminders
		.filter((reminder) => reminder.completed)
		.map((reminder) => reminder.id);
}

export function persistCompletedReminderIds(reminders: Reminder[]) {
	saveCompletedReminderIdsInSession(getCompletedReminderIds(reminders));
}

export function completeReminder(reminder: Reminder): Reminder {
	const activeSection =
		reminder.section === 'completed'
			? reminder.activeSection ?? restoreReminderSection(reminder)
			: reminder.section;

	return {
		...reminder,
		completed: true,
		activeSection,
		section: 'completed',
	};
}

export function reopenReminder(reminder: Reminder): Reminder {
	return {
		...reminder,
		completed: false,
		section: reminder.activeSection ?? restoreReminderSection(reminder),
	};
}

export function syncRemindersWithCompletedIds(
	reminders: Reminder[],
	completedReminderIds: string[],
): Reminder[] {
	const completedReminderIdSet = new Set(completedReminderIds);

	return reminders.map((reminder) => {
		const shouldBeCompleted = completedReminderIdSet.has(reminder.id);

		if (shouldBeCompleted === reminder.completed) {
			return reminder;
		}

		return shouldBeCompleted ? completeReminder(reminder) : reopenReminder(reminder);
	});
}

export function useReminderStore() {
	const [reminders, setReminderState] = useState(() => {
		const nextReminders = syncRemindersWithCompletedIds(
			reminderStore,
			getStoredCompletedReminderIds(),
		);

		reminderStore = nextReminders;
		return nextReminders;
	});

	const setReminders = useCallback((updater: SetStateAction<Reminder[]>) => {
		setReminderState((current) => {
			const nextReminders =
				typeof updater === 'function'
					? (updater as (value: Reminder[]) => Reminder[])(current)
					: updater;

			reminderStore = nextReminders;
			return nextReminders;
		});
	}, []);

	return [reminders, setReminders] as const;
}
