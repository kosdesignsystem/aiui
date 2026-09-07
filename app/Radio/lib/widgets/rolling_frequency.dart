import 'package:flutter/material.dart';

import '../theme/typography.dart';

class RollingFrequency extends StatelessWidget {
  const RollingFrequency({super.key, required this.frequency});

  final double frequency;

  @override
  Widget build(BuildContext context) {
    final value = frequency.toStringAsFixed(1).replaceFirst(RegExp(r'\.0$'), '');
    return Semantics(
      label: '$value FM',
      liveRegion: true,
      child: AnimatedSwitcher(
        duration: const Duration(milliseconds: 620),
        transitionBuilder: (child, animation) => SlideTransition(
          position: Tween<Offset>(
            begin: const Offset(0, -.35),
            end: Offset.zero,
          ).animate(CurvedAnimation(parent: animation, curve: Curves.easeOutCubic)),
          child: FadeTransition(opacity: animation, child: child),
        ),
        child: FittedBox(
          key: ValueKey(value),
          fit: BoxFit.scaleDown,
          child: Text(value, style: AppTextStyles.frequency),
        ),
      ),
    );
  }
}

