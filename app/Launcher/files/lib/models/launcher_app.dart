enum LauncherMode { lock, pin, home, app, shade, recents }

enum ShadeOrigin { home, app }

class LauncherItem {
  const LauncherItem({
    required this.id,
    required this.label,
    required this.icon,
    this.preview,
    this.darkStatusBar = false,
  });

  final String id;
  final String label;
  final String icon;
  final String? preview;
  final bool darkStatusBar;

  bool get launchable => preview != null;
}

const List<LauncherItem> launcherItems = <LauncherItem>[
  LauncherItem(id: 'maps', label: 'Карты', icon: 'assets/icons/maps.png'),
  LauncherItem(
    id: 'camera',
    label: 'Камера',
    icon: 'assets/icons/camera.png',
    preview: 'assets/screens/camera.png',
  ),
  LauncherItem(
    id: 'contacts',
    label: 'Контакты',
    icon: 'assets/icons/contacts.png',
  ),
  LauncherItem(
    id: 'browser',
    label: 'Браузер',
    icon: 'assets/icons/browser.png',
  ),
  LauncherItem(
    id: 'compass',
    label: 'Компас',
    icon: 'assets/icons/compass.png',
  ),
  LauncherItem(
    id: 'calls',
    label: 'Телефон',
    icon: 'assets/icons/phone.png',
    preview: 'assets/screens/phone.png',
    darkStatusBar: true,
  ),
  LauncherItem(id: 'video', label: 'Видео', icon: 'assets/icons/video.png'),
  LauncherItem(
    id: 'reminders',
    label: 'Календарь',
    icon: 'assets/icons/calendar.png',
  ),
  LauncherItem(
    id: 'my-office',
    label: 'МойОфис',
    icon: 'assets/icons/my_office.png',
  ),
  LauncherItem(
    id: 'messenger',
    label: 'Мессенджер',
    icon: 'assets/icons/messenger.png',
  ),
  LauncherItem(
    id: 'calculator',
    label: 'Калькулятор',
    icon: 'assets/icons/calculator.png',
  ),
  LauncherItem(id: 'notes', label: 'Заметки', icon: 'assets/icons/notes.png'),
  LauncherItem(
    id: 'weather',
    label: 'Погода',
    icon: 'assets/icons/weather.png',
    preview: 'assets/screens/weather.png',
  ),
  LauncherItem(
    id: 'files',
    label: 'Файлы',
    icon: 'assets/icons/files.png',
    preview: 'assets/screens/files.png',
    darkStatusBar: true,
  ),
  LauncherItem(id: 'clock', label: 'Часы', icon: 'assets/icons/clock.png'),
  LauncherItem(
    id: 'settings',
    label: 'Настройки',
    icon: 'assets/icons/settings.png',
    preview: 'assets/screens/settings.png',
    darkStatusBar: true,
  ),
  LauncherItem(id: 'mail', label: 'Почта', icon: 'assets/icons/mail.png'),
  LauncherItem(id: 'sms', label: 'Сообщения', icon: 'assets/icons/sms.png'),
  LauncherItem(id: 'vpn', label: 'VPN', icon: 'assets/icons/vpn.png'),
  LauncherItem(
    id: 'dictaphone',
    label: 'Диктофон',
    icon: 'assets/icons/dictaphone.png',
  ),
  LauncherItem(
    id: 'gallery',
    label: 'Галерея',
    icon: 'assets/icons/gallery.png',
    preview: 'assets/screens/gallery.png',
    darkStatusBar: true,
  ),
];

final List<LauncherItem> launchableItems =
    launcherItems.where((item) => item.launchable).toList(growable: false);
final List<LauncherItem> unavailableItems =
    launcherItems.where((item) => !item.launchable).toList(growable: false);
final List<List<LauncherItem>> homePages = <List<LauncherItem>>[
  launchableItems,
  unavailableItems,
];

LauncherItem get settingsItem =>
    launcherItems.firstWhere((item) => item.id == 'settings');
