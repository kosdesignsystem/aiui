import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

class AssetSvg extends StatelessWidget {
  const AssetSvg(
    this.asset, {
    Key? key,
    this.size = 20,
    this.width,
    this.height,
    this.color,
    this.semanticLabel,
  }) : super(key: key);

  final String asset;
  final double size;
  final double? width;
  final double? height;
  final Color? color;
  final String? semanticLabel;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: width ?? size,
      height: height ?? size,
      child: SvgPicture.asset(
        asset,
        fit: BoxFit.contain,
        color: color,
        semanticsLabel: semanticLabel,
      ),
    );
  }
}
