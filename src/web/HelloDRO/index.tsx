import { defineApp, defineFlow, defineScreen } from '../definition';
import { HelloDROScreen } from './main';

export const helloDROAppDefinition = defineApp({
	id: 'HelloDRO',
	title: 'Привет, DRO',
	businessGoal: 'Поприветствовать DRO.',
	flows: [
		defineFlow({
			id: 'greeting',
			title: 'Приветствие',
			businessGoal: 'Показать дружелюбное приветствие.',
			screens: [
				defineScreen({
					id: 'main',
					title: 'Привет, DRO',
					scenario: 'preview',
					businessGoal: 'Показать приветствие и машущую руку.',
					Component: HelloDROScreen,
				}),
			],
		}),
	],
});
