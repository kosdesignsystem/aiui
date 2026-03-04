import 'package:flutter/material.dart';

abstract final class AppTokens {
  static const double deviceWidth = 360;
  static const double deviceHeight = 800;

  static const double statusBarHeight = 40;
  static const double navBarHeight = 52;

  static const double viewRadius = 24;
  static const double cardRadius = 20;
  static const double buttonRadius = 18;

  static const Color backgroundPrimary = Color(0xFF050505);
  static const Color backgroundSecondary = Color(0xFF141414);
  static const Color contentPrimary = Color(0xFFFFFFFF);
  static const Color contentBorder = Color(0x29FFFFFF);

  static const Color screenBackground = Color(0xFFF3F4F6);
  static const Color searchBackground = Color(0xFFF8F8F9);
  static const Color searchBorder = Color(0xFFDFDFE2);

  static const Color rowTitle = Color(0xFF181C24);
  static const Color rowSubtitle = Color(0xFF4F82BC);
  static const Color rowDivider = Color(0xFFE6E8EB);
  static const Color batterySubtitle = Color(0xFF697180);

  static const Color switchOff = Color(0xFFAEB0B4);
  static const Color switchOn = Color(0xFF35B15D);
}
