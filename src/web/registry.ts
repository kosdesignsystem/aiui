import ComponentsViewPage from "./Components/view";
import CallsMainPage from "./Calls/main";
import CallsMissedPage from "./Calls/missed";
import CallsSearchPage from "./Calls/search";

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
    id: "Components",
    title: "Компоненты",
    screens: [
      { id: "view", title: "View", Component: ComponentsViewPage },
    ],
  },
  {
    id: "Calls",
    title: "Звонки",
    screens: [
      { id: "main", title: "Главный экран", Component: CallsMainPage },
      { id: "missed", title: "Пропущенные", Component: CallsMissedPage },
      { id: "search", title: "Поиск", Component: CallsSearchPage },
    ],
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
