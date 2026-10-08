cmake_minimum_required(VERSION 3.14)

project(Launcher)

include(platform/flutter)

add_flutter_app(Launcher
                INCREMENTAL
                KPA
                KPA_DEVELOPER_ID lk
                KPA_ICON resources/icons/flutter.png
                KPA_LOCALE resources/locale/names)
