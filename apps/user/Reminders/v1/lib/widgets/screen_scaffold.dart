import 'package:flutter/material.dart';
import '../theme/tokens.dart';

class ScreenScaffold extends StatelessWidget {
  final Widget child;

  const ScreenScaffold({super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(AppSpacing.lg),
          child: child,
        ),
      ),
    );
  }
}
