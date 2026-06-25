import 'package:flutter/material.dart';

import 'tokens.dart';

class RemindersTypography {
  RemindersTypography._();

  static const fontFamily = 'Kaspersky Sans Text';

  static TextStyle token({
    required double size,
    required double height,
    required FontWeight weight,
    Color? color,
  }) {
    return TextStyle(
      fontFamily: fontFamily,
      fontSize: size,
      height: height / size,
      fontWeight: weight,
      color: color ?? RemindersTokens.contentPrimary,
      letterSpacing: 0,
    );
  }

  static TextStyle semiBold40([Color? color]) {
    return token(size: 40, height: 40, weight: FontWeight.w600, color: color);
  }

  static TextStyle semiBold32([Color? color]) {
    return token(size: 32, height: 40, weight: FontWeight.w600, color: color);
  }

  static TextStyle semiBold18([Color? color]) {
    return token(size: 18, height: 24, weight: FontWeight.w600, color: color);
  }

  static TextStyle semiBold16([Color? color]) {
    return token(size: 16, height: 20, weight: FontWeight.w600, color: color);
  }

  static TextStyle semiBold14([Color? color]) {
    return token(size: 14, height: 20, weight: FontWeight.w600, color: color);
  }

  static TextStyle semiBold12([Color? color]) {
    return token(size: 12, height: 16, weight: FontWeight.w600, color: color);
  }

  static TextStyle medium22([Color? color]) {
    return token(size: 22, height: 28, weight: FontWeight.w500, color: color);
  }

  static TextStyle medium18([Color? color]) {
    return token(size: 18, height: 24, weight: FontWeight.w500, color: color);
  }

  static TextStyle medium16([Color? color]) {
    return token(size: 16, height: 20, weight: FontWeight.w500, color: color);
  }

  static TextStyle medium14([Color? color]) {
    return token(size: 14, height: 18, weight: FontWeight.w500, color: color);
  }

  static TextStyle regular20([Color? color]) {
    return token(size: 20, height: 26, weight: FontWeight.w400, color: color);
  }

  static TextStyle regular18([Color? color]) {
    return token(size: 18, height: 24, weight: FontWeight.w400, color: color);
  }

  static TextStyle regular16([Color? color]) {
    return token(size: 16, height: 20, weight: FontWeight.w400, color: color);
  }

  static TextStyle regular14([Color? color]) {
    return token(size: 14, height: 20, weight: FontWeight.w400, color: color);
  }

  static TextStyle regular12([Color? color]) {
    return token(size: 12, height: 16, weight: FontWeight.w400, color: color);
  }
}

class RemindersTheme {
  RemindersTheme._();

  static ThemeData light() {
    return ThemeData(
      brightness: Brightness.light,
      scaffoldBackgroundColor: RemindersTokens.backgroundSecondary,
      fontFamily: RemindersTypography.fontFamily,
      colorScheme: ColorScheme.light(
        primary: RemindersTokens.accentPrimary,
        secondary: RemindersTokens.accentPrimary,
        surface: RemindersTokens.backgroundPrimary,
        error: RemindersTokens.systemErrorPrimary,
        onPrimary: RemindersTokens.contentConstant,
        onSecondary: RemindersTokens.contentConstant,
        onSurface: RemindersTokens.contentPrimary,
        onError: RemindersTokens.contentConstant,
      ),
      textSelectionTheme: TextSelectionThemeData(
        cursorColor: RemindersTokens.accentPrimary,
        selectionColor: RemindersTokens.accentSelection,
        selectionHandleColor: RemindersTokens.accentPrimary,
      ),
      splashFactory: NoSplash.splashFactory,
      highlightColor: Colors.transparent,
      hoverColor: Colors.transparent,
      pageTransitionsTheme: const PageTransitionsTheme(
        builders: {
          TargetPlatform.android: _NoPageTransitionsBuilder(),
          TargetPlatform.iOS: _NoPageTransitionsBuilder(),
          TargetPlatform.linux: _NoPageTransitionsBuilder(),
          TargetPlatform.macOS: _NoPageTransitionsBuilder(),
          TargetPlatform.windows: _NoPageTransitionsBuilder(),
          TargetPlatform.fuchsia: _NoPageTransitionsBuilder(),
        },
      ),
    );
  }
}

class _NoPageTransitionsBuilder extends PageTransitionsBuilder {
  const _NoPageTransitionsBuilder();

  @override
  Widget buildTransitions<T>(
    PageRoute<T> route,
    BuildContext context,
    Animation<double> animation,
    Animation<double> secondaryAnimation,
    Widget child,
  ) {
    return child;
  }
}
