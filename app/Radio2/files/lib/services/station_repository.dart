import 'dart:convert';
import 'dart:io';

import '../models/station.dart';

class StationRepository {
  static const _bases = <String>[
    'https://all.api.radio-browser.info/json',
    'https://de1.api.radio-browser.info/json',
    'https://nl1.api.radio-browser.info/json',
  ];

  static const fallback = <Station>[
    Station(
      id: 'groovesalad',
      name: 'Groove Salad',
      url: 'https://ice2.somafm.com/groovesalad-128-mp3',
      frequency: 87.5,
      country: 'United States',
    ),
    Station(
      id: 'secretagent',
      name: 'Secret Agent',
      url: 'https://ice2.somafm.com/secretagent-128-mp3',
      frequency: 90.4,
      country: 'United States',
    ),
    Station(
      id: 'dronezone',
      name: 'Drone Zone',
      url: 'https://ice2.somafm.com/dronezone-128-mp3',
      frequency: 93.4,
      country: 'United States',
    ),
    Station(
      id: 'indiepop',
      name: 'Indie Pop Rocks!',
      url: 'https://ice2.somafm.com/indiepop-128-mp3',
      frequency: 96.3,
      country: 'United States',
    ),
    Station(
      id: 'lush',
      name: 'Lush',
      url: 'https://ice2.somafm.com/lush-128-mp3',
      frequency: 99.2,
      country: 'United States',
    ),
    Station(
      id: 'fluid',
      name: 'Fluid',
      url: 'https://ice2.somafm.com/fluid-128-mp3',
      frequency: 102.1,
      country: 'United States',
    ),
    Station(
      id: 'bootliquor',
      name: 'Boot Liquor',
      url: 'https://ice2.somafm.com/bootliquor-128-mp3',
      frequency: 105.1,
      country: 'United States',
    ),
    Station(
      id: 'sonicuniverse',
      name: 'Sonic Universe',
      url: 'https://ice2.somafm.com/sonicuniverse-128-mp3',
      frequency: 108.0,
      country: 'United States',
    ),
  ];

  final HttpClient _client = HttpClient();

  Future<List<Station>> load() async {
    const path =
        '/stations/topclick/30?hidebroken=true&order=clickcount&reverse=true';
    for (final base in _bases) {
      try {
        final request = await _client.getUrl(Uri.parse('$base$path'));
        final response = await request.close().timeout(
              const Duration(seconds: 8),
            );
        if (response.statusCode != HttpStatus.ok) {
          continue;
        }
        final json = jsonDecode(await response.transform(utf8.decoder).join());
        final stations = _map(json as List<dynamic>);
        if (stations.isNotEmpty) {
          return stations;
        }
      } catch (_) {
        // The next mirror is tried before falling back to the built-in catalog.
      }
    }
    return fallback;
  }

  Future<void> recordPlay(Station station) async {
    if (!station.id.contains('-')) {
      return;
    }
    try {
      final request = await _client.postUrl(
        Uri.parse('${_bases.first}/url/${station.id}'),
      );
      await (await request.close()).drain<void>();
    } catch (_) {
      // Listening must not fail when click tracking is unavailable.
    }
  }

  List<Station> _map(List<dynamic> rows) {
    final unique = <String, Map<String, dynamic>>{};
    for (final value in rows) {
      if (value is! Map) {
        continue;
      }
      final row = Map<String, dynamic>.from(value);
      final id = row['stationuuid'] as String? ?? '';
      final name = (row['name'] as String? ?? '').trim();
      final url = row['url_resolved'] as String? ?? '';
      if (id.isNotEmpty &&
          name.isNotEmpty &&
          url.isNotEmpty &&
          !unique.containsKey(id)) {
        unique[id] = row;
      }
    }

    final selected = unique.values.take(30).toList();
    return List<Station>.generate(selected.length, (index) {
      final row = selected[index];
      return Station(
        id: row['stationuuid'] as String,
        name: (row['name'] as String).trim(),
        url: row['url_resolved'] as String,
        frequency: double.parse(
          (87.5 +
                  20.5 *
                      index /
                      (selected.length > 1 ? selected.length - 1 : 1))
              .toStringAsFixed(1),
        ),
        country: row['country'] as String? ?? '',
      );
    });
  }

  void dispose() {
    _client.close(force: true);
  }
}
