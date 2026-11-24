import { defineApp, defineFlow, defineScreen } from '../definition';
import { DROSyncScreen } from './main';

export const droSyncAppDefinition = defineApp({
	id: 'DROSync',
	title: 'Привет DRO Sync',
	businessGoal: 'Приветствовать пользователя.',
	flows: [defineFlow({
		id: 'greeting',
		title: 'Приветствие',
		businessGoal: 'Показать приветствие.',
		screens: [defineScreen({
			id: 'main',
			title: 'Привет DRO Sync',
			scenario: 'browse',
			businessGoal: 'Приветствовать пользователя машущей рукой.',
			Component: DROSyncScreen,
		})],
	})],
});
