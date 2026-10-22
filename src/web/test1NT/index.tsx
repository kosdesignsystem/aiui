import { defineApp, defineFlow, defineScreen } from '../definition';
import { Test1NTMainScreen } from './main';

export const test1NTAppDefinition = defineApp({
	id: 'test1NT',
	title: 'test1NT',
	businessGoal: 'Предоставить тестовое приложение для проверки интерфейса и взаимодействий.',
	flows: [
		defineFlow({
			id: 'test-interaction',
			title: 'Проверка взаимодействий',
			businessGoal: 'Проверить изменение и сброс состояния на главном экране.',
			screens: [
				defineScreen({
					id: 'main',
					title: 'Главный экран',
					scenario: 'preview',
					businessGoal: 'Показать приветствие и интерактивный счётчик.',
					Component: Test1NTMainScreen,
				}),
			],
		}),
	],
});
