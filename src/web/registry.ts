import DelaHome from "./Dela/v1";
import FootballStarsHome from "./FootballStars/v1";
import QuoteDayHome from "./QuoteDay/v1";

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
    id: "Dela",
    title: "Дела",
    versions: [
      {
        id: "v1",
        screens: [{ id: "home", title: "Home", Component: DelaHome }],
      },
    ],
  },
  {
    id: "QuoteDay",
    title: "Цитата дня",
    versions: [
      {
        id: "v1",
        screens: [{ id: "home", title: "Home", Component: QuoteDayHome }],
      },
    ],
  },
  {
    id: "FootballStars",
    title: "Футболисты",
    versions: [
      {
        id: "v1",
        screens: [{ id: "home", title: "Home", Component: FootballStarsHome }],
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
