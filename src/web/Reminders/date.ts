import type { Reminder, ReminderSectionId } from './model';

export type ActiveReminderSectionId = Exclude<ReminderSectionId, 'completed'>;

export function toDateKey(date: Date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
}

export function getTomorrow(date: Date) {
	const tomorrow = new Date(date);
	tomorrow.setDate(date.getDate() + 1);

	return tomorrow;
}

export function formatReminderDateLabel(dateKey: string) {
	if (!dateKey) {
		return 'Без срока';
	}

	const today = new Date();
	const tomorrow = getTomorrow(today);

	if (dateKey === toDateKey(today)) {
		return 'Сегодня';
	}

	if (dateKey === toDateKey(tomorrow)) {
		return 'Завтра';
	}

	const [year, month, day] = dateKey.split('-').map(Number);
	const date = new Date(year, month - 1, day);

	return new Intl.DateTimeFormat('ru-RU', {
		day: 'numeric',
		month: 'long',
	}).format(date);
}

export function getReminderSection(dateKey: string): ActiveReminderSectionId {
	if (!dateKey) {
		return 'no-date';
	}

	const todayKey = toDateKey(new Date());

	if (dateKey < todayKey) {
		return 'overdue';
	}

	if (dateKey === todayKey) {
		return 'today';
	}

	return 'upcoming';
}

export function restoreReminderSection(reminder: Reminder): ActiveReminderSectionId {
	if (reminder.dueLabel === 'Вчера') {
		return 'overdue';
	}

	if (reminder.dueLabel === 'Сегодня') {
		return 'today';
	}

	if (reminder.dueLabel === 'Без срока') {
		return 'no-date';
	}

	return 'upcoming';
}
