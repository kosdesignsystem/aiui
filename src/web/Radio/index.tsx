import { defineApp, defineFlow, defineScreen } from '../definition';
import { RadioScreen } from './main';

export const radioAppDefinition = defineApp({
	id: 'Radio',
	title: 'Радио',
	businessGoal: 'Дать быстрый доступ к интернет-радио в простом крупном интерфейсе.',
	flows: [
		defineFlow({
			id: 'listen',
			title: 'Прослушивание',
			businessGoal: 'Выбрать станцию и начать слушать одним нажатием.',
			screens: [
				defineScreen({
					id: 'main',
					title: 'Эфир',
					scenario: 'browse',
					businessGoal: 'Управлять текущей станцией и быстро переключать эфир.',
					Component: RadioScreen,
				}),
			],
		}),
	],
});
