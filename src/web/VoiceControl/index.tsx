import { defineApp, defineFlow, defineScreen } from '../definition';
import { VoiceControlMainScreen } from './main';

export const voiceControlAppDefinition = defineApp({
	id: 'VoiceControl',
	title: 'VoiceControl',
	businessGoal: 'Демонстрировать системного помощника поверх текущего экрана ОС.',
	flows: [defineFlow({
		id: 'assistant',
		title: 'Системный помощник',
		businessGoal: 'Выполнять демонстрационные команды, сохраняя контекст пользователя.',
		screens: [defineScreen({
			id: 'main', title: 'Главный экран', scenario: 'preview',
			businessGoal: 'Открывать помощника поверх рабочего стола и демонстрировать его состояния.',
			Component: VoiceControlMainScreen,
		})],
	})],
});
