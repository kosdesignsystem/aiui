class Station {
  const Station({
    required this.id,
    required this.name,
    required this.url,
    required this.frequency,
    this.country = '',
  });

  final String id;
  final String name;
  final String url;
  final double frequency;
  final String country;
}
