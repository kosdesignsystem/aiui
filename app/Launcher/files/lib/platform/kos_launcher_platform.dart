import 'launcher_platform.dart';

/// SDK-specific code supplies this callback after initializing its bridge.
/// Complete only after the system clipboard write succeeds; propagate errors.
typedef ClipboardWriter = Future<void> Function(String text);

/// KOS handoff adapter, not an implementation of KOS hardware services.
/// Controls intentionally retain the browser prototype's local/reset behavior.
/// No channel name or native API is assumed without the target SDK.
class KosLauncherPlatform implements LauncherPlatform {
  const KosLauncherPlatform({this.writeClipboard});

  final ClipboardWriter? writeClipboard;

  @override
  ControlState createControls() => ControlState();

  @override
  Future<void> copyText(String text) async {
    final writer = writeClipboard;
    if (writer == null) {
      throw UnsupportedError('KOS clipboard bridge has not been connected');
    }
    await writer(text);
  }
}
