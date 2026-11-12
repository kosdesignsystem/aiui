import { defineApp, defineFlow, defineScreen } from '../definition';
import { CameraMainScreen } from './main';

export const cameraAppDefinition = defineApp({
	id: 'Camera',
	title: 'Камера',
	businessGoal: 'Демонстрировать интерфейс съёмки и быстрые настройки камеры.',
	flows: [defineFlow({
		id: 'camera', title: 'Съёмка',
		businessGoal: 'Переключаться между основными элементами камеры и панелью настроек.',
		screens: [defineScreen({
			id: 'main', title: 'Камера', scenario: 'preview',
			businessGoal: 'Показать видоискатель, управление съёмкой и четыре быстрые настройки.',
			Component: CameraMainScreen,
		})],
	})],
});
