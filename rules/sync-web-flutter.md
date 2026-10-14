# Компиляция React -> Flutter/KPA

Используй этот документ, когда нужно перенести React-приложение из `src/web` во Flutter-приложение для собственной мобильной платформы KasperskyOS/KPA.

Цель работы - не запустить React внутри Flutter и не собрать обычный Flutter web/desktop-проект, а переписать интерфейс и поведение на Dart/Flutter так, чтобы результат собирался как KPA-пакет.

## Базовый шаблон

1. В качестве минимального эталона всегда используй `rules/minimal_flutter`.
2. Целевое приложение должно повторять структуру этого шаблона:

```txt
<app_name>/
├── Config.in
├── <app_name>.mk
└── files/
    ├── assets/
    │   ├── image1.png
    │   └── ...
    ├── CMakeLists.txt
    ├── lib/
    │   └── main.dart
    ├── pubspec.yaml
    ├── README.md
    └── resources/
        ├── icons/
        │   └── flutter.png
        └── locale/
            └── names
```

3. Если целевой каталог уже существует, обновляй его на месте и не создавай дубль приложения.
4. Если целевой каталог отсутствует, скопируй структуру `rules/minimal_flutter` и переименуй пакет, CMake target, mk-файл, `Config.in`-символы и пользовательские строки под новое приложение.
5. Весь Dart-код приложения размещай только внутри `files/lib`.

## Обязательные KPA-файлы

### `files/CMakeLists.txt`

В каждом Flutter/KPA-приложении обязателен CMake-скрипт, который подключает платформенный модуль Flutter и объявляет KPA-приложение через `add_flutter_app`.

Минимальная форма:

```cmake
cmake_minimum_required(VERSION 3.14)

project(<app_name>)

include(platform/flutter)

add_flutter_app(<app_name>
                INCREMENTAL
                KPA
                KPA_DEVELOPER_ID lk
                KPA_ICON resources/icons/flutter.png
                KPA_LOCALE resources/locale/names)
```

Правила:

1. `<app_name>` должен совпадать с именем KPA-приложения, mk-пакетом и каталогом приложения.
2. `include(platform/flutter)` обязателен.
3. `INCREMENTAL`, `KPA`, `KPA_DEVELOPER_ID`, `KPA_ICON` и `KPA_LOCALE` обязательны.
4. Иконка должна лежать в `files/resources/icons`.
5. Локализованные имена приложения должны лежать в `files/resources/locale/names`.

### `files/pubspec.yaml`

В `pubspec.yaml` обязательно добавь описание Flutter-пакета с фиксированным диапазоном SDK:

```yaml
name: "<app_name>"
description: "<short description>"
publish_to: 'none'

version: 1.0.0+1

environment:
  sdk: '>=2.12.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^4.0.0

flutter:
  uses-material-design: true
```

Правила:

1. Не расширяй диапазон `environment.sdk`.
2. Не удаляй зависимость `flutter`.
3. Не удаляй `flutter_test` и `flutter_lints`.
4. Все ассеты из `files/assets` должны быть явно перечислены в секции `flutter.assets`.
5. Не добавляй зависимости без необходимости; сначала проверь, можно ли реализовать поведение штатными виджетами Flutter.

### `<app_name>.mk`

Файл сборки должен быть согласован с шаблоном `minimal_flutter`:

```make
package_name  := <app_name>
dir           := $(call my_dir)

dependencies  := components/flutter

NO_LOCALIZE   := y

$(call set_env_var,PUB_HOSTED_URL,$(PUB_HOSTED_URL),TRUE)
$(if $(call is_equal,$(USE_PREBUILT_SDK),y), ,$(call set_env_var,PUB_CACHE,$(PUB_CACHE),TRUE))

include $(KB_SRCDIR)/templates/build_example.mk
```

Правила:

1. `package_name` должен совпадать с `<app_name>`.
2. `components/flutter` обязателен.
3. Не удаляй настройку `PUB_HOSTED_URL` и `PUB_CACHE`.

### `Config.in`

`Config.in` должен объявлять KPA-приложение для поддерживаемых KOS-архитектур и указывать корректный `PACKAGE_PROPERTY(PREFIX)`.

При переименовании приложения обязательно обнови:

1. имя `menuconfig`;
2. человекочитаемый заголовок;
3. `#define NAME`;
4. путь в `PACKAGE_PROPERTY(PREFIX)`.

## Перенос React-приложения

1. Определи точный React-источник.
   - Обычно это `src/web/<AppName>`.
   - Если указана конкретная страница, переноси только ее и необходимые зависимости.
2. Зафиксируй список экранов, состояний и пользовательских сценариев.
   - Каждый React-экран должен получить Flutter-эквивалент.
   - Empty/loading/error/disabled/pressed-состояния переноси явно.
3. Перенеси структуру интерфейса.
   - JSX-разметку перепиши на Flutter widgets.
   - CSS layout переноси через `Column`, `Row`, `Stack`, `Positioned`, `Expanded`, `Flexible`, `Padding`, `Align`, `SizedBox`, `CustomScrollView`.
   - Не используй WebView, HTML, CSS или JS как runtime-слой.
4. Перенеси стили и токены.
   - Цвета, spacing, радиусы, размеры, тени и типографику переноси в Dart-константы или локальные theme-файлы внутри `files/lib`.
   - Если в React используются общие `src/ui`-токены, сопоставь их с Flutter `ThemeData`, `TextTheme` и константами.
5. Перенеси компоненты.
   - React-компоненты переписывай как Flutter widgets.
   - Локальные виджеты размещай в `files/lib`, например `files/lib/widgets`.
   - Экранные виджеты можно держать в `files/lib/screens`.
6. Перенеси состояние и события.
   - `useState` обычно соответствует `StatefulWidget`/`setState`.
   - `useMemo`/derived values переноси в вычисляемые getters или локальные методы.
   - `useEffect` переноси в `initState`, `didUpdateWidget`, `dispose` или post-frame callbacks.
   - Обработчики кликов, свайпов, инпутов и навигации должны сохранить поведение React-версии.
7. Перенеси ассеты.
   - Изображения клади в `files/assets`.
   - Иконку приложения клади в `files/resources/icons/flutter.png` или переименуй путь в CMake, если нужен другой файл.
   - Все runtime-ассеты перечисляй в `files/pubspec.yaml`.
8. Перенеси локализованное имя приложения.
   - Файл `files/resources/locale/names` обязателен.
   - Минимальный формат:

```txt
ru=<Название приложения>
en=<Application name>
```

## Требования к Flutter-коду

1. Точка входа - `files/lib/main.dart`.
2. Весь исходный код Dart находится под `files/lib`.
3. Не клади Dart-код в `files`, `assets`, `resources` или корень KPA-пакета.
4. Не импортируй код из других Flutter-приложений.
5. Не создавай общий каталог Flutter-компонентов между KPA-приложениями без отдельного решения пользователя.
6. Для Material UI используй `MaterialApp`, `ThemeData` и стандартные Flutter widgets.
7. Для кастомной графики используй Flutter primitives (`CustomPainter`, `Canvas`, `Image.asset`) вместо SVG/HTML-оберток, если нет готового Flutter-пакета в проекте.
8. Сохраняй мобильные ограничения исходного React-интерфейса: размер экрана, safe areas, верхние и нижние системные отступы, плотность и доступность касаний.

## Проверка результата

Выполняй проверки из каталога `files` целевого приложения:

```sh
flutter pub get
dart format lib
flutter analyze
```

Если проект собирается через KasperskyOS for Mobile SDK, дополнительно используй доступный в дереве сборки способ сборки KPA-пакета:

```sh
./cross-build.x86_64-pc-kos.sh
./cross-build.aarch64-kos.sh
```

или эквивалентную команду сборки текущего репозитория.

Правила:

1. Не подменяй KPA-проверку запуском `flutter run -d chrome`.
2. Не генерируй платформы через `flutter create --platforms=macos,web .`.
3. Итоговый артефакт для пользователя - KPA-пакет, а не web/desktop Flutter-приложение.
4. Если SDK, Flutter или сетевые зависимости недоступны, явно укажи, какие проверки не удалось выполнить.

## Что запрещено

1. Оставлять React, HTML, CSS или JS как runtime-зависимость нового Flutter/KPA-приложения.
2. Использовать WebView вместо нативного Flutter UI.
3. Создавать обычный Flutter web/macos проект вместо KPA-структуры.
4. Удалять обязательные KPA-параметры из `add_flutter_app`.
5. Раскладывать Dart-код вне `files/lib`.
6. Оставлять ассеты в `src/web` без переноса в `files/assets`.
7. Создавать несколько Flutter/KPA-пакетов под одну и ту же функциональность.
8. Оставлять визуальные или поведенческие расхождения с React-источником без объяснения.

## Мини-чеклист перед завершением

1. React-источник и целевое KPA-приложение определены.
2. Структура целевого приложения соответствует `rules/minimal_flutter`.
3. `files/CMakeLists.txt` содержит `include(platform/flutter)` и `add_flutter_app(... KPA ...)`.
4. `files/pubspec.yaml` содержит SDK `>=2.12.0 <4.0.0`, `flutter`, `flutter_test` и `flutter_lints`.
5. Весь Dart-код находится в `files/lib`.
6. Все ассеты перенесены в `files/assets` и перечислены в `pubspec.yaml`.
7. Иконка и локализованные имена приложения лежат в `files/resources`.
8. React-экраны, состояния, стили и сценарии перенесены во Flutter.
9. Выполнены доступные проверки форматирования, анализа и сборки KPA.
10. В ответе пользователю указаны измененные файлы, выполненные проверки и путь к KPA-артефакту, если сборка запускалась.
