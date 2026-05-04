import 'package:flutter/material.dart';

import '../models/reminder.dart';
import '../theme/tokens.dart';
import '../theme/typography.dart';
import 'app_cell.dart';

class EmptyRemindersState extends StatelessWidget {
  const EmptyRemindersState({super.key, required this.filter});

  final ReminderFilter filter;

  @override
  Widget build(BuildContext context) {
    final title = filter == ReminderFilter.today
        ? 'На сегодня пусто'
        : 'Список пуст';
    final description = filter == ReminderFilter.today
        ? 'Новые задачи на сегодня появятся здесь.'
        : 'Добавьте первое напоминание.';

    return Padding(
      padding: const EdgeInsets.all(AppSpacing.md),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(12, 12, 12, 0),
            child: Text(
              'Напоминания',
              style: AppTypography.regular14(color: AppColors.contentSecondary),
            ),
          ),
          const SizedBox(height: AppSpacing.md),
          AppCell(
            leading: CircleAvatar(
              radius: 20,
              backgroundColor: AppColors.contentBackground,
              child: Icon(
                Icons.checklist_rounded,
                size: 22,
                color: AppColors.contentSecondary,
              ),
            ),
            title: Text(
              title,
              style: AppTypography.medium18(color: AppColors.contentPrimary),
            ),
            subtitle: Text(
              description,
              style: AppTypography.regular14(color: AppColors.contentSecondary),
            ),
          ),
        ],
      ),
    );
  }
}

class SearchEmptyState extends StatelessWidget {
  const SearchEmptyState({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Text(
          'Ничего не найдено',
          textAlign: TextAlign.center,
          style: AppTypography.regular20(color: AppColors.contentSecondary),
        ),
      ),
    );
  }
}
