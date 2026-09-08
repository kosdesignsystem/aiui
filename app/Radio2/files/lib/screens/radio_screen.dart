import 'package:flutter/material.dart';

import '../models/station.dart';
import '../services/radio_player.dart';
import '../services/station_repository.dart';
import '../widgets/controls.dart';
import '../widgets/frequency.dart';
import '../widgets/tuner.dart';

class RadioScreen extends StatefulWidget {
  const RadioScreen({Key? key}) : super(key: key);

  @override
  State<RadioScreen> createState() => _RadioScreenState();
}

class _RadioScreenState extends State<RadioScreen> {
  final StationRepository _stations = StationRepository();
  final RadioPlayer _player = RadioPlayer();
  List<Station> _items = StationRepository.fallback;
  int _index = 0;

  Station get _station => _items[_index];

  @override
  void initState() {
    super.initState();
    _player.addListener(_refresh);
    _load();
  }

  Future<void> _load() async {
    final items = await _stations.load();
    if (!mounted || items.isEmpty) {
      return;
    }
    final shouldRetune = _player.shouldPlay;
    setState(() {
      _items = items;
      _index = 0;
    });
    if (shouldRetune) {
      await _player.tune(_station);
    }
  }

  void _refresh() {
    if (mounted) {
      setState(() {});
    }
  }

  Future<void> _tune(int index) async {
    final next = (index + _items.length) % _items.length;
    if (next == _index) {
      return;
    }
    setState(() => _index = next);
    await _player.tune(_station);
  }

  Future<void> _toggle() async {
    if (await _player.toggle(_station)) {
      await _stations.recordPlay(_station);
    }
  }

  @override
  void dispose() {
    _player.removeListener(_refresh);
    _player.dispose();
    _stations.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final compact = MediaQuery.of(context).size.height <= 720;
    final top = compact
        ? 36.0
        : (MediaQuery.of(context).size.height * .14).clamp(72.0, 120.0);
    return Scaffold(
      backgroundColor: Colors.black,
      body: SafeArea(
        minimum: const EdgeInsets.fromLTRB(18, 28, 18, 72),
        child: Column(
          children: <Widget>[
            SizedBox(height: top),
            Frequency(value: _station.frequency),
            const SizedBox(height: 28),
            Text(
              _station.name,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              textAlign: TextAlign.center,
              style: const TextStyle(
                color: Color(0xFF858585),
                fontSize: 24,
                height: 1.25,
              ),
            ),
            if (_station.country.isNotEmpty) ...<Widget>[
              const SizedBox(height: 10),
              Text(
                _station.country,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(
                  color: Color(0xFF505050),
                  fontSize: 16,
                  fontWeight: FontWeight.w500,
                  height: 1.25,
                ),
              ),
            ],
            SizedBox(height: compact ? 38 : 76),
            Tuner(
              index: _index,
              count: _items.length,
              height: compact ? 105 : 128,
              onChanged: _tune,
            ),
            const Spacer(),
            Align(
              alignment: Alignment.centerLeft,
              child: Padding(
                padding: const EdgeInsets.fromLTRB(3, 0, 3, 16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    const Text(
                      'Сейчас в эфире',
                      style: TextStyle(color: Color(0xFF777777), fontSize: 14),
                    ),
                    const SizedBox(height: 5),
                    Text(
                      _player.hasError ? 'Поток недоступен' : _station.name,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 24,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
              ),
            ),
            Controls(
              playing: _player.isPlaying,
              loading: _player.isLoading,
              height: compact ? 90 : 104,
              onPrevious: () => _tune(_index - 1),
              onToggle: _toggle,
              onNext: () => _tune(_index + 1),
            ),
          ],
        ),
      ),
    );
  }
}
