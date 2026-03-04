import 'package:flutter/material.dart';

abstract final class AppTypography {
  static const String fontFamily = 'KasperskySansText';

  static const TextStyle headerTitle = TextStyle(
    fontFamily: fontFamily,
    fontSize: 40,
    height: 1,
    fontWeight: FontWeight.w600,
    color: Colors.white,
  );

  static const TextStyle searchText = TextStyle(
    fontFamily: fontFamily,
    fontSize: 18,
    height: 24 / 18,
    fontWeight: FontWeight.w400,
    color: Color(0xFFC1C4CA),
  );

  static const TextStyle rowTitle = TextStyle(
    fontFamily: fontFamily,
    fontSize: 18,
    height: 24 / 18,
    fontWeight: FontWeight.w500,
    letterSpacing: -0.18,
    color: Color(0xFF181C24),
  );

  static const TextStyle rowSubtitle = TextStyle(
    fontFamily: fontFamily,
    fontSize: 14,
    height: 20 / 14,
    fontWeight: FontWeight.w400,
    letterSpacing: -0.14,
    color: Color(0xFF4F82BC),
  );

  static const TextStyle backButton = TextStyle(
    fontFamily: fontFamily,
    fontSize: 16,
    height: 20 / 16,
    fontWeight: FontWeight.w500,
    color: Color(0xFF1F2530),
  );

  static const TextStyle batteryPercent = TextStyle(
    fontFamily: fontFamily,
    fontSize: 32,
    height: 38 / 32,
    fontWeight: FontWeight.w700,
    letterSpacing: -0.64,
    color: Color(0xFF151A24),
  );

  static const TextStyle batteryStatus = TextStyle(
    fontFamily: fontFamily,
    fontSize: 15,
    height: 20 / 15,
    fontWeight: FontWeight.w400,
    color: Color(0xFF5B6372),
  );

  static const TextStyle batteryRowLabel = TextStyle(
    fontFamily: fontFamily,
    fontSize: 16,
    height: 20 / 16,
    fontWeight: FontWeight.w400,
    color: Color(0xFF1F2530),
  );

  static const TextStyle batteryRowValue = TextStyle(
    fontFamily: fontFamily,
    fontSize: 15,
    height: 20 / 15,
    fontWeight: FontWeight.w600,
    color: Color(0xFF212833),
  );

  static const TextStyle batteryActionTitle = TextStyle(
    fontFamily: fontFamily,
    fontSize: 16,
    height: 20 / 16,
    fontWeight: FontWeight.w500,
    color: Color(0xFF191F2A),
  );

  static const TextStyle batteryActionSubtitle = TextStyle(
    fontFamily: fontFamily,
    fontSize: 13,
    height: 17 / 13,
    fontWeight: FontWeight.w400,
    color: Color(0xFF697180),
  );
}
