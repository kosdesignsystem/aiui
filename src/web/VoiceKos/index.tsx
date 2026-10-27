import { defineApp, defineFlow, defineScreen } from '../definition';
import { VoiceKosScreen } from './main';

export const voiceKosAppDefinition = defineApp({
  // Preserve the published URL requested by the owner.
  id: 'Focus', title: 'Голос КОС',
  businessGoal: 'Записать голос и преобразовать речь в текст через GigaAM.',
  flows: [defineFlow({ id: 'dictation', title: 'Диктофон', businessGoal: 'Продиктовать короткое сообщение.',
    screens: [defineScreen({ id: 'main', title: 'Голос в текст', scenario: 'browse',
      businessGoal: 'Удерживать кнопку для записи и получить расшифровку.', Component: VoiceKosScreen })],
  })],
});
