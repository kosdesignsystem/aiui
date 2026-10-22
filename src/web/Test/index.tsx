import { defineApp, defineFlow, defineScreen } from '../definition';
import { TestScreen } from './main';

export const testAppDefinition = defineApp({
	id: 'Test',
	title: 'Тест',
	businessGoal: 'Показать тестовое приложение.',
	flows: [
		defineFlow({
			id: 'main',
			title: 'Тест',
			businessGoal: 'Открыть тестовый экран.',
			screens: [
				defineScreen({
					id: 'main',
					title: 'Тест',
					scenario: 'browse',
					businessGoal: 'Показать слово «тест».',
					Component: TestScreen,
				}),
			],
		}),
	],
});
