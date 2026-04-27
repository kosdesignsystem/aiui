import { defineApp, defineFlow, defineScreen } from '../definition';
import { RemindersAllScreen } from './all';
import { RemindersSearchScreen } from './search';
import { RemindersTodayScreen } from './today';

export const remindersAppDefinition = defineApp({
	id: 'Reminders',
	title: 'Напоминания',
	businessGoal: 'Помогать быстро фиксировать задачи и видеть, что требует внимания сегодня.',
	flows: [
		defineFlow({
			id: 'reminder-list',
			title: 'Список напоминаний',
			businessGoal: 'Один сценарий: обзор, поиск, добавление и завершение напоминаний.',
			screens: [
				defineScreen({
					id: 'today',
					title: 'Сегодня',
					scenario: 'browse',
					businessGoal: 'Показать напоминания на сегодня и просроченные задачи.',
					Component: RemindersTodayScreen,
				}),
				defineScreen({
					id: 'all',
					title: 'Все',
					scenario: 'browse',
					businessGoal: 'Показать все активные напоминания по группам сроков.',
					Component: RemindersAllScreen,
				}),
				defineScreen({
					id: 'search',
					title: 'Поиск',
					scenario: 'search',
					businessGoal: 'Найти напоминание по названию, заметке, списку или сроку.',
					Component: RemindersSearchScreen,
				}),
			],
		}),
	],
});
