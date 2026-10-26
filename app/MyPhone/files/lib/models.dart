enum LauncherMode { lock, pin, home, app, shade, recents }

class LauncherApp {
  const LauncherApp({
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

  bool get isLaunchable => preview != null;
}

const launcherApps = <LauncherApp>[
  LauncherApp(
      id: 'maps', label: 'Карты', icon: 'assets/launcher/icons/Maps.png'),
  LauncherApp(
    id: 'camera',
    label: 'Камера',
    icon: 'assets/launcher/icons/Camera.png',
    preview: 'assets/launcher/screens/Photo.png',
  ),
  LauncherApp(
      id: 'contacts',
      label: 'Контакты',
      icon: 'assets/launcher/icons/Contacts.png'),
  LauncherApp(
      id: 'browser',
      label: 'Браузер',
      icon: 'assets/launcher/icons/Browser.png'),
  LauncherApp(
      id: 'compass',
      label: 'Компас',
      icon: 'assets/launcher/icons/Compass.png'),
  LauncherApp(
    id: 'calls',
    label: 'Телефон',
    icon: 'assets/launcher/icons/Phone.png',
    preview: 'assets/launcher/screens/Phone.png',
    darkStatusBar: true,
  ),
  LauncherApp(
      id: 'video', label: 'Видео', icon: 'assets/launcher/icons/Video.png'),
  LauncherApp(
      id: 'reminders',
      label: 'Календарь',
      icon: 'assets/launcher/icons/Calendar.png'),
  LauncherApp(
      id: 'my-office',
      label: 'МойОфис',
      icon: 'assets/launcher/icons/MyOffice.png'),
  LauncherApp(
      id: 'messenger',
      label: 'Мессенджер',
      icon: 'assets/launcher/icons/Messenger.png'),
  LauncherApp(
      id: 'calculator',
      label: 'Калькулятор',
      icon: 'assets/launcher/icons/Calculator.png'),
  LauncherApp(
      id: 'notes', label: 'Заметки', icon: 'assets/launcher/icons/Notes.png'),
  LauncherApp(
    id: 'weather',
    label: 'Погода',
    icon: 'assets/launcher/icons/Weather.png',
    preview: 'assets/launcher/screens/Weather.png',
  ),
  LauncherApp(
    id: 'files',
    label: 'Файлы',
    icon: 'assets/launcher/icons/File System.png',
    preview: 'assets/launcher/screens/Files.png',
    darkStatusBar: true,
  ),
  LauncherApp(
      id: 'clock', label: 'Часы', icon: 'assets/launcher/icons/Сlock.png'),
  LauncherApp(
    id: 'settings',
    label: 'Настройки',
    icon: 'assets/launcher/icons/Settings.png',
    preview: 'assets/launcher/screens/Settings.png',
    darkStatusBar: true,
  ),
  LauncherApp(
      id: 'mail', label: 'Почта', icon: 'assets/launcher/icons/Mail.png'),
  LauncherApp(
      id: 'sms', label: 'Сообщения', icon: 'assets/launcher/icons/SMS.png'),
  LauncherApp(id: 'vpn', label: 'VPN', icon: 'assets/launcher/icons/VPN.png'),
  LauncherApp(
      id: 'dictaphone',
      label: 'Диктофон',
      icon: 'assets/launcher/icons/Dictaphone.png'),
  LauncherApp(
    id: 'gallery',
    label: 'Галерея',
    icon: 'assets/launcher/icons/Photo Gallery.png',
    preview: 'assets/launcher/screens/Photo Gallery.png',
    darkStatusBar: true,
  ),
];

final launchableApps =
    launcherApps.where((app) => app.isLaunchable).toList(growable: false);
final unavailableApps =
    launcherApps.where((app) => !app.isLaunchable).toList(growable: false);
final homePages = <List<LauncherApp>>[launchableApps, unavailableApps];

LauncherApp launcherAppById(String id) =>
    launcherApps.firstWhere((app) => app.id == id);
