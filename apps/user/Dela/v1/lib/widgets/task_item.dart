import 'package:flutter/material.dart';
import '../theme/tokens.dart';
import '../theme/typography.dart';

class Task {
  Task({
    required this.id,
    required this.title,
    this.note,
    this.completed = false,
  });

  final String id;
  final String title;
  final String? note;
  final bool completed;

  Task copyWith({String? id, String? title, String? note, bool? completed}) {
    return Task(
      id: id ?? this.id,
      title: title ?? this.title,
      note: note ?? this.note,
      completed: completed ?? this.completed,
    );
  }
}

typedef TaskToggle = void Function(String id);

class TaskItem extends StatelessWidget {
  const TaskItem({super.key, required this.task, required this.onToggle});

  final Task task;
  final TaskToggle onToggle;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(AppSpacing.md),
      decoration: BoxDecoration(
        color: AppColors.surfaceAlt,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        children: [
          GestureDetector(
            onTap: () => onToggle(task.id),
            child: Container(
              width: 28,
              height: 28,
              decoration: BoxDecoration(
                color: task.completed
                    ? AppColors.buttonPrimary
                    : AppColors.surface,
                borderRadius: BorderRadius.circular(8),
                border: Border.all(color: AppColors.border),
              ),
              child: task.completed
                  ? const Icon(Icons.check, size: 16, color: Colors.white)
                  : null,
            ),
          ),
          const SizedBox(width: AppSpacing.md),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(task.title, style: AppTextStyles.subtitle),
                const SizedBox(height: AppSpacing.xs),
                Text(task.note ?? 'Без заметки', style: AppTextStyles.muted),
              ],
            ),
          ),
          const SizedBox(width: AppSpacing.md),
          OutlinedButton(
            onPressed: () => onToggle(task.id),
            style: OutlinedButton.styleFrom(
              foregroundColor: AppColors.buttonPrimary,
              side: const BorderSide(color: AppColors.buttonPrimary),
              shape: const StadiumBorder(),
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              textStyle: AppTextStyles.muted,
            ),
            child: Text(task.completed ? 'Вернуть' : 'Сделано'),
          ),
        ],
      ),
    );
  }
}
