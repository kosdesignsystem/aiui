import { defineApp, defineFlow, defineScreen } from '../definition';
import ComponentsActionsPage from './actions';
import ComponentsContentPage from './content';
import ComponentsInputsPage from './inputs';
import ComponentsNavigationPage from './navigation';
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
				defineScreen({
					id: 'actions',
					title: 'Actions',
					scenario: 'preview',
					businessGoal: 'Показать кнопки и их вариации.',
					Component: ComponentsActionsPage,
				}),
				defineScreen({
					id: 'inputs',
					title: 'Inputs',
					scenario: 'preview',
					businessGoal: 'Показать поля ввода, поиск и переключатели.',
					Component: ComponentsInputsPage,
				}),
				defineScreen({
					id: 'navigation',
					title: 'Navigation',
					scenario: 'preview',
					businessGoal: 'Показать навигационные блоки приложения.',
					Component: ComponentsNavigationPage,
				}),
				defineScreen({
					id: 'content',
					title: 'Content',
					scenario: 'preview',
					businessGoal: 'Показать контентные блоки и типографику.',
					Component: ComponentsContentPage,
				}),
			],
		}),
	],
});
