import 'package:flutter/material.dart';

import '../theme/tokens.dart';
import '../theme/typography.dart';
import 'app_svg_icon.dart';

class SettingsRow extends StatelessWidget {
  const SettingsRow({
    super.key,
    required this.iconName,
    required this.title,
    this.subtitle,
    this.trailing,
    this.minHeight = 76,
    this.onTap,
  });

  final String iconName;
  final String title;
  final String? subtitle;
  final Widget? trailing;
  final double minHeight;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: ConstrainedBox(
        constraints: BoxConstraints(minHeight: minHeight),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
          child: Row(
            children: [
              AppSvgIcon(name: iconName, size: 28),
              const SizedBox(width: 14),
              Expanded(
                child: subtitle == null
                    ? Text(title, style: AppTypography.rowTitle)
                    : Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text(title, style: AppTypography.rowTitle),
                          const SizedBox(height: 2),
                          Text(
                            subtitle!,
                            style: AppTypography.rowSubtitle.copyWith(
                              color: AppTokens.rowSubtitle,
                            ),
                          ),
                        ],
                      ),
              ),
              if (trailing != null) ...[const SizedBox(width: 12), trailing!],
            ],
          ),
        ),
      ),
    );
  }
}
