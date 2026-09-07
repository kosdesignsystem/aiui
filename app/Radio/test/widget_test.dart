import 'package:flutter_test/flutter_test.dart';
import 'package:radio/main.dart';

void main() {
  testWidgets('shows the fallback radio station and controls', (tester) async {
    await tester.pumpWidget(const RadioApp());
    await tester.pump();

    expect(find.text('Groove Salad'), findsWidgets);
    expect(find.text('87.5'), findsOneWidget);
    expect(find.text('Play'), findsOneWidget);
    expect(find.text('Сейчас в эфире'), findsOneWidget);
  });
}
