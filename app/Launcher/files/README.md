# Launcher

Native Dart/Flutter port of the React launcher in `src/web/Launcher`, packaged
as a KasperskyOS for Mobile KPA application. No WebView, JavaScript, HTML, or
CSS runtime is used.

## Included flows

- lock screen and upward unlock gesture;
- four-digit passcode screen (the demo accepts any four digits);
- two swipeable application pages;
- animated launch of applications that have preview screens;
- full-screen application previews;
- pull-down quick settings with toggles, volume, and brightness;
- recent-app carousel, open action, upward dismiss, and close-all action;
- upward and downward system gestures from the home and application screens.

The UI keeps the source design's 40 logical-pixel status area and 52
logical-pixel navigation area and scales to the available mobile viewport.

## Flutter checks

Run from this `files` directory:

```sh
flutter pub get
dart format lib
flutter analyze
```

## KPA build

Build through the KasperskyOS for Mobile SDK using the repository's regular
cross-build command for the target architecture. The package target is
`Launcher`, and the resulting package is named `lk.Launcher.kpa`.
