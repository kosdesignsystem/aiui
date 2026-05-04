import 'package:flutter/material.dart';

class AppColors {
  static final contentConstant = _hsl(0, 0, 100);
  static final contentPrimary = _hsl(210, 11, 15);
  static final contentSubPrimary = _hsl(210, 11, 15, .72);
  static final contentSecondary = _hsl(210, 11, 15, .52);
  static final contentDisabled = _hsl(210, 11, 15, .28);
  static final contentBorder = _hsl(210, 11, 15, .12);
  static final contentBackground = _hsl(210, 11, 15, .04);

  static final accentPrimary = _hsl(213, 88, 56);
  static final accentSubPrimary = _hsl(213, 88, 56, .72);
  static final accentBorder = _hsl(213, 88, 56, .20);
  static final accentBackground = _hsl(213, 88, 56, .04);

  static final backgroundPrimary = _hsl(0, 0, 100);
  static final backgroundSecondary = _hsl(220, 23, 97);
  static final systemWarningPrimary = _hsl(42, 89, 55);

  static final shadow = Colors.black.withValues(alpha: .08);

  static Color _hsl(double h, double s, double l, [double a = 1]) {
    return HSLColor.fromAHSL(a, h, s / 100, l / 100).toColor();
  }
}

class AppSpacing {
  static const double xs = 4;
  static const double sm = 8;
  static const double md = 10;
  static const double lg = 12;
  static const double xl = 16;
  static const double xxl = 20;
  static const double pageX = 20;
}

class AppRadii {
  static const double sm = 8;
  static const double md = 16;
  static const double round = 999;
}
