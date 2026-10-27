import { defineApp, defineFlow, defineScreen } from '../definition';
import SecurityOverviewPage from './overview';

export const securityAppDefinition = defineApp({
	id: 'Security',
	title: 'Security',
	businessGoal: 'Показывать угрозы устройству и помогать устранять их через боттом-шиты.',
	flows: [
		defineFlow({
			id: 'security-overview',
			title: 'Состояние защиты',
			businessGoal: 'Увидеть угрозы, разобраться в каждой и устранить её в один шаг.',
			screens: [
				defineScreen({
					id: 'overview',
					title: 'Overview',
					scenario: 'inspect',
					businessGoal: 'Открывать шит угрозы, устранять её и перепроверять устройство.',
					Component: SecurityOverviewPage,
				}),
			],
		}),
	],
});
