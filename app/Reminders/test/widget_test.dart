import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:reminders/main.dart';

void main() {
  testWidgets('shows reminders list and goal setup flow', (tester) async {
    tester.view.devicePixelRatio = 1;
    tester.view.physicalSize = const Size(360, 800);
    addTearDown(tester.view.resetDevicePixelRatio);
    addTearDown(tester.view.resetPhysicalSize);

    await tester.pumpWidget(const RemindersApp());
    await tester.pumpAndSettle();

    expect(find.text('Напоминания'), findsOneWidget);
    expect(find.text('Продуктивность'), findsOneWidget);
    expect(find.text('Количество задач в день'), findsOneWidget);

    await tester.tap(find.text('Начать'));
    await tester.pumpAndSettle();

    expect(find.text('Согласовать макет главного экрана'), findsOneWidget);
    expect(find.text('Создать задачу'), findsOneWidget);
  });
}
