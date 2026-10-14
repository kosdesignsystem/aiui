import { defineApp, defineFlow, defineScreen } from '../definition';
import AlertPlaygroundPage from './playground';

export const alertAppDefinition = defineApp({
	id: 'Alert',
	title: 'Alert',
	businessGoal: 'Проверять варианты, состояния и поведение модальных алертов.',
	flows: [
		defineFlow({
			id: 'alert-component',
			title: 'Компонент Alert',
			businessGoal: 'Настроить алерт и проверить его в живом контексте.',
			screens: [
				defineScreen({
					id: 'playground',
					title: 'Playground',
					scenario: 'preview',
					businessGoal: 'Переключать варианты Alert и проверять их состояния.',
					Component: AlertPlaygroundPage,
				}),
			],
		}),
	],
});
