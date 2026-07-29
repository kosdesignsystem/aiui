import { defineApp, defineFlow, defineScreen } from '../definition';
import SashaMainPage from './main';

export const sashaAppDefinition = defineApp({
	id: 'Sasha',
	title: 'Саша',
	businessGoal: 'Показать простой экран с желтым фоном.',
	flows: [
		defineFlow({
			id: 'yellow-screen',
			title: 'Желтый экран',
			businessGoal: 'Открыть однотонный желтый экран.',
			screens: [
				defineScreen({
					id: 'main',
					title: 'Главный экран',
					scenario: 'preview',
					businessGoal: 'Заполнить экран желтым цветом.',
					Component: SashaMainPage,
				}),
			],
		}),
	],
});
