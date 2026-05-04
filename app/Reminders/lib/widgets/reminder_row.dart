import 'package:flutter/material.dart';

import '../models/reminder.dart';
import '../theme/tokens.dart';
import '../theme/typography.dart';
import 'app_cell.dart';

class ReminderRow extends StatelessWidget {
  const ReminderRow({
    super.key,
    required this.reminder,
    required this.onToggle,
  });

  final Reminder reminder;
  final VoidCallback onToggle;

  @override
  Widget build(BuildContext context) {
    final isDone = reminder.completed;
    final titleColor = isDone
        ? AppColors.contentSecondary
        : AppColors.contentPrimary;

    return AppCell(
      leading: Semantics(
        checked: isDone,
        button: true,
        label: isDone ? 'Вернуть в активные' : 'Отметить выполненным',
        child: SizedBox.square(
          dimension: 44,
          child: IconButton(
            padding: EdgeInsets.zero,
            splashRadius: 24,
            onPressed: onToggle,
            icon: AnimatedContainer(
              duration: const Duration(milliseconds: 160),
              width: 32,
              height: 32,
              decoration: BoxDecoration(
                color: isDone
                    ? AppColors.accentPrimary
                    : AppColors.backgroundPrimary,
                shape: BoxShape.circle,
                border: Border.all(
                  color: isDone
                      ? AppColors.accentPrimary
                      : AppColors.contentBorder,
                  width: 2,
                ),
              ),
              child: isDone
                  ? Icon(
                      Icons.check_rounded,
                      size: 20,
                      color: AppColors.contentConstant,
                    )
                  : null,
            ),
          ),
        ),
      ),
      title: Text(
        reminder.title,
        maxLines: 2,
        overflow: TextOverflow.ellipsis,
        style: AppTypography.medium18(color: titleColor).copyWith(
          decoration: isDone ? TextDecoration.lineThrough : null,
          decorationThickness: 1.5,
        ),
      ),
      subtitle: Text(
        formatReminderMeta(reminder),
        maxLines: 1,
        overflow: TextOverflow.ellipsis,
        style: AppTypography.regular14(color: AppColors.contentSecondary),
      ),
    );
  }
}
