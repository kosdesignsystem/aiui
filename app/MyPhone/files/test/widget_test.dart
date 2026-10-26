import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:my_phone/main.dart';
import 'package:my_phone/platform/my_phone_platform.dart';

class RecordingPlatformAdapter extends MyPhonePlatformAdapter {
  final List<String> calls = <String>[];

  @override
  bool get isDemo => false;

  @override
  Future<bool> openSystemSettings() async {
    calls.add('openSystemSettings');
    return false;
  }

  @override
  Future<void> setBrightness(double value) async {
    calls.add('brightness:${value.round()}');
  }

  @override
  Future<void> setToggle(MyPhoneSystemToggle toggle, bool enabled) async {
    calls.add('$toggle:$enabled');
  }

  @override
  Future<void> setVolume(double value) async {
    calls.add('volume:${value.round()}');
  }
}

Future<void> unlockPhone(WidgetTester tester) async {
  await tester.drag(find.byType(MyPhoneApp), const Offset(0, -110));
  await tester.pumpAndSettle();
  expect(find.byKey(const Key('pin-title')), findsOneWidget);

  for (final digit in <int>[1, 2, 3, 4]) {
    await tester.tap(find.byKey(Key('pin-$digit')));
    await tester.pump(const Duration(milliseconds: 20));
  }
  await tester.pump(const Duration(milliseconds: 150));
  await tester.pumpAndSettle();
  expect(find.text('Камера'), findsOneWidget);
}

void main() {
  testWidgets('unlock, shade controls, and settings adapter work',
      (WidgetTester tester) async {
    final adapter = RecordingPlatformAdapter();
    await tester.pumpWidget(MyPhoneApp(platformAdapter: adapter));
    expect(find.byKey(const Key('unlock-hint')), findsOneWidget);
    expect(
      tester.getSize(find.byKey(const Key('unlock-handle'))),
      const Size(72, 11),
    );

    await unlockPhone(tester);
    await tester.drag(
        find.byKey(const Key('home-pages')), const Offset(-220, 0));
    await tester.pumpAndSettle();
    expect(find.text('Карты'), findsOneWidget);
    await tester.tap(find.byKey(const Key('app-maps')));
    await tester.pumpAndSettle();
    expect(find.text('Карты'), findsOneWidget);
    await tester.drag(
        find.byKey(const Key('home-pages')), const Offset(220, 0));
    await tester.pumpAndSettle();

    await tester.drag(
        find.byKey(const Key('home-pages')), const Offset(0, 120));
    await tester.pumpAndSettle();
    expect(find.byKey(const Key('wifi-toggle')), findsOneWidget);

    await tester.tap(find.byKey(const Key('wifi-toggle')));
    await tester.pump();
    expect(tester.binding.transientCallbackCount, greaterThan(0));
    await tester.pump(const Duration(milliseconds: 120));
    expect(tester.binding.transientCallbackCount, greaterThan(0));
    await tester.pumpAndSettle();
    expect(find.text('KLCorp'), findsOneWidget);
    expect(
      adapter.calls,
      contains('${MyPhoneSystemToggle.wifi}:true'),
    );

    await tester.tap(find.byKey(const Key('open-settings')));
    await tester.pumpAndSettle();
    expect(adapter.calls, contains('openSystemSettings'));
    expect(find.bySemanticsLabel('Приложение «Настройки»'), findsOneWidget);
  });

  testWidgets('launch, recents, and close all return home',
      (WidgetTester tester) async {
    await tester.pumpWidget(const MyPhoneApp());
    await unlockPhone(tester);

    await tester.tap(find.byKey(const Key('app-camera')));
    await tester.pump(const Duration(milliseconds: 760));
    await tester.pumpAndSettle();
    expect(find.bySemanticsLabel('Приложение «Камера»'), findsOneWidget);

    await tester.drag(find.byType(MyPhoneApp), const Offset(0, -120));
    await tester.pump();
    expect(find.byKey(const Key('recent-enter-transition')), findsOneWidget);
    final startTransitionSize =
        tester.getSize(find.byKey(const Key('recent-enter-transition')));
    expect(startTransitionSize.width, greaterThan(222));
    await tester.pump(const Duration(milliseconds: 190));
    final middleTransitionSize =
        tester.getSize(find.byKey(const Key('recent-enter-transition')));
    expect(middleTransitionSize.width, lessThan(startTransitionSize.width));
    await tester.pumpAndSettle();
    expect(find.byKey(const Key('recent-enter-transition')), findsNothing);
    expect(find.byKey(const Key('close-all')), findsOneWidget);

    await tester.drag(find.byKey(const ValueKey<String>('recent-camera')),
        const Offset(0, -140));
    await tester.pump(const Duration(milliseconds: 100));
    expect(find.byKey(const Key('promoted-calls')), findsOneWidget);
    await tester.pumpAndSettle();
    expect(find.byKey(const ValueKey<String>('recent-camera')), findsNothing);

    await tester.tap(find.byKey(const Key('close-all')));
    await tester.pumpAndSettle();
    expect(find.text('Камера'), findsOneWidget);
  });
}
