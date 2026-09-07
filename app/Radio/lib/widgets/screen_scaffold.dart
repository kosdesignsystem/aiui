import 'package:flutter/material.dart';

import '../theme/tokens.dart';

class ScreenScaffold extends StatelessWidget {
  const ScreenScaffold({super.key, required this.child});

  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.fromLTRB(18, 28, 18, 24),
          child: child,
        ),
      ),
    );
  }
}

