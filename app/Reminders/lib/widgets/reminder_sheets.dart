import 'package:flutter/material.dart';

import '../models/reminder.dart';
import '../theme/tokens.dart';
import '../theme/typography.dart';
import 'achievement_badge.dart';
import 'chrome.dart';
import 'progress.dart';

class GoalSetupSheet extends StatefulWidget {
  const GoalSetupSheet({
    super.key,
    required this.initialGoal,
    required this.initialSelectedDays,
    required this.onSave,
    required this.onToggleDay,
  });

  final int initialGoal;
  final List<int> initialSelectedDays;
  final void Function(int goal, List<int> selectedDays) onSave;
  final ValueChanged<int> onToggleDay;

  @override
  State<GoalSetupSheet> createState() => _GoalSetupSheetState();
}

class _GoalSetupSheetState extends State<GoalSetupSheet> {
  late var _draftGoal = normalizeGoal(widget.initialGoal);
  late var _selectedDays = List<int>.of(widget.initialSelectedDays);

  void _toggleWeekday(int dayId) {
    setState(() {
      if (_selectedDays.contains(dayId)) {
        _selectedDays = _selectedDays.where((day) => day != dayId).toList();
        return;
      }

      _selectedDays = [..._selectedDays, dayId]..sort();
    });
    widget.onToggleDay(dayId);
  }

  @override
  Widget build(BuildContext context) {
    return _Sheet(
      bottomPadding: 12,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          DecoratedBox(
            decoration: BoxDecoration(
              color: RemindersTokens.backgroundModal,
              borderRadius: BorderRadius.circular(22),
              boxShadow: [
                BoxShadow(
                  color: RemindersTokens.contentBorder,
                  offset: const Offset(0, -1),
                ),
              ],
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(22),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Padding(
                    padding: const EdgeInsets.fromLTRB(20, 24, 20, 8),
                    child: Text(
                      'Продуктивность',
                      style: RemindersTypography.semiBold32(),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.fromLTRB(20, 0, 20, 22),
                    child: Column(
                      children: [
                        _SettingRow(
                          title: 'Количество задач в день',
                          value: '$_draftGoal',
                        ),
                        const SizedBox(height: 8),
                        Stack(
                          alignment: Alignment.center,
                          children: [
                            TaskProgressMeter(
                              value: _draftGoal,
                              max: dailyGoalDefault,
                              showCount: false,
                              variant: TaskProgressVariant.goal,
                            ),
                            Positioned.fill(
                              child: SliderTheme(
                                data: SliderTheme.of(context).copyWith(
                                  trackHeight: 42,
                                  activeTrackColor: Colors.transparent,
                                  inactiveTrackColor: Colors.transparent,
                                  thumbColor: Colors.transparent,
                                  overlayColor: Colors.transparent,
                                  thumbShape: SliderComponentShape.noThumb,
                                  overlayShape: SliderComponentShape.noOverlay,
                                ),
                                child: Slider(
                                  value: _draftGoal.toDouble(),
                                  min: 1,
                                  max: dailyGoalDefault.toDouble(),
                                  divisions: dailyGoalDefault - 1,
                                  onChanged: (value) {
                                    setState(() => _draftGoal = value.round());
                                  },
                                ),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 8),
                        Align(
                          alignment: Alignment.centerLeft,
                          child: Text(
                            'Не нужно героизма: поставьте реалистичную норму на день.',
                            style: RemindersTypography.regular14(
                              RemindersTokens.contentSecondary,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  Divider(height: 1, color: RemindersTokens.contentBorder),
                  Padding(
                    padding: const EdgeInsets.fromLTRB(20, 24, 20, 22),
                    child: Column(
                      children: [
                        _SettingRow(
                          title: 'План на неделю',
                          value: '${_selectedDays.length}',
                        ),
                        const SizedBox(height: 16),
                        WeekdayPlan(
                          selectedDays: _selectedDays,
                          interactive: true,
                          hideCount: true,
                          onToggleDay: _toggleWeekday,
                        ),
                        const SizedBox(height: 8),
                        Align(
                          alignment: Alignment.centerLeft,
                          child: Text(
                            'Мы будем показывать прогресс и вовремя отмечать закрытые дела.',
                            style: RemindersTypography.regular14(
                              RemindersTokens.contentSecondary,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
          AccentButton(
            label: 'Начать',
            onTap: () => widget.onSave(_draftGoal, _selectedDays),
            margin: const EdgeInsets.fromLTRB(12, 12, 12, 0),
          ),
        ],
      ),
    );
  }
}

class _SettingRow extends StatelessWidget {
  const _SettingRow({required this.title, required this.value});

  final String title;
  final String value;

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.baseline,
      textBaseline: TextBaseline.alphabetic,
      children: [
        Expanded(child: Text(title, style: RemindersTypography.semiBold16())),
        const SizedBox(width: 16),
        Text(
          value,
          style: RemindersTypography.regular16(
            RemindersTokens.contentSecondary,
          ),
        ),
      ],
    );
  }
}

class CongratulationsSheet extends StatelessWidget {
  const CongratulationsSheet({
    super.key,
    required this.completedCount,
    required this.planGoal,
    required this.onClose,
  });

  final int completedCount;
  final int planGoal;
  final VoidCallback onClose;

  @override
  Widget build(BuildContext context) {
    return _Sheet(
      bottomPadding: 18,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          DecoratedBox(
            decoration: BoxDecoration(
              color: RemindersTokens.backgroundModal,
              borderRadius: BorderRadius.circular(22),
            ),
            child: Padding(
              padding: const EdgeInsets.fromLTRB(24, 24, 24, 30),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  AchievementBadge(
                    completedCount: completedCount,
                    planGoal: planGoal,
                  ),
                  const SizedBox(height: 18),
                  Text(
                    'Сегодня вы правда продвинулись',
                    style: RemindersTypography.semiBold32(),
                  ),
                  const SizedBox(height: 16),
                  Text(
                    'Можно продолжать, а можно зафиксировать этот маленький, но честный выигрыш.',
                    style: RemindersTypography.regular18(
                      RemindersTokens.contentSecondary,
                    ),
                  ),
                ],
              ),
            ),
          ),
          AccentButton(
            label: 'Продолжить',
            onTap: onClose,
            margin: const EdgeInsets.fromLTRB(12, 12, 12, 0),
          ),
        ],
      ),
    );
  }
}

class CreateTaskSheet extends StatefulWidget {
  const CreateTaskSheet({
    super.key,
    required this.controller,
    required this.focusNode,
    required this.onClose,
    required this.onSubmit,
  });

  final TextEditingController controller;
  final FocusNode focusNode;
  final VoidCallback onClose;
  final VoidCallback onSubmit;

  @override
  State<CreateTaskSheet> createState() => _CreateTaskSheetState();
}

class _CreateTaskSheetState extends State<CreateTaskSheet> {
  @override
  void initState() {
    super.initState();
    widget.controller.addListener(_handleTextChanged);
  }

  @override
  void dispose() {
    widget.controller.removeListener(_handleTextChanged);
    super.dispose();
  }

  void _handleTextChanged() {
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final trimmedTitle = widget.controller.text.trim();
    final list = getReminderList(defaultCreateTaskListId);

    return _Sheet(
      bottomPadding: 12,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          DecoratedBox(
            decoration: BoxDecoration(
              color: RemindersTokens.backgroundModal,
              borderRadius: BorderRadius.circular(22),
              boxShadow: [
                BoxShadow(
                  color: RemindersTokens.contentBorder,
                  offset: const Offset(0, -1),
                ),
              ],
            ),
            child: Padding(
              padding: const EdgeInsets.fromLTRB(20, 18, 20, 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: Text(
                          'Новая задача',
                          style: RemindersTypography.semiBold18(),
                        ),
                      ),
                      RoundIconButton(
                        icon: Icons.close,
                        label: 'Закрыть создание задачи',
                        size: 32,
                        onTap: widget.onClose,
                      ),
                    ],
                  ),
                  TextField(
                    controller: widget.controller,
                    focusNode: widget.focusNode,
                    onSubmitted: (_) {
                      if (trimmedTitle.isNotEmpty) {
                        widget.onSubmit();
                      }
                    },
                    style: RemindersTypography.medium22(),
                    decoration: InputDecoration(
                      hintText: 'Название задачи',
                      hintStyle: RemindersTypography.medium22(
                        RemindersTokens.contentSecondary,
                      ),
                      border: InputBorder.none,
                      contentPadding: const EdgeInsets.fromLTRB(0, 14, 0, 16),
                    ),
                  ),
                  Row(
                    children: [
                      _DisabledChip(
                        icon: Icons.calendar_today_outlined,
                        label: 'Сегодня',
                      ),
                      const SizedBox(width: 8),
                      Flexible(
                        child: _DisabledChip(
                          icon: _listIcon(defaultCreateTaskListId),
                          label: list.label,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
          AccentButton(
            label: 'Создать',
            enabled: trimmedTitle.isNotEmpty,
            onTap: widget.onSubmit,
            margin: const EdgeInsets.fromLTRB(12, 12, 12, 0),
          ),
        ],
      ),
    );
  }
}

class _DisabledChip extends StatelessWidget {
  const _DisabledChip({required this.icon, required this.label});

  final IconData icon;
  final String label;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 36,
      constraints: const BoxConstraints(minWidth: 0),
      padding: const EdgeInsets.symmetric(horizontal: 10),
      decoration: BoxDecoration(
        color: RemindersTokens.contentBackground,
        border: Border.all(color: RemindersTokens.contentBorder),
        borderRadius: BorderRadius.circular(10),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 18, color: RemindersTokens.contentDisabled),
          const SizedBox(width: 6),
          Flexible(
            child: Text(
              label,
              overflow: TextOverflow.ellipsis,
              style: RemindersTypography.medium14(
                RemindersTokens.contentDisabled,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _Sheet extends StatelessWidget {
  const _Sheet({required this.child, required this.bottomPadding});

  final Widget child;
  final double bottomPadding;

  @override
  Widget build(BuildContext context) {
    const radius = BorderRadius.vertical(top: Radius.circular(22));

    return SizedBox(
      width: RemindersTokens.sheetWidth,
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          DecoratedBox(
            decoration: BoxDecoration(
              color: RemindersTokens.backgroundSecondary,
              borderRadius: radius,
            ),
            child: Padding(
              padding: EdgeInsets.only(bottom: bottomPadding),
              child: Material(color: Colors.transparent, child: child),
            ),
          ),
          Positioned(
            right: 0,
            bottom: -2,
            left: 0,
            height: 3,
            child: DecoratedBox(
              decoration: BoxDecoration(
                color: RemindersTokens.backgroundSecondary,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

IconData _listIcon(ReminderListId listId) {
  return switch (listId) {
    ReminderListId.work => Icons.work_outline,
    ReminderListId.home => Icons.home_outlined,
    ReminderListId.personal => Icons.bookmark_border,
  };
}
