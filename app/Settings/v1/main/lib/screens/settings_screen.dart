import 'package:flutter/material.dart';

import '../theme/tokens.dart';
import '../theme/typography.dart';
import '../widgets/app_svg_icon.dart';
import '../widgets/settings_row.dart';
import '../widgets/settings_switch.dart';

enum _SettingsPage { main, battery }

class _SettingsItem {
  const _SettingsItem({
    required this.id,
    required this.icon,
    required this.title,
    this.subtitle,
  });

  final String id;
  final String icon;
  final String title;
  final String? subtitle;
}

const List<_SettingsItem> _connectivityItems = [
  _SettingsItem(
    id: 'cellular',
    icon: 'signal-cellular-100',
    title: 'Сотовая связь',
    subtitle: 'MTS',
  ),
  _SettingsItem(id: 'wifi', icon: 'wifi', title: 'Wi-Fi', subtitle: 'KLCorp'),
];

const List<_SettingsItem> _preferencesItems = [
  _SettingsItem(id: 'passcode', icon: 'pincode', title: 'Код-пароль'),
  _SettingsItem(
    id: 'notifications',
    icon: 'notification-outline',
    title: 'Уведомления',
  ),
  _SettingsItem(id: 'display', icon: 'settings-outline', title: 'Экран'),
  _SettingsItem(id: 'sound', icon: 'speaker', title: 'Звук и вибрация'),
  _SettingsItem(id: 'battery', icon: 'battery-100', title: 'Батарея'),
  _SettingsItem(id: 'storage', icon: 'folder-outline', title: 'Память'),
];

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  _SettingsPage _currentPage = _SettingsPage.main;
  bool _airplaneModeEnabled = false;
  bool _powerSavingEnabled = false;
  bool _adaptiveBatteryEnabled = true;
  bool _backgroundLimitEnabled = false;

  @override
  Widget build(BuildContext context) {
    final title = _currentPage == _SettingsPage.main ? 'Настройки' : 'Батарея';

    return ColoredBox(
      color: AppTokens.backgroundSecondary,
      child: Center(
        child: SizedBox(
          width: AppTokens.deviceWidth,
          height: AppTokens.deviceHeight,
          child: Padding(
            padding: const EdgeInsets.only(
              top: AppTokens.statusBarHeight,
              bottom: AppTokens.navBarHeight,
            ),
            child: Column(
              children: [
                _Header(title: title),
                Expanded(
                  child: Container(
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(AppTokens.viewRadius),
                      border: Border.all(color: AppTokens.contentBorder),
                    ),
                    clipBehavior: Clip.antiAlias,
                    child: SingleChildScrollView(
                      child: _currentPage == _SettingsPage.main
                          ? _buildMainPage()
                          : _buildBatteryPage(),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildMainPage() {
    return Container(
      color: AppTokens.screenBackground,
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 20),
      child: Column(
        children: [
          Container(
            width: double.infinity,
            height: 56,
            padding: const EdgeInsets.symmetric(horizontal: 18),
            decoration: BoxDecoration(
              color: AppTokens.searchBackground,
              borderRadius: BorderRadius.circular(AppTokens.buttonRadius),
              border: Border.all(color: AppTokens.searchBorder, width: 2),
            ),
            child: Row(
              children: const [
                AppSvgIcon(name: 'search', size: 24),
                SizedBox(width: 12),
                Expanded(
                  child: Text(
                    'Поиск настроек',
                    style: AppTypography.searchText,
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 18),
          _Card(
            children: [
              Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: 16,
                  vertical: 14,
                ),
                child: ConstrainedBox(
                  constraints: const BoxConstraints(minHeight: 80),
                  child: Row(
                    children: [
                      const AppSvgIcon(name: 'avia', size: 28),
                      const SizedBox(width: 14),
                      const Expanded(
                        child: Text('Авиарежим', style: AppTypography.rowTitle),
                      ),
                      SettingsSwitch(
                        value: _airplaneModeEnabled,
                        onChanged: (value) => setState(() {
                          _airplaneModeEnabled = value;
                        }),
                        semanticLabel: 'Авиарежим',
                      ),
                    ],
                  ),
                ),
              ),
              for (final item in _connectivityItems)
                SettingsRow(
                  iconName: item.icon,
                  title: item.title,
                  subtitle: item.subtitle,
                  trailing: const AppSvgIcon(name: 'chevron-right', size: 24),
                ),
            ],
          ),
          const SizedBox(height: 16),
          ClipRRect(
            borderRadius: BorderRadius.circular(AppTokens.cardRadius),
            child: Column(
              children: [
                for (final item in _preferencesItems)
                  SettingsRow(
                    iconName: item.icon,
                    title: item.title,
                    trailing: const AppSvgIcon(name: 'chevron-right', size: 24),
                    onTap: item.id == 'battery'
                        ? () => setState(() {
                            _currentPage = _SettingsPage.battery;
                          })
                        : null,
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBatteryPage() {
    return Container(
      color: AppTokens.screenBackground,
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          GestureDetector(
            onTap: () => setState(() {
              _currentPage = _SettingsPage.main;
            }),
            behavior: HitTestBehavior.opaque,
            child: Container(
              height: 44,
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(14),
              ),
              child: const Row(
                children: [
                  SizedBox(width: 12),
                  AppSvgIcon(name: 'chevron-left', size: 20),
                  SizedBox(width: 6),
                  Text('Назад в настройки', style: AppTypography.backButton),
                ],
              ),
            ),
          ),
          const SizedBox(height: 14),
          Container(
            padding: const EdgeInsets.fromLTRB(16, 18, 16, 18),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(AppTokens.cardRadius),
              border: Border.all(color: AppTokens.rowDivider),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: const [
                Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    AppSvgIcon(name: 'battery-100', size: 38),
                    SizedBox(width: 10),
                    Text('82%', style: AppTypography.batteryPercent),
                  ],
                ),
                SizedBox(height: 6),
                Text(
                  'Заряжается • до 100% за 42 мин',
                  style: AppTypography.batteryStatus,
                ),
              ],
            ),
          ),
          const SizedBox(height: 14),
          _Card(
            children: const [
              _BatteryRow(label: 'Состояние', value: 'Отличное'),
              _BatteryRow(label: 'Осталось работы', value: '9 ч 40 мин'),
              _BatteryRow(
                label: 'Последняя полная зарядка',
                value: 'Сегодня, 08:15',
              ),
            ],
          ),
          const SizedBox(height: 14),
          _Card(
            children: [
              _BatteryActionRow(
                title: 'Режим энергосбережения',
                subtitle: 'Снижает яркость и фоновую активность',
                value: _powerSavingEnabled,
                onChanged: (value) => setState(() {
                  _powerSavingEnabled = value;
                }),
              ),
              _BatteryActionRow(
                title: 'Адаптивная батарея',
                subtitle: 'Оптимизирует расход энергии в фоне',
                value: _adaptiveBatteryEnabled,
                onChanged: (value) => setState(() {
                  _adaptiveBatteryEnabled = value;
                }),
              ),
              _BatteryActionRow(
                title: 'Ограничить фоновую активность',
                subtitle: 'Для приложений с высоким расходом',
                value: _backgroundLimitEnabled,
                onChanged: (value) => setState(() {
                  _backgroundLimitEnabled = value;
                }),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class _Header extends StatelessWidget {
  const _Header({required this.title});

  final String title;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(24, 40, 24, 16),
      child: Align(
        alignment: Alignment.centerLeft,
        child: Text(title, style: AppTypography.headerTitle),
      ),
    );
  }
}

class _Card extends StatelessWidget {
  const _Card({required this.children});

  final List<Widget> children;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(AppTokens.cardRadius),
        border: Border.all(color: AppTokens.rowDivider),
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        children: [
          for (var i = 0; i < children.length; i++) ...[
            if (i > 0)
              const Divider(
                height: 1,
                thickness: 1,
                color: AppTokens.rowDivider,
              ),
            children[i],
          ],
        ],
      ),
    );
  }
}

class _BatteryRow extends StatelessWidget {
  const _BatteryRow({required this.label, required this.value});

  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      child: Row(
        children: [
          Expanded(child: Text(label, style: AppTypography.batteryRowLabel)),
          const SizedBox(width: 12),
          Text(value, style: AppTypography.batteryRowValue),
        ],
      ),
    );
  }
}

class _BatteryActionRow extends StatelessWidget {
  const _BatteryActionRow({
    required this.title,
    required this.subtitle,
    required this.value,
    required this.onChanged,
  });

  final String title;
  final String subtitle;
  final bool value;
  final ValueChanged<bool> onChanged;

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: const BoxConstraints(minHeight: 84),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        child: Row(
          children: [
            Expanded(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: AppTypography.batteryActionTitle),
                  const SizedBox(height: 2),
                  Text(subtitle, style: AppTypography.batteryActionSubtitle),
                ],
              ),
            ),
            const SizedBox(width: 12),
            SettingsSwitch(
              value: value,
              onChanged: onChanged,
              semanticLabel: title,
            ),
          ],
        ),
      ),
    );
  }
}
