import 'package:flutter/material.dart';

import '../models/reminder.dart';
import '../theme/tokens.dart';
import '../theme/typography.dart';

class WeekdayOption {
  const WeekdayOption({required this.id, required this.label});

  final int id;
  final String label;
}

const weekDayOptions = [
  WeekdayOption(id: 0, label: 'ПН'),
  WeekdayOption(id: 1, label: 'ВТ'),
  WeekdayOption(id: 2, label: 'СР'),
  WeekdayOption(id: 3, label: 'ЧТ'),
  WeekdayOption(id: 4, label: 'ПТ'),
  WeekdayOption(id: 5, label: 'СБ'),
  WeekdayOption(id: 6, label: 'ВС'),
];

class TaskProgressMeter extends StatelessWidget {
  const TaskProgressMeter({
    Key? key,
    required this.value,
    required this.max,
    this.showCount = true,
    this.variant = TaskProgressVariant.header,
  }) : super(key: key);

  final int value;
  final int max;
  final bool showCount;
  final TaskProgressVariant variant;

  @override
  Widget build(BuildContext context) {
    final normalizedMax = max < 1 ? 1 : max;
    final normalizedValue = value < 0 ? 0 : value;
    final completedSegmentCount = clampProgress(normalizedValue, normalizedMax);
    final segments = List<int>.generate(normalizedMax, (index) => index);
    final isGoal = variant == TaskProgressVariant.goal;

    final track = Row(
      mainAxisAlignment:
          isGoal ? MainAxisAlignment.spaceBetween : MainAxisAlignment.start,
      children: [
        for (final segment in segments)
          Padding(
            padding: isGoal || segment == segments.last
                ? EdgeInsets.zero
                : const EdgeInsets.only(right: 6),
            child: _ProgressSegment(
              complete: segment < completedSegmentCount,
              active: isGoal && segment == completedSegmentCount - 1,
              goal: isGoal,
            ),
          ),
      ],
    );

    return Semantics(
      image: true,
      label: 'Прогресс дневной нормы: $normalizedValue из $normalizedMax',
      child: ExcludeSemantics(
        child: Row(
          children: [
            Expanded(
              child: SizedBox(height: isGoal ? 42 : 20, child: track),
            ),
            if (showCount) ...[
              const SizedBox(width: 10),
              Text.rich(
                TextSpan(
                  children: [
                    TextSpan(text: '$normalizedValue'),
                    TextSpan(
                      text: '/$normalizedMax',
                      style: TextStyle(color: RemindersTokens.contentDisabled),
                    ),
                  ],
                ),
                style: RemindersTypography.regular18(
                  RemindersTokens.contentPrimary,
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}

enum TaskProgressVariant { header, goal }

class _ProgressSegment extends StatelessWidget {
  const _ProgressSegment({
    required this.complete,
    required this.active,
    required this.goal,
  });

  final bool complete;
  final bool active;
  final bool goal;

  @override
  Widget build(BuildContext context) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 160),
      width: active ? 12 : 8,
      height: goal ? (active ? 42 : 34) : 20,
      decoration: BoxDecoration(
        color: complete
            ? RemindersTokens.orange
            : RemindersTokens.hsl(218, 0.18, 0.91),
        borderRadius: BorderRadius.circular(999),
      ),
    );
  }
}

class WeekdayPlan extends StatelessWidget {
  const WeekdayPlan({
    Key? key,
    required this.selectedDays,
    this.disabledDays = const [],
    this.count,
    this.total = 7,
    this.interactive = false,
    this.compact = false,
    this.hideCount = false,
    this.onToggleDay,
  }) : super(key: key);

  final List<int> selectedDays;
  final List<int> disabledDays;
  final int? count;
  final int total;
  final bool interactive;
  final bool compact;
  final bool hideCount;
  final ValueChanged<int>? onToggleDay;

  @override
  Widget build(BuildContext context) {
    final selectedCount = count ?? selectedDays.length;

    return Row(
      children: [
        Expanded(
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              for (final day in weekDayOptions)
                _WeekdayPill(
                  label: day.label,
                  selected: selectedDays.contains(day.id),
                  disabled: disabledDays.contains(day.id),
                  interactive: interactive,
                  compact: compact,
                  onTap: interactive ? () => onToggleDay?.call(day.id) : null,
                ),
            ],
          ),
        ),
        if (!hideCount) ...[
          const SizedBox(width: 16),
          Semantics(
            label: '$selectedCount из $total',
            child: ExcludeSemantics(
              child: Text.rich(
                TextSpan(
                  children: [
                    TextSpan(text: '$selectedCount'),
                    TextSpan(
                      text: '/$total',
                      style: TextStyle(color: RemindersTokens.contentDisabled),
                    ),
                  ],
                ),
                style: RemindersTypography.regular18(
                  RemindersTokens.contentPrimary,
                ),
              ),
            ),
          ),
        ],
      ],
    );
  }
}

class _WeekdayPill extends StatelessWidget {
  const _WeekdayPill({
    required this.label,
    required this.selected,
    required this.disabled,
    required this.interactive,
    required this.compact,
    this.onTap,
  });

  final String label;
  final bool selected;
  final bool disabled;
  final bool interactive;
  final bool compact;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final size = compact ? const Size(26, 24) : const Size(38, 38);
    final child = AnimatedContainer(
      duration: const Duration(milliseconds: 160),
      width: size.width,
      height: size.height,
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: selected
            ? RemindersTokens.orange
            : RemindersTokens.contentBackground,
        borderRadius: BorderRadius.circular(compact ? 6 : 12),
      ),
      child: Text(
        label,
        style: (compact
                ? RemindersTypography.semiBold12()
                : RemindersTypography.semiBold12())
            .copyWith(
          color: selected
              ? RemindersTokens.contentConstant
              : disabled
                  ? RemindersTokens.contentDisabled
                  : RemindersTokens.contentPrimary,
        ),
      ),
    );

    if (!interactive) {
      return child;
    }

    return Semantics(
      button: true,
      selected: selected,
      label: label,
      child: GestureDetector(
        behavior: HitTestBehavior.opaque,
        onTap: onTap,
        child: child,
      ),
    );
  }
}
