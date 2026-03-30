import CallsMainPage from "./Calls/main";
import CallsMissedPage from "./Calls/missed";
import CallsSearchPage from "./Calls/search";
import KidCallsMainPage from "./KidCalls/main";
import CameraMainPage from "./Camera/main";

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
    id: "Calls",
    title: "Звонки",
    screens: [
      { id: "main", title: "Главный экран", Component: CallsMainPage },
      { id: "missed", title: "Пропущенные", Component: CallsMissedPage },
      { id: "search", title: "Поиск", Component: CallsSearchPage },
    ],
  },
  {
    id: "KidCalls",
    title: "Детские звонки",
    screens: [{ id: "main", title: "Смарт-часы 5+", Component: KidCallsMainPage }],
  },
  {
    id: "Camera",
    title: "Камера",
    screens: [{ id: "main", title: "Мобильная камера", Component: CameraMainPage }],
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
