import '../models/launcher_motion.dart';
import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import '../platform/launcher_platform.dart';
import '../widgets/launcher_action.dart';
import '../widgets/original_icon.dart';

/// Reachable source route src/web/Components/navigation.tsx, including its
/// preview switches, values, action positions, disabled states and copy specs.
class NavigationCatalog extends StatefulWidget {
  const NavigationCatalog(
      {Key? key,
      required this.onHome,
      this.platform = const DemoLauncherPlatform()})
      : super(key: key);
  final VoidCallback onHome;
  final LauncherPlatform platform;
  @override
  State<NavigationCatalog> createState() => _NavigationCatalogState();
}

class _NavigationCatalogState extends State<NavigationCatalog> {
  bool headerAction = true, headerMeta = true, headerLongTitle = false;
  String tabsValue = 'feed', tabsActionPosition = 'right';
  bool tabsInteractive = true, tabsDisableLast = false;
  String segmentedValue = 'files', segmentedActionPosition = 'none';
  bool segmentedInteractive = true, segmentedDisableLast = false;
  String navValue = 'home';
  bool navLabels = true, navDisableLast = false;
  final Set<String> copied = {};
  final List<Timer> timers = [];
  static const values = {
    'feed': 'Feed',
    'files': 'Files',
    'settings': 'Settings'
  };
  static const positions = {'none': 'None', 'left': 'Left', 'right': 'Right'};
  @override
  void dispose() {
    for (final timer in timers) {
      timer.cancel();
    }
    super.dispose();
  }

  Future<void> _copy(String title, Map<String, Object> props) async {
    final text =
        '$title({ ${props.entries.map((e) => '${e.key}: ${jsonEncode(e.value)}').join(', ')} })';
    try {
      await widget.platform.copyText(text);
      if (!mounted) return;
      setState(() => copied.add(title));
      timers.add(Timer(launcherDuration(1400), () {
        if (mounted) setState(() => copied.remove(title));
      }));
    } catch (_) {
      if (mounted) setState(() => copied.remove(title));
    }
  }

  @override
  Widget build(BuildContext context) => Scaffold(
        backgroundColor: const Color(0xFF050505),
        body: Column(children: [
          const SizedBox(
              height: 40,
              child: Padding(
                  padding: EdgeInsets.only(left: 48, right: 18),
                  child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text('09:41', style: TextStyle(fontSize: 12)),
                        Row(children: [
                          OriginalIcon('signal-cellular-100', size: 16),
                          SizedBox(width: 4),
                          OriginalIcon('wifi', size: 16),
                          SizedBox(width: 4),
                          OriginalIcon('battery-charge-medium', size: 16),
                          SizedBox(width: 4),
                          Text('96%', style: TextStyle(fontSize: 12))
                        ])
                      ]))),
          Expanded(
              child: ListView(
                  padding: const EdgeInsets.only(bottom: 24),
                  children: [
                const Padding(
                    padding: EdgeInsets.fromLTRB(24, 40, 24, 16),
                    child: Text('Navigation',
                        style: TextStyle(
                            fontSize: 40,
                            height: 1,
                            fontWeight: FontWeight.w600))),
                _section(
                    'Header',
                    'Крупный заголовок экрана с дополнительным action и метаданными.',
                    {
                      'title':
                          headerLongTitle ? 'Мои последние проекты' : 'Проекты',
                      'action': headerAction,
                      'meta': headerMeta
                    },
                    [
                      _toggle('Header', 'Action button', headerAction,
                          (v) => headerAction = v),
                      _toggle(
                          'Header', 'Meta', headerMeta, (v) => headerMeta = v),
                      _toggle('Header', 'Long title', headerLongTitle,
                          (v) => headerLongTitle = v),
                      _surface(Padding(
                          padding: const EdgeInsets.fromLTRB(24, 40, 24, 16),
                          child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Expanded(
                                          child: Text(
                                              headerLongTitle
                                                  ? 'Мои последние проекты'
                                                  : 'Проекты',
                                              style: const TextStyle(
                                                  fontSize: 40,
                                                  height: 1,
                                                  fontWeight:
                                                      FontWeight.w600))),
                                      if (headerAction)
                                        _action('Поиск', 'search', 44)
                                    ]),
                                if (headerMeta)
                                  const Padding(
                                      padding: EdgeInsets.only(top: 16),
                                      child: Text('8 элементов, 2 в работе',
                                          style: TextStyle(
                                              fontSize: 14,
                                              color: Colors.white54))),
                              ]))),
                    ]),
                _section('Tabs',
                    'Линейные вкладки для верхней навигации и фильтров.', {
                  'value': tabsValue,
                  'actionPosition': tabsActionPosition,
                  'interactive': tabsInteractive,
                  'disabledLast': tabsDisableLast
                }, [
                  _select('Tabs', 'Active tab', tabsValue, values,
                      (v) => tabsValue = v),
                  _select('Tabs', 'Action button', tabsActionPosition,
                      positions, (v) => tabsActionPosition = v),
                  _toggle('Tabs', 'Interactive', tabsInteractive,
                      (v) => tabsInteractive = v),
                  _toggle('Tabs', 'Disable last tab', tabsDisableLast,
                      (v) => tabsDisableLast = v),
                  _surface(_tabs(false)),
                ]),
                _section('SegmentedTabs',
                    'Плотные вкладки для локального переключения состояний.', {
                  'value': segmentedValue,
                  'actionPosition': segmentedActionPosition,
                  'interactive': segmentedInteractive,
                  'disabledLast': segmentedDisableLast
                }, [
                  _select('SegmentedTabs', 'Active tab', segmentedValue, values,
                      (v) => segmentedValue = v),
                  _select(
                      'SegmentedTabs',
                      'Action button',
                      segmentedActionPosition,
                      positions,
                      (v) => segmentedActionPosition = v),
                  _toggle('SegmentedTabs', 'Interactive', segmentedInteractive,
                      (v) => segmentedInteractive = v),
                  _toggle('SegmentedTabs', 'Disable last tab',
                      segmentedDisableLast, (v) => segmentedDisableLast = v),
                  _surface(_tabs(true)),
                ]),
                _section(
                    'Nav', 'Нижняя навигация приложения с активным разделом.', {
                  'activeItem': navValue,
                  'labels': navLabels,
                  'disabledLast': navDisableLast
                }, [
                  _select(
                      'Nav',
                      'Active item',
                      navValue,
                      const {
                        'home': 'Home',
                        'chat': 'Chat',
                        'settings': 'Settings'
                      },
                      (v) => navValue = v),
                  _toggle('Nav', 'Labels', navLabels, (v) => navLabels = v),
                  _toggle('Nav', 'Disable last item', navDisableLast,
                      (v) => navDisableLast = v),
                  _surface(SizedBox(
                      height: 68,
                      child: Row(children: [
                        _nav('home', 'Главная', 'apps'),
                        _nav('chat', 'Чаты', 'chat'),
                        _nav('settings', 'Настройки', 'settings'),
                      ]))),
                ]),
              ])),
          SizedBox(
              height: 52,
              child:
                  Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                SizedBox(
                    width: 52,
                    child: LauncherAction(
                        label: 'Назад',
                        onPressed: () => Navigator.of(context).pop(),
                        child: const Center(
                            child: OriginalIcon('mobile-back-outline',
                                size: 24, color: Colors.white54)))),
                const SizedBox(width: 50),
                SizedBox(
                    width: 52,
                    child: LauncherAction(
                        label: 'Домой',
                        onPressed: widget.onHome,
                        child: const Center(
                            child: OriginalIcon('mobile-home',
                                size: 24, color: Colors.white54)))),
              ])),
        ]),
      );
  Widget _section(String title, String description, Map<String, Object> spec,
          List<Widget> children) =>
      Padding(
          padding: const EdgeInsets.fromLTRB(12, 12, 12, 12),
          child:
              Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 12, vertical: 12),
                child: Row(children: [
                  Expanded(
                      child: Text(title,
                          style: const TextStyle(
                              fontSize: 20, fontWeight: FontWeight.w600))),
                  Tooltip(
                      message: copied.contains(title)
                          ? 'Скопировано'
                          : 'Скопировать конфигурацию',
                      child: SizedBox(
                          width: 32,
                          height: 32,
                          child: LauncherAction(
                              label: 'Скопировать конфигурацию $title',
                              onPressed: () => _copy(title, spec),
                              child: const Center(
                                  child: OriginalIcon('copy-outline',
                                      size: 20))))),
                ])),
            Padding(
                padding: const EdgeInsets.fromLTRB(12, 0, 12, 16),
                child: Text(description,
                    style: const TextStyle(
                        fontSize: 14, height: 20 / 14, color: Colors.white54))),
            ...children,
          ]));
  Widget _toggle(String section, String label, bool value,
          ValueChanged<bool> update) =>
      SwitchListTile(
        key: ValueKey('$section-$label'),
        title: Text(label, style: const TextStyle(fontSize: 18)),
        value: value,
        onChanged: (v) => setState(() => update(v)),
        activeTrackColor: const Color(0xFF8989FF),
        activeThumbColor: Colors.white,
      );
  Widget _select(String section, String label, String value,
          Map<String, String> items, ValueChanged<String> update) =>
      Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: Row(children: [
            Expanded(child: Text(label, style: const TextStyle(fontSize: 18))),
            DropdownButton<String>(
                key: ValueKey('$section-$label'),
                value: value,
                icon: const SizedBox.shrink(),
                items: items.entries
                    .map((e) =>
                        DropdownMenuItem(value: e.key, child: Text(e.value)))
                    .toList(),
                onChanged: (v) {
                  if (v != null) setState(() => update(v));
                }),
          ]));
  Widget _surface(Widget child) => Container(
      margin: const EdgeInsets.only(top: 12),
      padding: const EdgeInsets.symmetric(vertical: 12),
      decoration: BoxDecoration(
          color: const Color(0xFF141414),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: const Color(0x29FFFFFF))),
      child: child);
  Widget _action(String label, String icon, double size) => SizedBox(
      width: size,
      height: size,
      child: LauncherAction(
          label: label,
          onPressed: () {},
          child: Center(child: OriginalIcon(icon, size: 20))));
  Widget _tabs(bool segmented) {
    final current = segmented ? segmentedValue : tabsValue;
    final position = segmented ? segmentedActionPosition : tabsActionPosition;
    final interactive = segmented ? segmentedInteractive : tabsInteractive;
    final disableLast = segmented ? segmentedDisableLast : tabsDisableLast;
    // The source resolves a disabled selected tab to the first enabled tab.
    final selected = disableLast && current == 'settings' ? 'feed' : current;
    final list = Row(mainAxisSize: MainAxisSize.min, children: [
      for (final entry in {
        'feed': 'Лента',
        'files': segmented ? 'Проекты' : 'Файлы',
        'settings': 'Настройки'
      }.entries)
        Padding(
            padding: const EdgeInsets.symmetric(horizontal: 2),
            child: LauncherAction(
              label: '${segmented ? 'SegmentedTabs' : 'Tabs'}: ${entry.value}',
              selected: selected == entry.key,
              onPressed:
                  !interactive || (disableLast && entry.key == 'settings')
                      ? null
                      : () => setState(() {
                            if (segmented) {
                              segmentedValue = entry.key;
                            } else {
                              tabsValue = entry.key;
                            }
                          }),
              child: Container(
                  height: 48,
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                      color: selected == entry.key
                          ? const Color(0x14FFFFFF)
                          : Colors.transparent,
                      borderRadius: BorderRadius.circular(12)),
                  child: Text(entry.value,
                      style: TextStyle(
                          fontSize: 18,
                          fontWeight:
                              segmented ? FontWeight.w500 : FontWeight.w400,
                          color: selected == entry.key
                              ? Colors.white
                              : Colors.white54))),
            )),
    ]);
    return Row(children: [
      if (position == 'left')
        _action(segmented ? 'Фильтр' : 'Поиск', segmented ? 'filter' : 'search',
            60),
      Expanded(
          child: SingleChildScrollView(
              scrollDirection: Axis.horizontal, child: list)),
      if (position == 'right')
        _action(segmented ? 'Фильтр' : 'Поиск', segmented ? 'filter' : 'search',
            60),
    ]);
  }

  Widget _nav(String id, String label, String icon) => Expanded(
      child: LauncherAction(
          label: label,
          selected: navValue == id,
          onPressed: navDisableLast && id == 'settings'
              ? null
              : () => setState(() => navValue = id),
          child: Opacity(
              opacity: navDisableLast && id == 'settings' ? .56 : 1,
              child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    OriginalIcon(icon,
                        size: 20,
                        color: navValue == id ? Colors.white : Colors.white54),
                    if (navLabels) ...[
                      const SizedBox(height: 6),
                      Text(label,
                          style: TextStyle(
                              fontSize: 14,
                              color: navValue == id
                                  ? Colors.white
                                  : Colors.white54))
                    ],
                  ]))));
}
