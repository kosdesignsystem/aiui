import { defineApp, defineFlow, defineScreen } from '../definition';
import { MaxMainScreen } from './main';

export const maxAppDefinition = defineApp({
	id: 'Max',
	title: 'Макс',
	businessGoal: 'Показать минимальный экран приложения Макс с зеленым фоном.',
	flows: [
		defineFlow({
			id: 'main',
			title: 'Главный экран',
			businessGoal: 'Открыть приложение на чистом зеленом фоне.',
			screens: [
				defineScreen({
					id: 'main',
					title: 'Главный экран',
					scenario: 'preview',
					businessGoal: 'Заполнить экран приложения зеленым цветом.',
					Component: MaxMainScreen,
				}),
			],
		}),
	],
});
