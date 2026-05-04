import 'package:flutter/material.dart';

import 'tokens.dart';

class AppTypography {
  static const _family = 'KasperskySansText';

  static TextStyle semiBold40({Color? color}) => _style(600, 40, 40, color);
  static TextStyle semiBold14({Color? color}) => _style(600, 14, 20, color);
  static TextStyle medium18({Color? color}) => _style(500, 18, 24, color);
  static TextStyle medium16({Color? color}) => _style(500, 16, 20, color);
  static TextStyle regular20({Color? color}) => _style(400, 20, 26, color);
  static TextStyle regular16({Color? color}) => _style(400, 16, 20, color);
  static TextStyle regular14({Color? color}) => _style(400, 14, 20, color);

  static TextStyle _style(
    int weight,
    double size,
    double lineHeight,
    Color? color,
  ) {
    return TextStyle(
      color: color ?? AppColors.contentPrimary,
      fontFamily: _family,
      fontSize: size,
      fontWeight: FontWeight.values[(weight ~/ 100) - 1],
      height: lineHeight / size,
      letterSpacing: 0,
    );
  }
}
