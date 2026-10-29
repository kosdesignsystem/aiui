import { defineApp, defineFlow, defineScreen } from '../definition';
import StatusBarStatesPage from './states';

export const statusBarAppDefinition = defineApp({
	id: 'StatusBar',
	title: 'Статус-бар',
	businessGoal: 'Показать все состояния системного статус-бара в одном месте.',
	flows: [
		defineFlow({
			id: 'status-bar-states',
			title: 'Состояния статус-бара',
			businessGoal: 'Проверить цвет значков, индикаторы, скрытие и оверлеи.',
			screens: [
				defineScreen({
					id: 'states',
					title: 'Состояния',
					scenario: 'browse',
					businessGoal: 'Сравнить все варианты статус-бара на светлом, тёмном фоне и под затемнением.',
					Component: StatusBarStatesPage,
				}),
			],
		}),
	],
});
