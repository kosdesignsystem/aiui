import 'package:flutter_test/flutter_test.dart';
import 'package:main/main.dart';

void main() {
  testWidgets('Settings v1 main renders screen title', (WidgetTester tester) async {
    await tester.pumpWidget(const SettingsV1MainApp());

    expect(find.text('Настройки'), findsOneWidget);
  });
}
