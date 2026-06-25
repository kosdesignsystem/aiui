# Reminders

Native Flutter/KPA implementation of the Reminders React flow from
`src/web/Reminders`.

The app includes the React scenarios for today's reminders, all reminders,
search, task creation, productivity goal setup, weekly plan display, completion
progress, and the success celebration state.

## Checks

Run Flutter checks from this `files` directory:

```sh
flutter pub get
dart format lib
flutter analyze
```

When KasperskyOS for Mobile SDK is available, build the KPA package through the
repository's KOS cross-build command.

## Structure

- `lib/models` contains reminder data and pure transformation helpers.
- `lib/navigation` contains route names and route helper logic.
- `lib/state` keeps in-memory session state isolated from widgets.
- `lib/screens` owns page-level state and orchestration.
- `lib/widgets` contains chrome, content, modal, progress, and animation widgets.
