import 'package:flutter/material.dart';

import '../models/reminder.dart';
import '../theme/tokens.dart';
import '../theme/typography.dart';

class ReminderTabs extends StatelessWidget {
  const ReminderTabs({
    super.key,
    required this.value,
    required this.onChanged,
    required this.onSearch,
  });

  final ReminderFilter value;
  final ValueChanged<ReminderFilter> onChanged;
  final VoidCallback onSearch;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 0, 20, 12),
      child: Row(
        children: [
          _IconActionButton(
            icon: Icons.search_rounded,
            label: 'Поиск',
            onPressed: onSearch,
          ),
          const SizedBox(width: AppSpacing.sm),
          Expanded(
            child: Container(
              height: 60,
              padding: const EdgeInsets.all(4),
              decoration: BoxDecoration(
                color: AppColors.contentBackground,
                borderRadius: BorderRadius.circular(AppRadii.md),
              ),
              child: Row(
                children: [
                  _TabButton(
                    label: 'Сегодня',
                    selected: value == ReminderFilter.today,
                    onPressed: () => onChanged(ReminderFilter.today),
                  ),
                  _TabButton(
                    label: 'Все',
                    selected: value == ReminderFilter.all,
                    onPressed: () => onChanged(ReminderFilter.all),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _TabButton extends StatelessWidget {
  const _TabButton({
    required this.label,
    required this.selected,
    required this.onPressed,
  });

  final String label;
  final bool selected;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: SizedBox.expand(
        child: TextButton(
          onPressed: onPressed,
          style: TextButton.styleFrom(
            foregroundColor: AppColors.contentPrimary,
            backgroundColor: selected
                ? AppColors.backgroundPrimary
                : Colors.transparent,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12),
            ),
            padding: EdgeInsets.zero,
          ),
          child: Text(
            label,
            style: AppTypography.medium16(
              color: selected
                  ? AppColors.contentPrimary
                  : AppColors.contentSecondary,
            ),
          ),
        ),
      ),
    );
  }
}

class _IconActionButton extends StatelessWidget {
  const _IconActionButton({
    required this.icon,
    required this.label,
    required this.onPressed,
  });

  final IconData icon;
  final String label;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return Tooltip(
      message: label,
      child: SizedBox.square(
        dimension: 60,
        child: IconButton(
          onPressed: onPressed,
          style: IconButton.styleFrom(
            backgroundColor: AppColors.contentBackground,
            foregroundColor: AppColors.contentPrimary,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(AppRadii.md),
            ),
          ),
          icon: Icon(icon, size: 24),
        ),
      ),
    );
  }
}
