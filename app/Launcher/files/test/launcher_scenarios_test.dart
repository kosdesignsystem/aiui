import 'dart:convert';
import 'package:http/http.dart' as http;
import 'dart:ui' as ui;
import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/services.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:launcher/main.dart';
import 'package:launcher/models/launcher_model.dart';
import 'package:launcher/platform/launcher_platform.dart';
import 'package:launcher/screens/navigation_catalog.dart';
import 'package:launcher/widgets/control_shade.dart';
import 'package:launcher/widgets/home_grid.dart';
import 'package:launcher/widgets/launcher_action.dart';
import 'package:launcher/widgets/launcher_chrome.dart';
import 'package:launcher/widgets/recents_view.dart';

Finder action(String label) =>
    find.byWidgetPredicate((w) => w is LauncherAction && w.label == label);
Future<void> boot(WidgetTester tester, {LauncherPlatform? platform}) async {
  tester.view.physicalSize = const Size(360, 800);
  tester.view.devicePixelRatio = 1;
  addTearDown(tester.view.resetPhysicalSize);
  addTearDown(tester.view.resetDevicePixelRatio);
  await tester.pumpWidget(LauncherApplication(platform: platform));
  await tester.pumpAndSettle();
}

Future<void> swipe(WidgetTester tester, Offset start, Offset delta) async {
  await tester.dragFrom(start, delta);
  await tester.pumpAndSettle();
}

Future<void> unlock(WidgetTester tester) async {
  await swipe(tester, const Offset(180, 650), const Offset(0, -130));
  expect(find.byType(PinPadView), findsOneWidget);
  for (final digit in ['1', '2', '3', '4']) {
    await tester.tap(find.text(digit));
    await tester.pump(const Duration(milliseconds: 30));
  }
  await tester.pumpAndSettle();
  expect(find.byType(HomeGrid), findsOneWidget);
}

void main() {
  final binding = TestWidgetsFlutterBinding.ensureInitialized();
  const assetBase = String.fromEnvironment('LAUNCHER_TEST_ASSETS');
  if (kIsWeb && assetBase.isEmpty) {
    throw StateError('Run browser tests with: python3 tool/test_in_chrome.py');
  }
  if (kIsWeb && assetBase.isNotEmpty) {
    // Flutter's web widget-test host does not serve the application asset bundle.
    // Only the test transport changes; the actual bytes come from files/assets.
    final base = Uri.parse(assetBase);
    binding.defaultBinaryMessenger.setMockMessageHandler('flutter/assets',
        (data) {
      final key = utf8.decode(
          data!.buffer.asUint8List(data.offsetInBytes, data.lengthInBytes));
      return http.get(base.resolve(key)).then((response) {
        if (response.statusCode != 200) {
          throw StateError('Asset HTTP ${response.statusCode}: $key');
        }
        return ByteData.sublistView(response.bodyBytes);
      });
    });
  }

  testWidgets(
      'Original resources decode: all PNGs, all SVGs and original font files',
      (tester) async {
    await boot(tester);
    await tester.runAsync(() async {
      final manifest =
          jsonDecode(await rootBundle.loadString('assets-manifest.json'))
              as Map<String, dynamic>;
      for (final dynamic entry in manifest['assets']) {
        final path = entry['target'] as String;
        final bytes = await rootBundle.load(path);
        expect(bytes.lengthInBytes, greaterThan(0), reason: path);
        if (path.endsWith('.png')) {
          final codec = await ui.instantiateImageCodec(bytes.buffer
              .asUint8List(bytes.offsetInBytes, bytes.lengthInBytes));
          final frame = await codec.getNextFrame();
          expect(frame.image.width, greaterThan(0), reason: path);
          frame.image.dispose();
          codec.dispose();
        } else if (path.endsWith('.svg')) {
          final picture = await vg.loadPicture(SvgAssetLoader(path), null);
          expect(picture.size.width, greaterThan(0), reason: path);
          picture.picture.dispose();
        } else {
          final loader = FontLoader('verify-$path')
            ..addFont(Future.value(bytes));
          await loader.load();
        }
      }
    });
    expect(tester.takeException(), isNull);
  });
  testWidgets('Lock threshold, PIN cancel/reset and four arbitrary digits',
      (tester) async {
    await boot(tester);
    await swipe(tester, const Offset(180, 650), const Offset(0, -40));
    expect(find.byType(LockView), findsOneWidget);
    await swipe(tester, const Offset(180, 650), const Offset(0, -130));
    await tester.tap(find.text('2'));
    await tester.pump();
    expect(find.byKey(const ValueKey('pin-dots-1')), findsOneWidget);
    await tester.tap(find.text('Отменить'));
    await tester.pumpAndSettle();
    expect(find.byType(LockView), findsOneWidget);
    await unlock(tester);
    expect(tester.takeException(), isNull);
  });
  testWidgets(
      'Both home pages, unavailable apps and all six launch/home scenarios',
      (tester) async {
    await boot(tester);
    await unlock(tester);
    await swipe(tester, const Offset(280, 550), const Offset(-160, 0));
    expect(tester.widget<LauncherAction>(action('Карты')).onPressed, isNull);
    await tester.tap(action('Карты'));
    await tester.pumpAndSettle();
    expect(find.byType(HomeGrid), findsOneWidget);
    await tester.tap(action('Перейти на страницу 1'));
    await tester.pumpAndSettle();
    for (final item in launchableItems) {
      await tester.tap(action(item.label));
      await tester.pumpAndSettle();
      final preview = find.byWidgetPredicate((w) =>
          w is Semantics && w.properties.label == 'Приложение «${item.label}»');
      expect(preview, findsOneWidget, reason: item.id);
      expect(
          tester.widget<LauncherStatusBar>(find.byType(LauncherStatusBar)).dark,
          item.darkStatusBar);
      await tester.tap(action('Домой'));
      await tester.pumpAndSettle();
      expect(find.byType(HomeGrid), findsOneWidget);
    }
    expect(tester.takeException(), isNull);
  });
  testWidgets(
      'Shade toggle states, slider drag/keyboard, close/reset and application origin',
      (tester) async {
    await boot(tester);
    await unlock(tester);
    await swipe(tester, const Offset(180, 100), const Offset(0, 140));
    expect(find.byType(ControlShade), findsOneWidget);
    await tester.tap(action('Wi-Fi, Выключено'));
    await tester.pumpAndSettle();
    expect(action('Wi-Fi, KLCorp'), findsOneWidget);
    await tester.tap(action('Моб. интернет, Megafon LTE'));
    await tester.pumpAndSettle();
    expect(action('Моб. интернет, Выключено'), findsOneWidget);
    for (final label in [
      'Режим полета',
      'Геолокация',
      'Без звука',
      'Фонарик'
    ]) {
      final before = tester.widget<LauncherAction>(action(label)).toggled;
      await tester.tap(action(label));
      await tester.pumpAndSettle();
      expect(tester.widget<LauncherAction>(action(label)).toggled, !before!);
    }
    final volume = find.byType(ShadeSlider).first;
    await tester.drag(volume, const Offset(-180, -90));
    await tester.pumpAndSettle();
    expect(find.byType(ControlShade), findsOneWidget);
    expect(tester.widget<ShadeSlider>(volume).value, lessThan(100));
    await tester.sendKeyEvent(LogicalKeyboardKey.home);
    await tester.pumpAndSettle();
    expect(tester.widget<ShadeSlider>(volume).value, 0);
    await tester.sendKeyEvent(LogicalKeyboardKey.end);
    await tester.pumpAndSettle();
    expect(tester.widget<ShadeSlider>(volume).value, 100);
    await tester.tap(action('Закрыть панель'));
    await tester.pumpAndSettle();
    await tester.tap(action('Камера'));
    await tester.pumpAndSettle();
    await swipe(tester, const Offset(180, 100), const Offset(0, 140));
    expect(action('Wi-Fi, Выключено'), findsOneWidget);
    await swipe(tester, const Offset(180, 680), const Offset(0, -130));
    expect(find.byType(ControlShade), findsNothing);
    expect(
        find.byWidgetPredicate((w) =>
            w is Semantics && w.properties.label == 'Приложение «Камера»'),
        findsOneWidget);
    expect(tester.takeException(), isNull);
  });
  testWidgets(
      'Recents: horizontal paging, dismiss, reopen, close all and source reset',
      (tester) async {
    await boot(tester);
    await unlock(tester);
    await tester.tap(action('Телефон'));
    await tester.pumpAndSettle();
    await swipe(tester, const Offset(180, 650), const Offset(0, -150));
    expect(find.byType(RecentsView), findsOneWidget);
    final card =
        action('Открыть приложение «Телефон». Смахните вверх, чтобы закрыть');
    await tester.tap(card);
    await tester.pumpAndSettle();
    expect(find.byType(RecentsView), findsNothing);
    await swipe(tester, const Offset(180, 650), const Offset(0, -150));
    await tester.drag(card, const Offset(0, -170));
    await tester.pump(const Duration(milliseconds: 500));
    await tester.pumpAndSettle();
    expect(card, findsNothing);
    await tester.dragFrom(const Offset(180, 420), const Offset(-180, 0));
    await tester.pumpAndSettle();
    await tester.tap(find.text('Закрыть все'));
    await tester.pumpAndSettle();
    expect(find.byType(HomeGrid), findsOneWidget);
    await swipe(tester, const Offset(180, 650), const Offset(0, -150));
    expect(card,
        findsOneWidget); // React remounts the original demo list each time.
    expect(tester.takeException(), isNull);
  });
  testWidgets(
      'Recents drag paints the whole card above the former viewport and cancels cleanly',
      (tester) async {
    await boot(tester);
    await unlock(tester);
    await swipe(tester, const Offset(180, 650), const Offset(0, -150));
    final preview = recentPreview('camera');
    final initial = tester.getRect(preview);
    final gesture = await tester.startGesture(initial.center);
    await gesture.moveBy(const Offset(0, -120));
    await tester.pump();
    final dragged = tester.getRect(preview);
    // The top of this card now crosses the old PageView boundary (~124).
    expect(dragged.top, lessThan(124));
    final painted = visiblePaintRect(tester, preview);
    expect(painted.top, closeTo(dragged.top, .01));
    expect(painted.bottom, closeTo(dragged.bottom, .01));
    await gesture.cancel();
    await tester.pumpAndSettle();
    expect(tester.getRect(preview).top, closeTo(initial.top, .01));
    expect(tester.takeException(), isNull);
  });
  testWidgets(
      'Dismiss preserves app identity and brings the neighbor from the side without a jump',
      (tester) async {
    await boot(tester);
    await unlock(tester);
    await swipe(tester, const Offset(180, 650), const Offset(0, -150));
    final camera = recentPreview('camera');
    final phone = recentPreview('calls');
    final initialPhone = tester.getRect(phone);
    final initialPhoneElement = phone.evaluate().single;
    final gesture = await tester.startGesture(tester.getRect(camera).center);
    await gesture.moveBy(const Offset(0, -140));
    await tester.pump();
    final releaseTop = tester.getRect(camera).top;
    await gesture.up();
    await tester.pump();
    expect(tester.getRect(camera).top, closeTo(releaseTop, .01),
        reason: 'The dismissed card must not jump back before flying out');
    await tester.pump(const Duration(milliseconds: 200));
    final during = tester.getRect(phone);
    expect(during.center.dx, lessThan(initialPhone.center.dx));
    expect(during.center.dx, greaterThan(180));
    expect(during.top, greaterThan(120),
        reason:
            'The neighbor must not inherit the outgoing vertical translation');
    await tester.pump(const Duration(milliseconds: 259));
    final beforeRemoval = tester.getRect(phone);
    await tester.pump(const Duration(milliseconds: 2));
    final afterRemoval = tester.getRect(phone);
    expect(afterRemoval.center.dx, closeTo(beforeRemoval.center.dx, 1));
    expect(afterRemoval.top, closeTo(beforeRemoval.top, 1));
    expect(phone.evaluate().single, same(initialPhoneElement),
        reason: 'The surviving app keeps its element and animation state');
    await tester.pumpAndSettle();
    expect(tester.getRect(phone).center.dx, closeTo(180, .01));
    expect(find.byKey(const ValueKey('recent-slot-camera')), findsNothing);
    // Removing the last card promotes the preceding card from the left.
    for (var i = 0; i < 4; i++) {
      await swipe(tester, const Offset(180, 420), const Offset(-180, 0));
    }
    final gallery = recentPreview('gallery');
    final settings = recentPreview('settings');
    final preceding = tester.getRect(settings);
    expect(tester.getRect(gallery).center.dx, closeTo(180, .01));
    await tester.drag(gallery, const Offset(0, -140));
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 200));
    expect(
        tester.getRect(settings).center.dx, greaterThan(preceding.center.dx));
    expect(tester.getRect(settings).center.dx, lessThan(180));
    await tester.pump(const Duration(milliseconds: 300));
    await tester.pumpAndSettle();
    expect(tester.getRect(settings).center.dx, closeTo(180, .01));
    expect(tester.takeException(), isNull);
  });
  testWidgets('Reachable Navigation route and return Home', (tester) async {
    final platform = _RecordingPlatform();
    await boot(tester, platform: platform);
    await unlock(tester);
    await swipe(tester, const Offset(180, 100), const Offset(0, 140));
    expect(tester.widget<ControlShade>(find.byType(ControlShade)).platform,
        same(platform));
    await tester.tap(action('Перейти в настройки'));
    await tester.pumpAndSettle();
    expect(find.byType(NavigationCatalog), findsOneWidget);
    await tester.tap(action('Скопировать конфигурацию Header'));
    await tester.pumpAndSettle();
    expect(platform.copied,
        'Header({ title: "Проекты", action: true, meta: true })');
    final toggle = find.byKey(const ValueKey('Header-Long title'));
    await tester.ensureVisible(toggle);
    await tester.tap(toggle);
    await tester.pumpAndSettle();
    expect(find.text('Мои последние проекты'), findsOneWidget);
    await tester.tap(action('Домой'));
    await tester.pumpAndSettle();
    expect(find.byType(HomeGrid), findsOneWidget);
    expect(tester.takeException(), isNull);
  });
  testWidgets('Navigation catalog values, disabled previews and copied config',
      (tester) async {
    tester.view.physicalSize = const Size(360, 800);
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);
    final platform = _RecordingPlatform();
    await tester.pumpWidget(MaterialApp(
        theme: ThemeData.dark(),
        home: NavigationCatalog(onHome: () {}, platform: platform)));
    await tester.pumpAndSettle();
    await tester.tap(action('Скопировать конфигурацию Header'));
    await tester.pumpAndSettle();
    expect(platform.copied,
        'Header({ title: "Проекты", action: true, meta: true })');
    final interactive = find.byKey(const ValueKey('Tabs-Interactive'));
    await tester.scrollUntilVisible(interactive, 200,
        scrollable: find.byType(Scrollable).first);
    await tester.pumpAndSettle();
    await tester.ensureVisible(interactive);
    await tester.pumpAndSettle();
    await tester.tap(interactive);
    await tester.pumpAndSettle();
    final tabs = action('Tabs: Лента');
    await tester.ensureVisible(tabs);
    await tester.pumpAndSettle();
    expect(tester.widget<LauncherAction>(tabs).onPressed, isNull);
    final last = find.byKey(const ValueKey('SegmentedTabs-Disable last tab'));
    await tester.scrollUntilVisible(last, 200,
        scrollable: find.byType(Scrollable).first);
    await tester.pumpAndSettle();
    await tester.ensureVisible(last);
    await tester.pumpAndSettle();
    await tester.tap(last);
    await tester.pumpAndSettle();
    final settings = action('SegmentedTabs: Настройки');
    await tester.ensureVisible(settings);
    await tester.pumpAndSettle();
    expect(tester.widget<LauncherAction>(settings).onPressed, isNull);
    expect(tester.takeException(), isNull);
  });
}

class _RecordingPlatform extends DemoLauncherPlatform {
  String? copied;
  @override
  Future<void> copyText(String text) async {
    copied = text;
  }
}

Finder recentPreview(String id) => find
    .descendant(
      of: find.byKey(ValueKey('recent-slot-$id')),
      matching: find.byType(Image),
    )
    .last;

/// Approximate the actual visible paint bounds, including every ancestor clip.
/// This catches a viewport clipping the card even when its layout rect is whole.
Rect visiblePaintRect(WidgetTester tester, Finder finder) {
  final box = tester.renderObject<RenderBox>(finder);
  Rect visible = MatrixUtils.transformRect(
      box.getTransformTo(null), Offset.zero & box.size);
  RenderObject child = box;
  while (child.parent is RenderObject) {
    final parent = child.parent!;
    final clip = parent.describeApproximatePaintClip(child);
    if (clip != null) {
      visible = visible.intersect(
          MatrixUtils.transformRect(parent.getTransformTo(null), clip));
    }
    child = parent;
  }
  return visible;
}
