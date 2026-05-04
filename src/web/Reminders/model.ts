import type { IconName } from '../../ui/Icon';
import { createAppScreenPath } from '../definition';

export const REMINDERS_APP_ID = 'Reminders';

export type ReminderFilter = 'today' | 'all';
export type ReminderSectionId = 'overdue' | 'today' | 'upcoming' | 'no-date' | 'completed';
export type ReminderPriority = 'high' | 'medium' | 'normal';
export type ReminderListId = 'work' | 'home' | 'personal';

export type ReminderList = {
	id: ReminderListId;
	label: string;
	icon: IconName;
};

export type Reminder = {
	id: string;
	title: string;
	note: string;
	listId: ReminderListId;
	section: ReminderSectionId;
	activeSection?: Exclude<ReminderSectionId, 'completed'>;
	dueLabel: string;
	dueTime?: string;
	repeatLabel?: string;
	priority: ReminderPriority;
	completed: boolean;
};

export const remindersRoutes = {
	today: createAppScreenPath(REMINDERS_APP_ID, 'today'),
	all: createAppScreenPath(REMINDERS_APP_ID, 'all'),
	search: createAppScreenPath(REMINDERS_APP_ID, 'search'),
} as const;

export const reminderFilterTabs = [
	{ id: 'today', label: 'Сегодня' },
	{ id: 'all', label: 'Все' },
] as const;

export const reminderLists: ReminderList[] = [
	{
		id: 'work',
		label: 'Работа',
		icon: 'work-outline',
	},
	{
		id: 'home',
		label: 'Дом',
		icon: 'home-outline',
	},
	{
		id: 'personal',
		label: 'Личное',
		icon: 'bookmark-outline',
	},
];

export const reminderSeeds: Reminder[] = [
	{
		id: 'reminder-1',
		title: 'Согласовать макет главного экрана',
		note: 'Проверить состояния пустого списка и поиска.',
		listId: 'work',
		section: 'today',
		dueLabel: 'Сегодня',
		dueTime: '10:30',
		priority: 'high',
		completed: false,
	},
	{
		id: 'reminder-2',
		title: 'Купить батарейки для датчика',
		note: 'AA, четыре штуки.',
		listId: 'home',
		section: 'today',
		dueLabel: 'Сегодня',
		dueTime: '18:00',
		priority: 'medium',
		completed: false,
	},
	{
		id: 'reminder-3',
		title: 'Отправить документы в бухгалтерию',
		note: 'Счета и акт за апрель.',
		listId: 'work',
		section: 'overdue',
		dueLabel: 'Вчера',
		dueTime: '17:45',
		priority: 'high',
		completed: false,
	},
	{
		id: 'reminder-4',
		title: 'Запланировать тренировку',
		note: 'Среда или пятница вечером.',
		listId: 'personal',
		section: 'upcoming',
		dueLabel: 'Завтра',
		dueTime: '20:00',
		repeatLabel: 'Еженедельно',
		priority: 'normal',
		completed: false,
	},
	{
		id: 'reminder-5',
		title: 'Разобрать входящие заметки',
		note: 'Перенести важное в проекты.',
		listId: 'personal',
		section: 'no-date',
		dueLabel: 'Без срока',
		priority: 'normal',
		completed: false,
	},
	{
		id: 'reminder-6',
		title: 'Позвонить поставщику',
		note: 'Уточнить окно доставки.',
		listId: 'work',
		section: 'completed',
		dueLabel: 'Сегодня',
		dueTime: '09:20',
		priority: 'medium',
		completed: true,
	},
];

export const reminderSectionOrder: ReminderSectionId[] = [
	'overdue',
	'today',
	'upcoming',
	'no-date',
	'completed',
];

export const reminderSectionTitles: Record<ReminderSectionId, string> = {
	overdue: 'Просрочено',
	today: 'Сегодня',
	upcoming: 'Позже',
	'no-date': 'Без срока',
	completed: 'Выполнено',
};

export function getReminderList(listId: ReminderListId) {
	return reminderLists.find((list) => list.id === listId) ?? reminderLists[0];
}

export function getRemindersByFilter(reminders: Reminder[], filter: ReminderFilter) {
	if (filter === 'today') {
		return reminders.filter(
			(reminder) => {
				if (reminder.section === 'today' || reminder.section === 'overdue') {
					return true;
				}

				if (!reminder.completed) {
					return false;
				}

				return (
					reminder.activeSection === 'today' ||
					reminder.activeSection === 'overdue' ||
					reminder.dueLabel === 'Сегодня' ||
					reminder.dueLabel === 'Вчера'
				);
			},
		);
	}

	return reminders;
}

function normalizeSearchValue(value: string) {
	return value.toLocaleLowerCase('ru-RU').trim();
}

export function searchReminders(reminders: Reminder[], rawQuery: string) {
	const query = normalizeSearchValue(rawQuery);

	if (!query) {
		return [];
	}

	return reminders.filter((reminder) => {
		const list = getReminderList(reminder.listId);
		const searchable = normalizeSearchValue(
			`${reminder.title} ${reminder.note} ${list.label} ${reminder.dueLabel}`,
		);

		return searchable.includes(query);
	});
}

export function groupReminders(reminders: Reminder[]) {
	return reminderSectionOrder
		.map((sectionId) => ({
			id: sectionId,
			title: reminderSectionTitles[sectionId],
			reminders: reminders.filter((reminder) => reminder.section === sectionId),
		}))
		.filter((section) => section.reminders.length > 0);
}

export function getActiveReminderCount(reminders: Reminder[]) {
	return reminders.filter((reminder) => !reminder.completed).length;
}

export function getOverdueReminderCount(reminders: Reminder[]) {
	return reminders.filter(
		(reminder) => !reminder.completed && reminder.section === 'overdue',
	).length;
}

export function createReminderScreenState(
	reminders: Reminder[],
	filter: ReminderFilter,
) {
	const filteredReminders = getRemindersByFilter(reminders, filter);

	return {
		activeCount: getActiveReminderCount(reminders),
		overdueCount: getOverdueReminderCount(reminders),
		filteredReminders,
		groupedReminders: groupReminders(filteredReminders),
	};
}
