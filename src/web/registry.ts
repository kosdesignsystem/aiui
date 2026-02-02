import LauncherHome from "./system/Launcher/v1/Home";
import QuickSettingsHome from "./system/QuickSettings/v1/Home";
import KeyboardHome from "./system/Keyboard/v1/Home";
import OpenAppsHome from "./system/OpenApps/v1/Home";
import ContactsHome from "./user/Contacts/v1/Home";
import PhoneHome from "./user/Phone/v1/Home";

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
  type: "system" | "user";
  title: string;
  versions: AppVersionDefinition[];
};

export const appRegistry: AppDefinition[] = [
  {
    id: "Launcher",
    type: "system",
    title: "Launcher",
    versions: [
      {
        id: "v1",
        screens: [{ id: "home", title: "Home", Component: LauncherHome }],
      },
    ],
  },
  {
    id: "QuickSettings",
    type: "system",
    title: "Quick Settings",
    versions: [
      {
        id: "v1",
        screens: [{ id: "home", title: "Home", Component: QuickSettingsHome }],
      },
    ],
  },
  {
    id: "Keyboard",
    type: "system",
    title: "Keyboard",
    versions: [
      {
        id: "v1",
        screens: [{ id: "home", title: "Home", Component: KeyboardHome }],
      },
    ],
  },
  {
    id: "OpenApps",
    type: "system",
    title: "Open Apps",
    versions: [
      {
        id: "v1",
        screens: [{ id: "home", title: "Home", Component: OpenAppsHome }],
      },
    ],
  },
  {
    id: "Contacts",
    type: "user",
    title: "Contacts",
    versions: [
      {
        id: "v1",
        screens: [{ id: "home", title: "Home", Component: ContactsHome }],
      },
    ],
  },
  {
    id: "Phone",
    type: "user",
    title: "Phone",
    versions: [
      {
        id: "v1",
        screens: [{ id: "home", title: "Home", Component: PhoneHome }],
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
        path: `/apps/${app.type}/${app.id}/${version.id}/${screen.id}`,
      })),
    ),
  );
