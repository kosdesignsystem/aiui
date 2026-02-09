import 'package:flutter/material.dart';
import 'screens/home.dart';
import 'theme/tokens.dart';
import 'theme/typography.dart';

void main() {
  runApp(const AppRoot());
}

class AppRoot extends StatelessWidget {
  const AppRoot({super.key});

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
      title: 'Reminders v1',
      theme: baseTheme.copyWith(
        scaffoldBackgroundColor: AppColors.background,
        textTheme: baseTheme.textTheme.copyWith(
          headlineSmall: AppTextStyles.heading,
          bodyMedium: AppTextStyles.body,
        ),
      ),
      home: const HomeScreen(),
    );
  }
}
