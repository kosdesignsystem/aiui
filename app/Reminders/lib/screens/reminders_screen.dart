import 'package:flutter/material.dart';

import '../models/reminder.dart';
import '../theme/tokens.dart';
import '../theme/typography.dart';
import '../widgets/chrome.dart';
import '../widgets/progress.dart';
import '../widgets/reminder_row.dart';

class RemindersRoutes {
  RemindersRoutes._();

  static const today = '/today';
  static const all = '/all';
  static const search = '/search';
  static const create = '/create';
  static const goal = '/goal';
  static const success = '/success';
}

enum RemindersMode { normal, search }

enum RemindersModalPreview { goalSetup, success, createTask }

class RemindersScreen extends StatefulWidget {
  const RemindersScreen({
    super.key,
    required this.title,
    required this.filter,
    this.mode = RemindersMode.normal,
    this.modalPreview,
    this.previewGoal,
    this.autoShowGoalSetup = false,
  });

  final String title;
  final ReminderFilter filter;
  final RemindersMode mode;
  final RemindersModalPreview? modalPreview;
  final int? previewGoal;
  final bool autoShowGoalSetup;

  @override
  State<RemindersScreen> createState() => _RemindersScreenState();
}

class _RemindersScreenState extends State<RemindersScreen> {
  final TextEditingController _searchController = TextEditingController();
  final TextEditingController _createController = TextEditingController();
  final FocusNode _searchFocusNode = FocusNode();
  final FocusNode _createFocusNode = FocusNode();

  var _reminders = List<Reminder>.of(reminderSeeds);
  var _selectedDays = List<int>.of(defaultSelectedGoalDays);
  var _createdReminderCursor = 0;
  var _searchQuery = '';
  late int _planGoal = widget.previewGoal ?? dailyGoalDefault;
  RemindersModalPreview? _activeModal;
  String? _fromSearchRoute;

  bool get _isSearchMode => widget.mode == RemindersMode.search;

  @override
  void initState() {
    super.initState();
    _activeModal = widget.modalPreview;

    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (!mounted) {
        return;
      }

      if (_isSearchMode) {
        _searchFocusNode.requestFocus();
      }

      if (widget.modalPreview == null && widget.autoShowGoalSetup) {
        setState(() => _activeModal = RemindersModalPreview.goalSetup);
      }
    });
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    final arguments = ModalRoute.of(context)?.settings.arguments;
    if (arguments is String && _fromSearchRoute == null) {
      _fromSearchRoute = arguments;
    }
  }

  @override
  void didUpdateWidget(covariant RemindersScreen oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.modalPreview != widget.modalPreview) {
      _activeModal = widget.modalPreview;
    }
    if (oldWidget.previewGoal != widget.previewGoal &&
        widget.previewGoal != null) {
      _planGoal = widget.previewGoal!;
    }
  }

  @override
  void dispose() {
    _searchController.dispose();
    _createController.dispose();
    _searchFocusNode.dispose();
    _createFocusNode.dispose();
    super.dispose();
  }

  void _closeModal() {
    if (widget.modalPreview == null) {
      setState(() => _activeModal = null);
    }
  }

  void _saveGoal(int goal, List<int> selectedDays) {
    setState(() {
      _planGoal = normalizeGoal(goal);
      _selectedDays = List<int>.of(selectedDays)..sort();
      if (widget.modalPreview == null) {
        _activeModal = null;
      }
    });
  }

  void _openSearch() {
    _searchController.clear();
    Navigator.of(
      context,
    ).pushNamed(RemindersRoutes.search, arguments: _filterRoute(widget.filter));
  }

  void _closeSearch() {
    _searchController.clear();
    Navigator.of(
      context,
    ).pushReplacementNamed(_fromSearchRoute ?? RemindersRoutes.today);
  }

  void _openCreateTask() {
    _createController.clear();
    setState(() => _activeModal = RemindersModalPreview.createTask);
    WidgetsBinding.instance.addPostFrameCallback(
      (_) => _createFocusNode.requestFocus(),
    );
  }

  void _closeCreateTask() {
    _createController.clear();
    _closeModal();
  }

  void _createTask() {
    final title = _createController.text.trim();

    if (title.isEmpty) {
      return;
    }

    setState(() {
      _createdReminderCursor += 1;
      _reminders = [
        createReminderFromTitle(title, _createdReminderCursor),
        ..._reminders,
      ];
      if (widget.modalPreview == null) {
        _activeModal = null;
      }
    });
    _createController.clear();

    if (widget.modalPreview == null &&
        ModalRoute.of(context)?.settings.name != RemindersRoutes.today) {
      Navigator.of(context).pushReplacementNamed(RemindersRoutes.today);
    }
  }

  void _toggleReminder(String reminderId) {
    setState(() {
      final previousCompletedCount = getCompletedCount(_reminders);
      var completedTask = false;
      final nextReminders = _reminders.map((reminder) {
        if (reminder.id != reminderId) {
          return reminder;
        }

        if (reminder.completed) {
          return reopenReminder(reminder);
        }

        completedTask = true;
        return completeReminder(reminder);
      }).toList();
      final nextCompletedCount = getCompletedCount(nextReminders);

      _reminders = nextReminders;

      if (completedTask &&
          widget.modalPreview == null &&
          previousCompletedCount < _planGoal &&
          nextCompletedCount >= _planGoal) {
        _activeModal = RemindersModalPreview.success;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final filteredReminders = getRemindersByFilter(_reminders, widget.filter);
    final groupedReminders = groupReminders(filteredReminders);
    final searchResults = searchReminders(_reminders, _searchQuery);
    final groupedSearchResults = groupReminders(searchResults);
    final completedCount = getCompletedCount(_reminders);

    return FlowPage(
      header: _isSearchMode
          ? null
          : RemindersHeader(
              title: widget.title,
              meta: PlanProgress(
                filter: widget.filter,
                completedCount: completedCount,
                planGoal: _planGoal,
                selectedDays: _selectedDays,
              ),
            ),
      topActions: _isSearchMode
          ? SearchField(
              controller: _searchController,
              focusNode: _searchFocusNode,
              onClose: _closeSearch,
              onChanged: (value) => setState(() => _searchQuery = value),
            )
          : SegmentedTabs(
              value: widget.filter == ReminderFilter.today ? 'today' : 'all',
              onSearch: _openSearch,
              onChanged: (tabId) => Navigator.of(context).pushReplacementNamed(
                tabId == 'today' ? RemindersRoutes.today : RemindersRoutes.all,
              ),
            ),
      bottomActions: _isSearchMode
          ? null
          : BottomActionBar(
              child: AccentButton(
                label: 'Создать задачу',
                onTap: _openCreateTask,
              ),
            ),
      overlay: _activeModal == null
          ? null
          : _ModalLayer(
              modal: _activeModal!,
              planGoal: _planGoal,
              completedCount:
                  widget.modalPreview == RemindersModalPreview.success
                  ? _planGoal
                  : completedCount,
              selectedDays: _selectedDays,
              createController: _createController,
              createFocusNode: _createFocusNode,
              onSaveGoal: _saveGoal,
              onClose: _closeModal,
              onCloseCreateTask: _closeCreateTask,
              onCreateTask: _createTask,
              onToggleDay: _toggleSelectedDay,
            ),
      child: _isSearchMode
          ? _SearchContent(
              query: _searchQuery,
              searchResults: searchResults,
              groupedSearchResults: groupedSearchResults,
              onToggleReminder: _toggleReminder,
            )
          : _ReminderListContent(
              filter: widget.filter,
              filteredReminders: filteredReminders,
              groupedReminders: groupedReminders,
              onToggleReminder: _toggleReminder,
            ),
    );
  }

  void _toggleSelectedDay(int dayId) {
    setState(() {
      if (_selectedDays.contains(dayId)) {
        _selectedDays = _selectedDays.where((day) => day != dayId).toList();
        return;
      }

      _selectedDays = [..._selectedDays, dayId]..sort();
    });
  }
}

String _filterRoute(ReminderFilter filter) {
  return filter == ReminderFilter.all
      ? RemindersRoutes.all
      : RemindersRoutes.today;
}

class PlanProgress extends StatelessWidget {
  const PlanProgress({
    super.key,
    required this.filter,
    required this.completedCount,
    required this.planGoal,
    required this.selectedDays,
  });

  final ReminderFilter filter;
  final int completedCount;
  final int planGoal;
  final List<int> selectedDays;

  @override
  Widget build(BuildContext context) {
    if (filter == ReminderFilter.all) {
      return WeekdayPlan(
        selectedDays: selectedDays,
        disabledDays: const [5, 6],
        compact: true,
      );
    }

    return TaskProgressMeter(value: completedCount, max: planGoal);
  }
}

class _ReminderListContent extends StatelessWidget {
  const _ReminderListContent({
    required this.filter,
    required this.filteredReminders,
    required this.groupedReminders,
    required this.onToggleReminder,
  });

  final ReminderFilter filter;
  final List<Reminder> filteredReminders;
  final List<ReminderSection> groupedReminders;
  final ValueChanged<String> onToggleReminder;

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: EdgeInsets.zero,
      children: [
        if (filteredReminders.isEmpty) EmptyRemindersState(filter: filter),
        for (final section in groupedReminders)
          ReminderListSection(
            title: section.title,
            collapsible:
                filter == ReminderFilter.all &&
                section.id == ReminderSectionId.completed,
            defaultCollapsed:
                filter == ReminderFilter.all &&
                section.id == ReminderSectionId.completed,
            children: [
              for (final reminder in section.reminders)
                ReminderRow(
                  reminder: reminder,
                  onToggle: () => onToggleReminder(reminder.id),
                ),
            ],
          ),
      ],
    );
  }
}

class _SearchContent extends StatelessWidget {
  const _SearchContent({
    required this.query,
    required this.searchResults,
    required this.groupedSearchResults,
    required this.onToggleReminder,
  });

  final String query;
  final List<Reminder> searchResults;
  final List<ReminderSection> groupedSearchResults;
  final ValueChanged<String> onToggleReminder;

  @override
  Widget build(BuildContext context) {
    if (query.trim().isEmpty) {
      return const SizedBox.expand();
    }

    if (searchResults.isEmpty) {
      return const SearchEmptyState();
    }

    return ListView(
      padding: EdgeInsets.zero,
      children: [
        for (final section in groupedSearchResults)
          ReminderListSection(
            title: section.title,
            children: [
              for (final reminder in section.reminders)
                ReminderRow(
                  reminder: reminder,
                  onToggle: () => onToggleReminder(reminder.id),
                ),
            ],
          ),
      ],
    );
  }
}

class _ModalLayer extends StatelessWidget {
  const _ModalLayer({
    required this.modal,
    required this.planGoal,
    required this.completedCount,
    required this.selectedDays,
    required this.createController,
    required this.createFocusNode,
    required this.onSaveGoal,
    required this.onClose,
    required this.onCloseCreateTask,
    required this.onCreateTask,
    required this.onToggleDay,
  });

  final RemindersModalPreview modal;
  final int planGoal;
  final int completedCount;
  final List<int> selectedDays;
  final TextEditingController createController;
  final FocusNode createFocusNode;
  final void Function(int goal, List<int> selectedDays) onSaveGoal;
  final VoidCallback onClose;
  final VoidCallback onCloseCreateTask;
  final VoidCallback onCreateTask;
  final ValueChanged<int> onToggleDay;

  @override
  Widget build(BuildContext context) {
    final isCreateTask = modal == RemindersModalPreview.createTask;

    return DecoratedBox(
      decoration: BoxDecoration(
        color: isCreateTask ? null : RemindersTokens.modalOverlay,
        gradient: isCreateTask
            ? LinearGradient(
                begin: Alignment.bottomCenter,
                end: Alignment.topCenter,
                colors: [
                  RemindersTokens.backgroundSecondary,
                  RemindersTokens.backgroundSecondary,
                  RemindersTokens.modalOverlay,
                ],
                stops: const [0, 0.26, 0.26],
              )
            : null,
      ),
      child: Align(
        alignment: Alignment.bottomCenter,
        child: switch (modal) {
          RemindersModalPreview.goalSetup => GoalSetupSheet(
            initialGoal: planGoal,
            initialSelectedDays: selectedDays,
            onSave: onSaveGoal,
            onToggleDay: onToggleDay,
          ),
          RemindersModalPreview.success => CongratulationsSheet(
            completedCount: completedCount,
            planGoal: planGoal,
            onClose: onClose,
          ),
          RemindersModalPreview.createTask => CreateTaskSheet(
            controller: createController,
            focusNode: createFocusNode,
            onClose: onCloseCreateTask,
            onSubmit: onCreateTask,
          ),
        },
      ),
    );
  }
}

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
                  _AchievementBadge(
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

class _AchievementBadge extends StatelessWidget {
  const _AchievementBadge({
    required this.completedCount,
    required this.planGoal,
  });

  final int completedCount;
  final int planGoal;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 118,
      height: 92,
      child: Stack(
        clipBehavior: Clip.none,
        children: [
          for (var index = 0; index < _confetti.length; index++)
            Positioned(
              left: _confetti[index].dx,
              top: _confetti[index].dy,
              child: Transform.rotate(
                angle: index * 0.35,
                child: Container(
                  width: index.isEven ? 7 : 5,
                  height: index % 3 == 0 ? 12 : 7,
                  decoration: BoxDecoration(
                    color: _confettiColors[index % _confettiColors.length],
                    borderRadius: BorderRadius.circular(index.isEven ? 2 : 999),
                  ),
                ),
              ),
            ),
          Positioned(
            left: 0,
            top: 10,
            child: Container(
              width: 64,
              height: 64,
              alignment: Alignment.center,
              decoration: BoxDecoration(
                color: RemindersTokens.contentBackground,
                borderRadius: BorderRadius.circular(24),
              ),
              child: const Text(
                '🎉',
                style: TextStyle(fontSize: 40, height: 1),
              ),
            ),
          ),
          Positioned(
            left: 54,
            top: 48,
            child: Container(
              height: 28,
              constraints: const BoxConstraints(minWidth: 55),
              padding: const EdgeInsets.symmetric(horizontal: 8),
              alignment: Alignment.center,
              decoration: BoxDecoration(
                color: RemindersTokens.orange,
                borderRadius: BorderRadius.circular(9),
              ),
              child: Text(
                '$completedCount из $planGoal',
                style: RemindersTypography.semiBold14(
                  RemindersTokens.contentConstant,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

const _confetti = [
  Offset(4, 0),
  Offset(34, -8),
  Offset(76, 0),
  Offset(98, 18),
  Offset(18, 74),
  Offset(86, 70),
  Offset(116, 50),
  Offset(48, 82),
  Offset(110, -6),
  Offset(-10, 34),
];

final _confettiColors = [
  RemindersTokens.red,
  const Color(0xffffd166),
  const Color(0xff34c759),
  const Color(0xff45a3ff),
  const Color(0xffff8a00),
  const Color(0xff9b5cff),
  const Color(0xff00c2a8),
];

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
    return ConstrainedBox(
      constraints: const BoxConstraints(maxWidth: 360),
      child: Padding(
        padding: EdgeInsets.only(bottom: bottomPadding),
        child: Material(color: Colors.transparent, child: child),
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
