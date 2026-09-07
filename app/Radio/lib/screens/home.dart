import 'package:flutter/material.dart';

import '../models/station.dart';
import '../services/radio_player.dart';
import '../services/station_repository.dart';
import '../theme/tokens.dart';
import '../theme/typography.dart';
import '../widgets/radio_controls.dart';
import '../widgets/rolling_frequency.dart';
import '../widgets/screen_scaffold.dart';
import '../widgets/tuner.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key, this.repository, this.player});

  final StationRepository? repository;
  final RadioPlayer? player;

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  late final StationRepository _repository;
  late final RadioPlayer _player;
  List<Station> _stations = fallbackStations;
  int _stationIndex = 0;

  Station get _station => _stations[_stationIndex];

  @override
  void initState() {
    super.initState();
    _repository = widget.repository ?? StationRepository();
    _player = widget.player ?? RadioPlayer();
    _player.addListener(_onPlayerChanged);
    _loadStations();
  }

  Future<void> _loadStations() async {
    final stations = await _repository.fetchStations();
    if (!mounted || stations.isEmpty) return;
    setState(() {
      _stations = stations;
      _stationIndex = 0;
    });
  }

  void _onPlayerChanged() {
    if (mounted) setState(() {});
  }

  Future<void> _tune(int index) async {
    final nextIndex = (index + _stations.length) % _stations.length;
    if (nextIndex == _stationIndex) return;
    setState(() => _stationIndex = nextIndex);
    await _player.changeStation(_station);
  }

  @override
  void dispose() {
    _player.removeListener(_onPlayerChanged);
    if (widget.player == null) _player.dispose();
    if (widget.repository == null) _repository.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return ScreenScaffold(
      child: Column(
        children: [
          const Spacer(flex: 2),
          RollingFrequency(frequency: _station.frequency),
          const SizedBox(height: AppSpacing.lg),
          Text(
            _station.name,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            textAlign: TextAlign.center,
            style: AppTextStyles.station,
          ),
          const SizedBox(height: AppSpacing.sm),
          Text(
            _station.country,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: AppTextStyles.country,
          ),
          const SizedBox(height: AppSpacing.xl),
          Tuner(
            stationIndex: _stationIndex,
            stationCount: _stations.length,
            onChanged: _tune,
          ),
          const Spacer(flex: 3),
          Align(
            alignment: Alignment.centerLeft,
            child: Padding(
              padding: const EdgeInsets.fromLTRB(3, 0, 3, 16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Сейчас в эфире', style: TextStyle(color: Color(0xFF777777), fontSize: 14)),
                  const SizedBox(height: AppSpacing.xs),
                  Text(
                    _player.hasError ? 'Поток недоступен' : _station.name,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w600),
                  ),
                ],
              ),
            ),
          ),
          RadioControls(
            isPlaying: _player.isPlaying,
            isLoading: _player.isLoading,
            onPrevious: () => _tune(_stationIndex - 1),
            onToggle: () => _player.toggle(_station),
            onNext: () => _tune(_stationIndex + 1),
          ),
        ],
      ),
    );
  }
}

