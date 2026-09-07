class Station {
  const Station({
    required this.id,
    required this.name,
    required this.streamUrl,
    required this.frequency,
    this.country = '',
    this.tags = '',
    this.favicon = '',
  });

  final String id;
  final String name;
  final String streamUrl;
  final double frequency;
  final String country;
  final String tags;
  final String favicon;

  factory Station.fromJson(Map<String, dynamic> json, double frequency) {
    return Station(
      id: json['stationuuid'] as String? ?? '',
      name: (json['name'] as String? ?? '').trim(),
      streamUrl: json['url_resolved'] as String? ?? '',
      frequency: frequency,
      country: json['country'] as String? ?? '',
      tags: json['tags'] as String? ?? '',
      favicon: json['favicon'] as String? ?? '',
    );
  }
}

