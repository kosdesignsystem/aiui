import { defineApp, defineFlow, defineScreen } from '../definition';
import ComponentsViewPage from './view';

export const componentsAppDefinition = defineApp({
	id: 'Components',
	title: 'Компоненты',
	businessGoal: 'Проверять экранные композиции и переиспользуемые UI-паттерны.',
	flows: [
		defineFlow({
			id: 'component-catalog',
			title: 'Витрина компонентов',
			businessGoal: 'Собрать экран из базовых блоков и проверить их состояния.',
			screens: [
				defineScreen({
					id: 'view',
					title: 'View',
					scenario: 'inspect',
					businessGoal: 'Показать составной экран и управлять вариантами его блоков.',
					Component: ComponentsViewPage,
				}),
			],
		}),
	],
});
