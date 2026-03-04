import 'package:flutter/material.dart';

import 'screens/settings_screen.dart';
import 'theme/tokens.dart';
import 'theme/typography.dart';

void main() {
  runApp(const SettingsV1MainApp());
}

class SettingsV1MainApp extends StatelessWidget {
  const SettingsV1MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Settings v1 main',
      theme: ThemeData(
        scaffoldBackgroundColor: AppTokens.backgroundPrimary,
        fontFamily: AppTypography.fontFamily,
      ),
      home: const Scaffold(body: SettingsScreen()),
    );
  }
}
