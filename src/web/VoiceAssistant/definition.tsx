import { defineApp, defineFlow, defineScreen } from '../definition';
import VoiceAssistant from './VoiceAssistant';

export const voiceAssistantAppDefinition = defineApp({
  id: 'voice-assistant',
  title: 'Голосовой ассистент',
  businessGoal: 'Задавать вопросы голосом и получать озвученные ответы с управлением в перчатках.',
  flows: [defineFlow({
    id: 'main',
    title: 'Голосовой диалог',
    businessGoal: 'Задать вопрос и прослушать ответ.',
    screens: [defineScreen({
      id: 'main',
      title: 'Голосовой ассистент',
      scenario: 'browse',
      businessGoal: 'Голосовой ввод, ответ и крупные кнопки управления.',
      Component: VoiceAssistant,
    })],
  })],
});
