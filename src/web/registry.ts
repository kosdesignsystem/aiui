import DefaultApp from "./Default/v1";
import RemindersMainScreen from "./Reminders/v1";

export type ScreenDefinition = {
  id: string;
  title: string;
  Component: () => JSX.Element;
};

export type AppVersionDefinition = {
  id: string;
  screens: ScreenDefinition[];
};

export type AppDefinition = {
  id: string;
  title: string;
  versions: AppVersionDefinition[];
};

export const appRegistry: AppDefinition[] = [
  {
    id: "Default",
    title: "Default",
    versions: [
      {
        id: "v1",
        screens: [{ id: "app", title: "App", Component: DefaultApp }],
      },
    ],
  },
  {
    id: "Reminders",
    title: "Напоминания",
    versions: [
      {
        id: "v1",
        screens: [{ id: "main", title: "Главный экран", Component: RemindersMainScreen }],
      },
    ],
  },
];

export const flattenScreens = () =>
  appRegistry.flatMap((app) =>
    app.versions.flatMap((version) =>
      version.screens.map((screen) => ({
        app,
        version,
        screen,
        path: `/app/${app.id}/${version.id}/${screen.id}`,
      })),
    ),
  );
