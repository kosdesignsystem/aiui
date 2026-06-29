import CallsMainPage from './Calls/main';
import CallsMissedPage from './Calls/missed';
import CallsSearchPage from './Calls/search';
import CalculatorMainPage from './Calculator/main';
import CameraMainPage from './Camera/main';
import { componentsAppDefinition } from './Components';
import KidCallsMainPage from './KidCalls/main';
import { defineApp, defineFlow, defineScreen } from './definition';

export {
	createAppScreenPath,
	findAppScreen,
	flattenAppScreens,
	getDefaultAppScreenPath,
	type AppDefinition,
	type AppFlowDefinition,
	type AppScreenDefinition,
	type AppScreenEntry,
	type ScreenScenario,
} from './definition';

const callsAppDefinition = defineApp({
	id: 'Calls',
	title: 'Звонки',
	businessGoal: 'Показывать историю вызовов и быстрый поиск по звонкам.',
	flows: [
		defineFlow({
			id: 'call-history',
			title: 'История вызовов',
			businessGoal: 'Один сценарий: обзор истории, фильтрация пропущенных и поиск.',
			screens: [
				defineScreen({
					id: 'main',
					title: 'Главный экран',
					scenario: 'browse',
					businessGoal: 'Показать всю историю вызовов.',
					Component: CallsMainPage,
				}),
				defineScreen({
					id: 'missed',
					title: 'Пропущенные',
					scenario: 'browse',
					businessGoal: 'Сфокусировать пользователя на пропущенных вызовах.',
					Component: CallsMissedPage,
				}),
				defineScreen({
					id: 'search',
					title: 'Поиск',
					scenario: 'search',
					businessGoal: 'Найти звонок по контакту внутри истории.',
					Component: CallsSearchPage,
				}),
			],
		}),
	],
});

const kidCallsAppDefinition = defineApp({
	id: 'KidCalls',
	title: 'Детские звонки',
	businessGoal: 'Показать сценарий звонков со смарт-часов для ребенка.',
	flows: [
		defineFlow({
			id: 'kid-watch',
			title: 'Смарт-часы 5+',
			businessGoal: 'Оставить исходный AE-сценарий детских контактов без переписывания.',
			screens: [
				defineScreen({
					id: 'main',
					title: 'Смарт-часы 5+',
					scenario: 'browse',
					businessGoal: 'Показать экран детских звонков из AE.',
					Component: KidCallsMainPage,
				}),
			],
		}),
	],
});

const cameraAppDefinition = defineApp({
	id: 'Camera',
	title: 'Камера',
	businessGoal: 'Показать мобильный сценарий камеры из AE.',
	flows: [
		defineFlow({
			id: 'mobile-camera',
			title: 'Мобильная камера',
			businessGoal: 'Оставить текущую AE-реализацию камеры и подключить ее к новому реестру.',
			screens: [
				defineScreen({
					id: 'main',
					title: 'Мобильная камера',
					scenario: 'preview',
					businessGoal: 'Показать экран камеры из AE.',
					Component: CameraMainPage,
				}),
			],
		}),
	],
});

const calculatorAppDefinition = defineApp({
	id: 'Calculator',
	title: 'Калькулятор',
	businessGoal: 'Показать базовый калькулятор из AE.',
	flows: [
		defineFlow({
			id: 'basic-calculator',
			title: 'Базовый',
			businessGoal: 'Оставить текущий AE-сценарий калькулятора без переписывания.',
			screens: [
				defineScreen({
					id: 'main',
					title: 'Базовый',
					scenario: 'preview',
					businessGoal: 'Показать экран калькулятора из AE.',
					Component: CalculatorMainPage,
				}),
			],
		}),
	],
});

export const appRegistry = [
	callsAppDefinition,
	kidCallsAppDefinition,
	cameraAppDefinition,
	calculatorAppDefinition,
	componentsAppDefinition,
];
