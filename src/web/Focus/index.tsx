import { defineApp, defineFlow, defineScreen } from '../definition';
import { FocusScreen } from './main';

export const focusAppDefinition = defineApp({
	id: 'Focus',
	title: 'Фокус',
	businessGoal: 'Помочь сосредоточиться с таймером Pomodoro и спокойными ambient-сценами.',
	flows: [
		defineFlow({
			id: 'session',
			title: 'Фокус-сессия',
			businessGoal: 'Запустить и завершить рабочий интервал без отвлечений.',
			screens: [
				defineScreen({
					id: 'main',
					title: 'Ambient-таймер',
					scenario: 'browse',
					businessGoal: 'Управлять таймером и выбирать атмосферу для работы.',
					Component: FocusScreen,
				}),
			],
		}),
	],
});
