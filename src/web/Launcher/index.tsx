import { defineApp, defineFlow, defineScreen } from '../definition';
import { LauncherScreen } from './launcher';

export const launcherAppDefinition = defineApp({
	id: 'Launcher',
	title: 'Launcher',
	businessGoal: 'Оркестрировать системные жесты и запуск уже существующих приложений.',
	flows: [
		defineFlow({
			id: 'launcher',
			title: 'Системная навигация',
			businessGoal: 'Показать непрерывный анимированный путь от блокировки до приложения.',
			screens: [
				defineScreen({
					id: 'main',
					title: 'Launcher',
					scenario: 'preview',
					businessGoal: 'Демонстрация жестов, шторки, недавних приложений и запуска приложений.',
					Component: LauncherScreen,
				}),
			],
		}),
	],
});
