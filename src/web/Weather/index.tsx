import { defineApp, defineFlow, defineScreen } from '../definition';
import WeatherMainPage from './main';

export const weatherAppDefinition = defineApp({
	id: 'Weather',
	title: 'Погода',
	businessGoal: 'Показывать текущую погоду и прогноз для выбранного города.',
	flows: [
		defineFlow({
			id: 'forecast',
			title: 'Прогноз',
			businessGoal: 'Быстро оценить текущие условия и прогноз на неделю.',
			screens: [
				defineScreen({
					id: 'main',
					title: 'Москва',
					scenario: 'browse',
					businessGoal: 'Показать подробный прогноз погоды для Москвы.',
					Component: WeatherMainPage,
				}),
			],
		}),
	],
});
