import 'package:flutter/material.dart';

import 'screens/home.dart';
import 'theme/tokens.dart';
import 'theme/typography.dart';

void main() {
  runApp(const RadioApp());
}

class RadioApp extends StatelessWidget {
  const RadioApp({super.key});

  @override
  Widget build(BuildContext context) {
    final baseTheme = ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      colorScheme: ColorScheme.fromSeed(
        seedColor: AppColors.accent,
        brightness: Brightness.dark,
      ),
    );

    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Radio',
      theme: baseTheme.copyWith(
        scaffoldBackgroundColor: AppColors.background,
        textTheme: baseTheme.textTheme.copyWith(
          displayLarge: AppTextStyles.frequency,
          titleLarge: AppTextStyles.station,
          bodyMedium: AppTextStyles.body,
        ),
      ),
      home: const HomeScreen(),
    );
  }
}

