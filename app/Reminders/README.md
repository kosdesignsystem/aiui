# Reminders

Production Flutter implementation of a focused reminders app with daily goal setup,
search, task creation, progress tracking, and a success state.

## Requirements

- Flutter 3.41 or newer
- Dart 3.11 or newer
- macOS tooling for the desktop release target

## Development

```sh
flutter pub get
flutter analyze
flutter test
flutter run -d chrome
```

If several Flutter SDKs are installed locally, this workspace has been verified
with `/Users/kasper/dev/flutter/bin/flutter`.

## Release Checks

```sh
flutter analyze
flutter test
flutter build web --release
flutter build macos --release
```

Release artifacts:

- Web: `build/web`
- macOS: `build/macos/Build/Products/Release/Reminders.app`

## Structure

- `lib/models` contains reminder data models and pure transformation helpers.
- `lib/navigation` contains route names and route helper logic.
- `lib/state` keeps the in-memory demo session state isolated from widgets.
- `lib/screens` owns page-level state and orchestration.
- `lib/widgets` contains reusable chrome, content, modal, progress, and animation widgets.
