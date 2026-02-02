import 'package:flutter/material.dart';
import '../theme/typography.dart';
import '../widgets/screen_scaffold.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ScreenScaffold(
      title: 'Quick Settings · v1',
      child: Text(
        'Экран-заглушка для Quick Settings.',
        style: AppTextStyles.body,
      ),
    );
  }
}
