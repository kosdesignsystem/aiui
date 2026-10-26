import 'my_phone_platform.dart';

/// Explicit hand-off stub for the KasperskyOS integration team.
///
/// Non-web builds select this adapter by default so missing platform work is
/// visible during integration instead of being mistaken for working device
/// control. Connect every method to approved KOS services before device QA.
class UnimplementedKosMyPhonePlatformAdapter extends MyPhonePlatformAdapter {
  const UnimplementedKosMyPhonePlatformAdapter();

  @override
  bool get isDemo => false;

  Never _missing(String operation) {
    throw UnsupportedError(
      'KasperskyOS platform operation is not implemented: $operation',
    );
  }

  @override
  Future<void> setToggle(MyPhoneSystemToggle toggle, bool enabled) =>
      _missing('setToggle($toggle)');

  @override
  Future<void> setVolume(double value) => _missing('setVolume');

  @override
  Future<void> setBrightness(double value) => _missing('setBrightness');

  @override
  Future<bool> openSystemSettings() => _missing('openSystemSettings');
}
