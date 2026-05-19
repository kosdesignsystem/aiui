import 'package:flutter_test/flutter_test.dart';
import 'package:reminders/main.dart';

void main() {
  testWidgets('shows reminders list and goal setup flow', (tester) async {
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
