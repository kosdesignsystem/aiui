import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:reminders/main.dart';
import 'package:reminders/state/reminders_session.dart';

void main() {
  setUp(RemindersSession.reset);

  testWidgets('shows reminders list and goal setup flow', (tester) async {
    await _pumpRemindersApp(tester);

    expect(find.text('Напоминания'), findsOneWidget);
    expect(find.text('Продуктивность'), findsOneWidget);
    expect(find.text('Количество задач в день'), findsOneWidget);

    await tester.tap(find.text('Начать'));
    await tester.pumpAndSettle();

    expect(find.text('Согласовать макет главного экрана'), findsOneWidget);
    expect(find.text('Создать задачу'), findsOneWidget);
  });

  testWidgets('creates a task from the creation sheet', (tester) async {
    await _pumpRemindersApp(tester);
    await tester.tap(find.text('Начать'));
    await tester.pumpAndSettle();

    await tester.tap(find.text('Создать задачу'));
    await tester.pumpAndSettle();

    expect(find.text('Новая задача'), findsOneWidget);

    await tester.enterText(find.byType(TextField), 'Проверить релизный билд');
    await tester.pump();
    await tester.tap(find.text('Создать'));
    await tester.pumpAndSettle();

    expect(find.text('Проверить релизный билд'), findsOneWidget);
  });

  testWidgets('filters reminders in search mode', (tester) async {
    await _pumpRemindersApp(tester);
    await tester.tap(find.text('Начать'));
    await tester.pumpAndSettle();

    await tester.tap(find.byIcon(Icons.search));
    await tester.pumpAndSettle();
    await tester.enterText(find.byType(TextField), 'батарейки');
    await tester.pumpAndSettle();

    expect(find.text('Купить батарейки для датчика'), findsOneWidget);
    expect(find.text('Согласовать макет главного экрана'), findsNothing);
  });
}

Future<void> _pumpRemindersApp(WidgetTester tester) async {
  tester.view.devicePixelRatio = 1;
  tester.view.physicalSize = const Size(360, 800);
  addTearDown(tester.view.resetDevicePixelRatio);
  addTearDown(tester.view.resetPhysicalSize);

  await tester.pumpWidget(const RemindersApp());
  await tester.pumpAndSettle();
}
