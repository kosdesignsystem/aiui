import { defineApp, defineFlow, defineScreen } from '../definition';
import TestMainPage from './main';

export const testAppDefinition = defineApp({
	id: 'Test',
	title: 'Test',
	businessGoal: 'Показать один экран с приветствием.',
	flows: [
		defineFlow({
			id: 'greeting',
			title: 'Приветствие',
			businessGoal: 'Открыть экран с текстом «Привет».',
			screens: [
				defineScreen({
					id: 'main',
					title: 'Главный экран',
					scenario: 'preview',
					businessGoal: 'Показать слово «Привет».',
					Component: TestMainPage,
				}),
			],
		}),
	],
});
