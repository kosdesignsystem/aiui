import 'package:flutter/material.dart';

class RemindersTokens {
  RemindersTokens._();

  static Color hsl(
    double hue,
    double saturation,
    double lightness, [
    double alpha = 1,
  ]) {
    return HSLColor.fromAHSL(alpha, hue, saturation, lightness).toColor();
  }

  static final contentConstant = hsl(0, 0, 1);
  static final contentPrimary = hsl(210, 0.11, 0.15);
  static final contentSubPrimary = contentPrimary.withValues(alpha: 0.72);
  static final contentSecondary = contentPrimary.withValues(alpha: 0.52);
  static final contentDisabled = contentPrimary.withValues(alpha: 0.28);
  static final contentBorder = contentPrimary.withValues(alpha: 0.12);
  static final contentBackground = contentPrimary.withValues(alpha: 0.04);

  static final accentPrimary = hsl(213, 0.88, 0.56);
  static final accentSubPrimary = accentPrimary.withValues(alpha: 0.72);
  static final accentSecondary = accentPrimary.withValues(alpha: 0.52);
  static final accentDisabled = accentPrimary.withValues(alpha: 0.28);
  static final accentBorder = accentPrimary.withValues(alpha: 0.20);
  static final accentBackground = accentPrimary.withValues(alpha: 0.04);

  static final systemSuccessPrimary = hsl(163, 0.70, 0.47);
  static final systemSuccessBackground = systemSuccessPrimary.withValues(
    alpha: 0.08,
  );
  static final systemErrorPrimary = hsl(353, 0.88, 0.56);
  static final systemErrorBackground = systemErrorPrimary.withValues(
    alpha: 0.08,
  );
  static final systemWarningPrimary = hsl(42, 0.89, 0.55);
  static final systemWarningBackground = systemWarningPrimary.withValues(
    alpha: 0.08,
  );

  static final backgroundPrimary = hsl(0, 0, 1);
  static final backgroundSecondary = hsl(220, 0.23, 0.97);
  static final backgroundModal = hsl(0, 0, 1);
  static final backgroundLevel1 = hsl(215, 0.32, 0.88);
  static final backgroundLevel2 = hsl(210, 0.31, 0.80);

  static final overlayDark = hsl(210, 0.11, 0.15, 0.72);
  static final overlayLight = hsl(210, 0.11, 0.15, 0.52);
  static final modalOverlay = hsl(204, 0.20, 0.18, 0.94);

  static const red = Color(0xfff23d58);
  static final green = systemSuccessPrimary;
  static const purple = Color(0xff8a8aff);
  static const orange = Color(0xffff5500);
  static final blue = accentPrimary;

  static const appWidth = 360.0;
  static const appHeight = 800.0;
  static const statusBarHeight = 40.0;
  static const navBarHeight = 52.0;
  static const createTaskKeyboardHeight = 316.0;
  static const createTaskKeyboardGradientStop =
      createTaskKeyboardHeight / (appHeight - navBarHeight);
  static const maxAppWidth = appWidth;
  static const sheetWidth = appWidth;
}
