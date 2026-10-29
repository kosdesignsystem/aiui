import { defineApp, defineFlow, defineScreen } from '../definition';
import StatusBarLivePage from './live';
import StatusBarAppColorPage from './app-color';
import StatusBarFullscreenImagePage from './fullscreen-image';
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
			businessGoal: 'Увидеть, как бар меняется во времени и как он выглядит над цветом приложения и над изображением.',
			screens: [
				defineScreen({
					id: 'live',
					title: 'Живой бар',
					scenario: 'inspect',
					businessGoal: 'Переключать состояния настоящего бара и запускать сценарий.',
					Component: StatusBarLivePage,
				}),
				defineScreen({
					id: 'app-color',
					title: 'Цвет приложения',
					scenario: 'browse',
					businessGoal: 'Показать зону баров, закрашенную цветом приложения, при прокрутке контента.',
					Component: StatusBarAppColorPage,
				}),
				defineScreen({
					id: 'scroll',
					title: 'Скролл под баром',
					scenario: 'browse',
					businessGoal: 'Показать фиксированные значки над прокручиваемым контентом с градиентом защиты.',
					Component: StatusBarScrollPage,
				}),
				defineScreen({
					id: 'fullscreen-image',
					title: 'Изображение на весь экран',
					scenario: 'preview',
					businessGoal: 'Показать значки поверх изображения под обоими барами.',
					Component: StatusBarFullscreenImagePage,
				}),
			],
		}),
	],
});
