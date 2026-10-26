cmake_minimum_required(VERSION 3.14)

project(my_phone)

include(platform/flutter)

add_flutter_app(my_phone
                INCREMENTAL
                KPA
                KPA_DEVELOPER_ID lk
                KPA_ICON resources/icons/my_phone.png
                KPA_LOCALE resources/locale/names)
