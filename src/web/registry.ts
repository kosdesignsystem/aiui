import CallsMainPage from "./Calls/main";
import CallsMissedPage from "./Calls/missed";
import CallsSearchPage from "./Calls/search";
import FilesMainPage from "./Files/main";
import KidCallsMainPage from "./KidCalls/main";
import NotesCreatePage from "./Notes/create";
import NotesEmptyPage from "./Notes/empty";
import NotesFavoritesPage from "./Notes/favorites";
import NotesMainPage from "./Notes/main";
import RemindersMainPage from "./Reminders/main";
import SettingsMainPage from "./Settings/main";
import SettingsSecurityPage from "./Settings/security";

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
    id: "Files",
    title: "Файлы",
    screens: [{ id: "main", title: "Главный экран", Component: FilesMainPage }],
  },
  {
    id: "KidCalls",
    title: "Детские звонки",
    screens: [{ id: "main", title: "Смарт-часы 5+", Component: KidCallsMainPage }],
  },
  {
    id: "Notes",
    title: "Заметки",
    screens: [
      { id: "empty", title: "Пустой список", Component: NotesEmptyPage },
      { id: "main", title: "Список заметок", Component: NotesMainPage },
      { id: "favorites", title: "Избранные", Component: NotesFavoritesPage },
      { id: "create", title: "Создание заметки", Component: NotesCreatePage },
    ],
  },
  {
    id: "Reminders",
    title: "Напоминания",
    screens: [{ id: "main", title: "Список задач", Component: RemindersMainPage }],
  },
  {
    id: "Settings",
    title: "Настройки",
    screens: [
      { id: "main", title: "Главный экран", Component: SettingsMainPage },
      { id: "security", title: "Безопасность", Component: SettingsSecurityPage },
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
