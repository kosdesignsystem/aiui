import { defineApp, defineFlow, defineScreen } from '../definition';
import { VoiceHelperMainScreen } from './main';

export const voiceHelperAppDefinition = defineApp({
	id: 'VoiceHelper', title: 'VoiceHelper',
	businessGoal: 'Тестировать реальное распознавание русской речи моделью GigaAM.',
	flows: [defineFlow({
		id: 'speech-to-text', title: 'Голос в текст',
		businessGoal: 'Записывать речь и видеть промежуточную и итоговую расшифровку.',
		screens: [defineScreen({
			id: 'main', title: 'Голос в текст', scenario: 'preview',
			businessGoal: 'Проверять микрофон, потоковую передачу аудио и распознавание GigaAM.',
			Component: VoiceHelperMainScreen,
		})],
	})],
});
