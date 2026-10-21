import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

/// Original SVG bytes remain untouched. Only the source's monochrome #212529
/// paint is bound to the current UI token (scripts/build-icons.mjs + Icon.tsx).
/// Other paints, gradient stops, masks and opacity retain their original values.
class OriginalIcon extends StatelessWidget {
  const OriginalIcon(this.name,
      {Key? key, this.size = 22, this.color = Colors.white, this.height})
      : super(key: key);
  final String name;
  final double size;
  final double? height;
  final Color color;
  @override
  Widget build(BuildContext context) => SvgPicture.asset(
        'assets/svg/$name.svg',
        width: size,
        height: height ?? size,
        theme: SvgTheme(currentColor: color),
        colorMapper: _TokenPaint(color),
        excludeFromSemantics: true,
      );
}

class _TokenPaint extends ColorMapper {
  const _TokenPaint(this.token);
  final Color token;
  @override
  Color substitute(
          String? id, String elementName, String attributeName, Color color) =>
      color == const Color(0xFF212529) &&
              (attributeName == 'fill' || attributeName == 'stroke')
          ? token
          : color;
  @override
  bool operator ==(Object other) =>
      other is _TokenPaint && other.token == token;
  @override
  int get hashCode => token.hashCode;
}
