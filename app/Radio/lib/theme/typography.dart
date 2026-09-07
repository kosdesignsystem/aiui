import 'package:flutter/material.dart';

import 'tokens.dart';

class AppTextStyles {
  static const frequency = TextStyle(
    color: AppColors.textPrimary,
    fontSize: 96,
    height: .95,
    fontWeight: FontWeight.w500,
    letterSpacing: -5,
    fontFeatures: [FontFeature.tabularFigures()],
  );

  static const station = TextStyle(
    color: AppColors.textSecondary,
    fontSize: 24,
    height: 1.25,
  );

  static const body = TextStyle(
    color: AppColors.textPrimary,
    fontSize: 14,
  );

  static const country = TextStyle(
    color: AppColors.textMuted,
    fontSize: 16,
    fontWeight: FontWeight.w500,
  );
}

