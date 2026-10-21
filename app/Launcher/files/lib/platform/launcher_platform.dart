import 'package:flutter/services.dart';

/// Platform boundary. createControls returns a new local UI model per shade.
/// Radio, location, flashlight, volume and brightness remain demo state.
/// copyText must complete only on success and propagate platform failures.
abstract class LauncherPlatform {
  ControlState createControls();
  Future<void> copyText(String text);
}

/// Browser prototype: local controls plus Flutter's clipboard implementation.
/// Used explicitly in isolated widget previews/tests as well.
class DemoLauncherPlatform implements LauncherPlatform {
  const DemoLauncherPlatform();
  @override
  ControlState createControls() => ControlState();
  @override
  Future<void> copyText(String text) =>
      Clipboard.setData(ClipboardData(text: text));
}

class ControlState {
  bool mobile = true;
  bool wifi = false;
  final Map<String, bool> quick = {
    'airplane': false,
    'location': true,
    'silent': true,
    'flashlight': false
  };
  double volume = 100;
  double brightness = 46;
}
