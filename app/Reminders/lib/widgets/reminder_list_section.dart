import 'package:flutter/material.dart';

import '../models/reminder.dart';
import '../theme/tokens.dart';
import '../theme/typography.dart';
import 'reminder_row.dart';

class ReminderListSection extends StatelessWidget {
  const ReminderListSection({
    super.key,
    required this.section,
    required this.onToggle,
    this.showTopBorder = false,
  });

  final ReminderSection section;
  final ValueChanged<String> onToggle;
  final bool showTopBorder;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        border: showTopBorder
            ? Border(top: BorderSide(color: AppColors.contentBorder))
            : null,
      ),
      padding: const EdgeInsets.all(AppSpacing.md),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(12, 12, 12, 0),
            child: Text(
              section.title,
              style: AppTypography.regular14(color: AppColors.contentSecondary),
            ),
          ),
          const SizedBox(height: AppSpacing.md),
          for (final reminder in section.reminders) ...[
            ReminderRow(
              reminder: reminder,
              onToggle: () => onToggle(reminder.id),
            ),
            if (reminder != section.reminders.last)
              const SizedBox(height: AppSpacing.xs),
          ],
        ],
      ),
    );
  }
}
