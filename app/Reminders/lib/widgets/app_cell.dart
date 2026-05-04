import 'package:flutter/material.dart';

import '../theme/tokens.dart';

class AppCell extends StatelessWidget {
  const AppCell({
    super.key,
    required this.title,
    this.subtitle,
    this.leading,
    this.trailing,
    this.background,
  });

  final Widget title;
  final Widget? subtitle;
  final Widget? leading;
  final Widget? trailing;
  final Color? background;

  @override
  Widget build(BuildContext context) {
    final trailingChildren = trailing == null
        ? null
        : [const SizedBox(width: AppSpacing.lg), trailing!];
    final subtitleChildren = subtitle == null ? null : [subtitle!];

    return Container(
      width: double.infinity,
      constraints: const BoxConstraints(minHeight: 56),
      padding: EdgeInsets.fromLTRB(leading == null ? 12 : 6, 6, 6, 6),
      decoration: BoxDecoration(
        color: background ?? Colors.transparent,
        borderRadius: BorderRadius.circular(AppRadii.sm),
      ),
      child: Row(
        children: [
          if (leading != null) ...[
            leading!,
            const SizedBox(width: AppSpacing.lg),
          ],
          Expanded(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [title, ...?subtitleChildren],
            ),
          ),
          ...?trailingChildren,
        ],
      ),
    );
  }
}
