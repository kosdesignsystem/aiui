import 'package:flutter/material.dart';

import '../models/reminder.dart';
import '../theme/tokens.dart';
import '../theme/typography.dart';

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

    return Semantics(
      button: true,
      checked: isDone,
      label: isDone ? 'Вернуть в активные' : 'Отметить выполненным',
      child: GestureDetector(
        behavior: HitTestBehavior.opaque,
        onTap: onToggle,
        child: Container(
          constraints: const BoxConstraints(minHeight: 56),
          padding: const EdgeInsets.fromLTRB(6, 6, 6, 6),
          decoration: BoxDecoration(
            color: Colors.transparent,
            borderRadius: BorderRadius.circular(8),
          ),
          child: Row(
            children: [
              SizedBox(
                width: 44,
                height: 44,
                child: Center(
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 160),
                    width: 32,
                    height: 32,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: isDone
                          ? RemindersTokens.accentPrimary
                          : RemindersTokens.backgroundPrimary,
                      border: Border.all(
                        color: isDone
                            ? RemindersTokens.accentPrimary
                            : RemindersTokens.contentBorder,
                        width: 2,
                      ),
                    ),
                    child: isDone
                        ? Icon(
                            Icons.check,
                            size: 20,
                            color: RemindersTokens.contentConstant,
                          )
                        : null,
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      reminder.title,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style:
                          RemindersTypography.medium18(
                            isDone
                                ? RemindersTokens.contentSecondary
                                : RemindersTokens.contentPrimary,
                          ).copyWith(
                            decoration: isDone
                                ? TextDecoration.lineThrough
                                : TextDecoration.none,
                            decorationThickness: 1.5,
                          ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      formatReminderMeta(reminder),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: RemindersTypography.regular14(
                        RemindersTokens.contentSecondary,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

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
      padding: const EdgeInsets.all(10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(12, 12, 12, 10),
            child: Text(
              'Напоминания',
              style: RemindersTypography.medium18(
                RemindersTokens.contentSecondary,
              ),
            ),
          ),
          Container(
            constraints: const BoxConstraints(minHeight: 56),
            padding: const EdgeInsets.all(6),
            child: Row(
              children: [
                Container(
                  width: 44,
                  height: 44,
                  alignment: Alignment.center,
                  decoration: BoxDecoration(
                    color: RemindersTokens.contentBackground,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Icon(
                    Icons.fact_check_outlined,
                    size: 22,
                    color: RemindersTokens.contentSecondary,
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(title, style: RemindersTypography.medium18()),
                      const SizedBox(height: 2),
                      Text(
                        description,
                        style: RemindersTypography.regular14(
                          RemindersTokens.contentSecondary,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
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
          style: RemindersTypography.regular20(
            RemindersTokens.contentSecondary,
          ),
        ),
      ),
    );
  }
}
