import 'package:flutter_test/flutter_test.dart';
import 'package:launcher/platform/kos_launcher_platform.dart';

void main() {
  test('Unconnected KOS clipboard fails instead of reporting success',
      () async {
    await expectLater(const KosLauncherPlatform().copyText('configuration'),
        throwsUnsupportedError);
  });

  test('KOS clipboard awaits the bridge and propagates a failed write',
      () async {
    String? copied;
    final platform = KosLauncherPlatform(writeClipboard: (text) async {
      copied = text;
    });
    await platform.copyText('Header({ title: "Проекты" })');
    expect(copied, 'Header({ title: "Проекты" })');

    final failure = StateError('clipboard unavailable');
    final failing = KosLauncherPlatform(writeClipboard: (_) async {
      throw failure;
    });
    await expectLater(
        failing.copyText('configuration'), throwsA(same(failure)));
  });
}
