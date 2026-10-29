import { defineApp, defineFlow, defineScreen } from '../definition';
import StatusBarLivePage from './live';
import StatusBarScrollPage from './scroll';
import StatusBarStatesPage from './states';

export const statusBarAppDefinition = defineApp({
	id: 'StatusBar',
	title: 'Статус-бар',
	businessGoal: 'Показать все состояния системного статус-бара в одном месте.',
	flows: [
		defineFlow({
			id: 'status-bar-states',
			title: 'Состояния статус-бара',
			businessGoal: 'Проверить цвет значков, индикаторы, скрытие и оверлеи.',
			screens: [
				defineScreen({
					id: 'states',
					title: 'Состояния',
					scenario: 'browse',
					businessGoal: 'Сравнить все варианты статус-бара на светлом, тёмном фоне и под затемнением.',
					Component: StatusBarStatesPage,
				}),
			],
		}),
		defineFlow({
			id: 'status-bar-dynamics',
			title: 'Динамика статус-бара',
			businessGoal: 'Увидеть, как бар меняется во времени и при прокрутке контента под ним.',
			screens: [
				defineScreen({
					id: 'live',
					title: 'Живой бар',
					scenario: 'inspect',
					businessGoal: 'Переключать состояния настоящего бара и запускать сценарий.',
					Component: StatusBarLivePage,
				}),
				defineScreen({
					id: 'scroll',
					title: 'Скролл и цвет',
					scenario: 'browse',
					businessGoal: 'Прокручивать цветной контент под прозрачными барами и видеть выбор цвета значков.',
					Component: StatusBarScrollPage,
				}),
			],
		}),
	],
});
