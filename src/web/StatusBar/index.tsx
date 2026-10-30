import { defineApp, defineFlow, defineScreen } from '../definition';
import StatusBarHub from './hub';

export const statusBarAppDefinition = defineApp({
	id: 'StatusBar',
	title: 'Статус-бар и навбар',
	businessGoal: 'Показать все состояния системного статус-бара и навбара в одном месте.',
	flows: [
		defineFlow({
			id: 'status-bar',
			title: 'Статус-бар и навбар',
			businessGoal: 'Проверить цвет значков, индикаторы, режимы, скролл и изображение под барами.',
			screens: [
				defineScreen({
					id: 'main',
					title: 'Статус-бар и навбар',
					scenario: 'inspect',
					businessGoal: 'Переключать сцены: состояния, живой бар, цвет приложения, скролл, изображение.',
					Component: StatusBarHub,
				}),
			],
		}),
	],
});
