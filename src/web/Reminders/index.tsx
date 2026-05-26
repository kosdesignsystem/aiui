import { defineApp, defineFlow, defineScreen } from '../definition';
import { RemindersAllScreen } from './all';
import { RemindersCreateTaskScreen } from './create';
import { RemindersGoalSetupScreen } from './goal';
import { RemindersSearchScreen } from './search';
import { RemindersSuccessScreen } from './success';
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
				defineScreen({
					id: 'create',
					title: 'Создание задачи',
					scenario: 'preview',
					businessGoal: 'Показать состояние модалки создания новой задачи.',
					Component: RemindersCreateTaskScreen,
				}),
				defineScreen({
					id: 'goal',
					title: 'Продуктивность',
					scenario: 'preview',
					businessGoal: 'Показать состояние модалки настройки дневной нормы задач.',
					Component: RemindersGoalSetupScreen,
				}),
				defineScreen({
					id: 'success',
					title: 'Успех',
					scenario: 'preview',
					businessGoal: 'Показать состояние модалки успешного выполнения дневного плана.',
					Component: RemindersSuccessScreen,
				}),
			],
		}),
	],
});
