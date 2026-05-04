import 'package:flutter/widgets.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:reminders/main.dart';

void main() {
  testWidgets('renders reminders and creates a prepared task', (tester) async {
    await tester.pumpWidget(const RemindersApp());

    expect(find.text('Напоминания'), findsOneWidget);
    expect(find.text('Согласовать макет главного экрана'), findsOneWidget);

    await tester.tap(find.text('Создать задачу'));
    await tester.pumpAndSettle();

    expect(find.text('Подготовить статус по проекту'), findsOneWidget);
  });

  testWidgets('searches reminders by title', (tester) async {
    await tester.pumpWidget(const RemindersApp());

    await tester.tap(find.byTooltip('Поиск'));
    await tester.pumpAndSettle();
    await tester.enterText(find.byType(EditableText), 'батарейки');
    await tester.pumpAndSettle();

    expect(find.text('Купить батарейки для датчика'), findsOneWidget);
  });
}
