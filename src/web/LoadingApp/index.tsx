import { defineApp, defineFlow, defineScreen } from '../definition';
import { LoadingButtonScreen } from './ButtonLoaderScreen';
import { LoadingAppScreen } from './LoadingScreen';

export const loadingAppDefinition = defineApp({
	id: 'LoadingApp',
	title: 'Loading App',
	businessGoal: 'Показать темный загрузочный экран с центральной иконкой часов.',
	flows: [
		defineFlow({
			id: 'loading',
			title: 'Загрузка',
			businessGoal: 'Один сценарий: визуально удерживать состояние ожидания.',
			screens: [
				defineScreen({
					id: 'main',
					title: 'Loading',
					scenario: 'preview',
					businessGoal: 'Отобразить центральную иконку Clock на темном фоне.',
					Component: LoadingAppScreen,
				}),
				defineScreen({
					id: 'button-loader',
					title: 'Button Loader',
					scenario: 'preview',
					businessGoal: 'Показать disabled-кнопку с настраиваемым hex-loader внутри.',
					Component: LoadingButtonScreen,
				}),
			],
		}),
	],
});
