import 'dart:async';

import 'package:audioplayers/audioplayers.dart';
import 'package:flutter/foundation.dart';

import '../models/station.dart';

class RadioPlayer extends ChangeNotifier {
  RadioPlayer() {
    _stateSub = _audio.onPlayerStateChanged.listen((state) {
      _playing = state == PlayerState.PLAYING;
      if (_playing ||
          state == PlayerState.PAUSED ||
          state == PlayerState.STOPPED) {
        _loading = false;
      }
      notifyListeners();
    }, onError: (_) => _fail());
    _errorSub = _audio.onPlayerError.listen((_) => _fail());
  }

  final AudioPlayer _audio = AudioPlayer();
  late final StreamSubscription<PlayerState> _stateSub;
  late final StreamSubscription<String?> _errorSub;
  bool _wanted = false;
  bool _playing = false;
  bool _loading = false;
  bool _hasError = false;

  bool get isPlaying => _playing;
  bool get isLoading => _loading;
  bool get hasError => _hasError;
  bool get shouldPlay => _wanted;

  Future<bool> toggle(Station station) async {
    if (_wanted) {
      _wanted = false;
      await _audio.pause();
      return false;
    }

    _wanted = true;
    return _play(station);
  }

  Future<void> tune(Station station) async {
    final resume = _wanted;
    await _audio.stop();
    _hasError = false;
    if (resume) {
      await _play(station);
    } else {
      notifyListeners();
    }
  }

  Future<bool> _play(Station station) async {
    _loading = true;
    _hasError = false;
    notifyListeners();
    try {
      final result = await _audio.play(station.url);
      if (result != 1) {
        _fail();
        return false;
      }
      return true;
    } catch (_) {
      _fail();
      return false;
    }
  }

  void _fail() {
    _wanted = false;
    _playing = false;
    _loading = false;
    _hasError = true;
    notifyListeners();
  }

  @override
  void dispose() {
    _stateSub.cancel();
    _errorSub.cancel();
    _audio.dispose();
    super.dispose();
  }
}
