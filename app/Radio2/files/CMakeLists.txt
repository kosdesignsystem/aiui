cmake_minimum_required(VERSION 3.14)

project(Radio2)

include(platform/flutter)

add_flutter_app(Radio2
                INCREMENTAL
                KPA
                KPA_DEVELOPER_ID lk
                KPA_ICON resources/icons/flutter.png
                KPA_LOCALE resources/locale/names)
