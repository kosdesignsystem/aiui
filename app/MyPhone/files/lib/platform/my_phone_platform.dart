enum MyPhoneSystemToggle {
  mobileData,
  wifi,
  airplaneMode,
  location,
  silentMode,
  flashlight,
}

/// Contract between the shared Flutter UI and platform services.
///
/// A KasperskyOS implementation should delegate these calls to the approved
/// KOS services and return `true` from [openSystemSettings] only when the
/// platform navigation request was accepted.
abstract class MyPhonePlatformAdapter {
  const MyPhonePlatformAdapter();

  bool get isDemo;

  Future<void> setToggle(MyPhoneSystemToggle toggle, bool enabled);

  Future<void> setVolume(double value);

  Future<void> setBrightness(double value);

  Future<bool> openSystemSettings();
}

/// Browser-only behaviour used by the current preview.
///
/// It deliberately performs no device I/O. State remains owned by the Flutter
/// widgets, which makes the demo deterministic and prevents it from being
/// mistaken for a working KasperskyOS integration.
class DemoMyPhonePlatformAdapter extends MyPhonePlatformAdapter {
  const DemoMyPhonePlatformAdapter();

  @override
  bool get isDemo => true;

  @override
  Future<void> setToggle(MyPhoneSystemToggle toggle, bool enabled) async {}

  @override
  Future<void> setVolume(double value) async {}

  @override
  Future<void> setBrightness(double value) async {}

  @override
  Future<bool> openSystemSettings() async => false;
}
