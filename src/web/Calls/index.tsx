import { defineApp, defineFlow, defineScreen } from '../definition';
import { CallsScreen } from './screen';

const callsMainScreen = () => <CallsScreen title="Звонки" filter="all" />;
const callsMissedScreen = () => <CallsScreen title="Звонки" filter="missed" />;
const callsSearchScreen = () => (
	<CallsScreen title="Звонки" filter="all" mode="search" />
);

export const callsAppDefinition = defineApp({
	id: 'Calls',
	title: 'Звонки',
	businessGoal: 'Показывать историю вызовов и давать быстрый путь к поиску контакта.',
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
					Component: callsMainScreen,
				}),
				defineScreen({
					id: 'missed',
					title: 'Пропущенные',
					scenario: 'browse',
					businessGoal: 'Сфокусировать пользователя на пропущенных вызовах.',
					Component: callsMissedScreen,
				}),
				defineScreen({
					id: 'search',
					title: 'Поиск',
					scenario: 'search',
					businessGoal: 'Найти звонок по контакту внутри истории.',
					Component: callsSearchScreen,
				}),
			],
		}),
	],
});
