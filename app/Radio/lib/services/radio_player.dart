import 'dart:async';

import 'package:audioplayers/audioplayers.dart';
import 'package:flutter/foundation.dart';

import '../models/station.dart';

class RadioPlayer extends ChangeNotifier {
  RadioPlayer({AudioPlayer? audioPlayer})
      : _audioPlayer = audioPlayer ?? AudioPlayer() {
    _stateSubscription = _audioPlayer.onPlayerStateChanged.listen((state) {
      _playing = state == PlayerState.playing;
      if (_playing || state == PlayerState.paused || state == PlayerState.stopped) {
        _loading = false;
      }
      notifyListeners();
    });
  }

  final AudioPlayer _audioPlayer;
  late final StreamSubscription<PlayerState> _stateSubscription;
  bool _playing = false;
  bool _loading = false;
  bool _hasError = false;

  bool get isPlaying => _playing;
  bool get isLoading => _loading;
  bool get hasError => _hasError;

  Future<void> toggle(Station station) async {
    if (_playing) {
      await _audioPlayer.pause();
      return;
    }
    _loading = true;
    _hasError = false;
    notifyListeners();
    try {
      await _audioPlayer.play(UrlSource(station.streamUrl));
    } on Object {
      _loading = false;
      _hasError = true;
      notifyListeners();
    }
  }

  Future<void> changeStation(Station station) async {
    final resume = _playing;
    await _audioPlayer.stop();
    _hasError = false;
    if (resume) await toggle(station);
  }

  @override
  void dispose() {
    _stateSubscription.cancel();
    _audioPlayer.dispose();
    super.dispose();
  }
}

