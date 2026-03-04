import DefaultApp from "./Default/v1";
import { AppIconsScreen, IconsScreen } from "./Icons/v1";
import RemindersMainScreen from "./Reminders/v1";
import SettingsScreenV1 from "./Settings/v1";
import SettingsScreenV2 from "./Settings/v2";

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
    id: "Icons",
    title: "Иконки",
    versions: [
      {
        id: "v1",
        screens: [
          { id: "icons", title: "icons", Component: IconsScreen },
          { id: "app_icons", title: "app_icons", Component: AppIconsScreen },
        ],
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
  {
    id: "Settings",
    title: "Настройки",
    versions: [
      {
        id: "v1",
        screens: [{ id: "main", title: "Главный экран", Component: SettingsScreenV1 }],
      },
      {
        id: "v2",
        screens: [{ id: "main", title: "Главный экран", Component: SettingsScreenV2 }],
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
