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
        seedColor: AppColors.buttonPrimary,
        brightness: Brightness.dark,
      ),
    );

    return MaterialApp(
      title: 'Dela v1',
      theme: baseTheme.copyWith(
        scaffoldBackgroundColor: AppColors.background,
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: AppColors.buttonPrimary,
            foregroundColor: Colors.white,
          ),
        ),
        outlinedButtonTheme: OutlinedButtonThemeData(
          style: OutlinedButton.styleFrom(
            foregroundColor: AppColors.buttonPrimary,
            side: const BorderSide(color: AppColors.buttonPrimary),
          ),
        ),
        textTheme: baseTheme.textTheme.copyWith(
          headlineSmall: AppTextStyles.heading,
          bodyMedium: AppTextStyles.body,
        ),
      ),
      home: const HomeScreen(),
    );
  }
}
