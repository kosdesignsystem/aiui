import { defineApp, defineFlow, defineScreen } from '../definition';
import { MyPhoneScreen } from './launcher';

export const myPhoneAppDefinition = defineApp({
	id: 'MyPhone',
	title: 'MyPhone',
	businessGoal: 'Оркестрировать системные жесты и запуск уже существующих приложений.',
	flows: [
		defineFlow({
			id: 'launcher',
			title: 'Системная навигация',
			businessGoal: 'Показать непрерывный анимированный путь от блокировки до приложения.',
			screens: [
				defineScreen({
					id: 'main',
					title: 'MyPhone',
					scenario: 'preview',
					businessGoal: 'Демонстрация жестов, шторки, недавних приложений и запуска приложений.',
					Component: MyPhoneScreen,
				}),
			],
		}),
	],
});
