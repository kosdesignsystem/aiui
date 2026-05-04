import 'package:flutter/material.dart';

import 'screens/reminders_screen.dart';
import 'theme/tokens.dart';
import 'theme/typography.dart';

void main() {
  runApp(const RemindersApp());
}

class RemindersApp extends StatelessWidget {
  const RemindersApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Напоминания',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: AppColors.accentPrimary,
          primary: AppColors.accentPrimary,
          surface: AppColors.backgroundPrimary,
        ),
        scaffoldBackgroundColor: AppColors.backgroundPrimary,
        fontFamily: 'KasperskySansText',
        textTheme: TextTheme(bodyMedium: AppTypography.regular16()),
        useMaterial3: true,
      ),
      home: const RemindersScreen(),
    );
  }
}
