import 'dart:convert';

import 'package:http/http.dart' as http;

import '../models/station.dart';

class StationRepository {
  StationRepository({http.Client? client}) : _client = client ?? http.Client();

  static const _apiBases = [
    'https://all.api.radio-browser.info/json',
    'https://de1.api.radio-browser.info/json',
    'https://nl1.api.radio-browser.info/json',
  ];

  final http.Client _client;

  Future<List<Station>> fetchStations() async {
    const path = '/stations/topclick/30?hidebroken=true&order=clickcount&reverse=true';
    for (final apiBase in _apiBases) {
      try {
        final response = await _client
            .get(Uri.parse('$apiBase$path'))
            .timeout(const Duration(seconds: 8));
        if (response.statusCode == 200) {
          final rows = jsonDecode(response.body) as List<dynamic>;
          final stations = _mapStations(rows.cast<Map<String, dynamic>>());
          if (stations.isNotEmpty) return stations;
        }
      } on Object {
        // Try the next Radio Browser mirror before falling back to SomaFM.
      }
    }
    return fallbackStations;
  }

  List<Station> _mapStations(List<Map<String, dynamic>> rows) {
    final unique = <String, Map<String, dynamic>>{};
    for (final row in rows) {
      final id = row['stationuuid'] as String? ?? '';
      final name = (row['name'] as String? ?? '').trim();
      final url = row['url_resolved'] as String? ?? '';
      if (id.isNotEmpty && name.isNotEmpty && url.isNotEmpty) unique[id] = row;
    }
    final selected = unique.values.take(30).toList();
    return [
      for (var index = 0; index < selected.length; index++)
        Station.fromJson(
          selected[index],
          _frequencyFor(index, selected.length),
        ),
    ];
  }

  static double _frequencyFor(int index, int length) {
    if (length <= 1) return 87.5;
    return double.parse((87.5 + (20.5 * index) / (length - 1)).toStringAsFixed(1));
  }

  void dispose() => _client.close();
}

const fallbackStations = [
  Station(id: 'groovesalad', name: 'Groove Salad', streamUrl: 'https://ice2.somafm.com/groovesalad-128-mp3', frequency: 87.5, country: 'United States', tags: 'ambient'),
  Station(id: 'secretagent', name: 'Secret Agent', streamUrl: 'https://ice2.somafm.com/secretagent-128-mp3', frequency: 90.4, country: 'United States', tags: 'downtempo'),
  Station(id: 'dronezone', name: 'Drone Zone', streamUrl: 'https://ice2.somafm.com/dronezone-128-mp3', frequency: 93.4, country: 'United States', tags: 'ambient'),
  Station(id: 'indiepop', name: 'Indie Pop Rocks!', streamUrl: 'https://ice2.somafm.com/indiepop-128-mp3', frequency: 96.3, country: 'United States', tags: 'indie'),
  Station(id: 'lush', name: 'Lush', streamUrl: 'https://ice2.somafm.com/lush-128-mp3', frequency: 99.2, country: 'United States', tags: 'electronic'),
  Station(id: 'fluid', name: 'Fluid', streamUrl: 'https://ice2.somafm.com/fluid-128-mp3', frequency: 102.1, country: 'United States', tags: 'instrumental hip-hop'),
  Station(id: 'bootliquor', name: 'Boot Liquor', streamUrl: 'https://ice2.somafm.com/bootliquor-128-mp3', frequency: 105.1, country: 'United States', tags: 'americana'),
  Station(id: 'sonicuniverse', name: 'Sonic Universe', streamUrl: 'https://ice2.somafm.com/sonicuniverse-128-mp3', frequency: 108, country: 'United States', tags: 'jazz'),
];

