import CallsMainPage from './Calls/main';
import CallsMissedPage from './Calls/missed';
import CallsSearchPage from './Calls/search';
import PasswordGeneratorMainPage from './PasswordGenerator/main';
import SecureByUIMainPage from './SecureByUI/main';
import SecureByUIPolicyPage from './SecureByUI/policy';

export type ScreenDefinition = {
  id: string;
  title: string;
  Component: () => JSX.Element;
};

export type AppDefinition = {
  id: string;
  title: string;
  screens: ScreenDefinition[];
};

export const appRegistry: AppDefinition[] = [
  {
    id: 'Calls',
    title: 'Звонки',
    screens: [
      { id: 'main', title: 'Главный экран', Component: CallsMainPage },
      { id: 'missed', title: 'Пропущенные', Component: CallsMissedPage },
      { id: 'search', title: 'Поиск', Component: CallsSearchPage },
    ],
  },
  {
    id: 'SecureByUI',
    title: 'Secure by UI',
    screens: [
      { id: 'main', title: 'Главный экран', Component: SecureByUIMainPage },
      { id: 'policy', title: 'Шторка политики', Component: SecureByUIPolicyPage },
    ],
  },
  {
    id: 'PasswordGenerator',
    title: 'Генератор паролей',
    screens: [{ id: 'main', title: 'Главный экран', Component: PasswordGeneratorMainPage }],
  },
];

export const flattenScreens = () =>
  appRegistry.flatMap((app) =>
    app.screens.map((screen) => ({
      app,
      screen,
      path: `/app/${app.id}/${screen.id}`,
    })),
  );
