import { defineApp, defineFlow, defineScreen } from '../definition';
import NotesMainPage from './main';

export const notesAppDefinition = defineApp({
  id: 'Notes', title: 'Заметки', businessGoal: 'Создать заметку голосом и удалить текст.',
  flows: [defineFlow({
    id: 'dictation', title: 'Голосовой ввод', businessGoal: 'Продемонстрировать голосовой ввод с микрофона компьютера.',
    screens: [defineScreen({
      id: 'main', title: 'Заметка', scenario: 'preview', businessGoal: 'Надиктовать текст и стереть его клавишей удаления.', Component: NotesMainPage,
    })],
  })],
});
