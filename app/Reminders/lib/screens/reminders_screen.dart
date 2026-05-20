import 'dart:math' as math;
import 'dart:ui';

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

class _RemindersSession {
  _RemindersSession._();

  static var reminders = List<Reminder>.of(reminderSeeds);
  static var selectedDays = List<int>.of(defaultSelectedGoalDays);
  static var planGoal = dailyGoalDefault;
  static var createdReminderCursor = 0;
  static var hasShownGoalSetup = false;

  static void markGoalSetupShown() {
    hasShownGoalSetup = true;
  }
}

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

  var _reminders = List<Reminder>.of(_RemindersSession.reminders);
  var _selectedDays = List<int>.of(_RemindersSession.selectedDays);
  var _searchQuery = '';
  late int _planGoal = widget.previewGoal ?? _RemindersSession.planGoal;
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

      if (widget.modalPreview == null &&
          widget.autoShowGoalSetup &&
          !_RemindersSession.hasShownGoalSetup) {
        _RemindersSession.markGoalSetupShown();
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
    final nextGoal = normalizeGoal(goal);
    final nextSelectedDays = List<int>.of(selectedDays)..sort();

    setState(() {
      _planGoal = nextGoal;
      _selectedDays = nextSelectedDays;
      if (widget.modalPreview == null) {
        _activeModal = null;
      }
    });

    if (widget.modalPreview == null) {
      _RemindersSession.planGoal = nextGoal;
      _RemindersSession.selectedDays = nextSelectedDays;
    }
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
      _RemindersSession.createdReminderCursor += 1;
      _reminders = [
        createReminderFromTitle(title, _RemindersSession.createdReminderCursor),
        ..._reminders,
      ];
      _RemindersSession.reminders = List<Reminder>.of(_reminders);
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
      _RemindersSession.reminders = List<Reminder>.of(nextReminders);

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
        if (widget.modalPreview == null) {
          _RemindersSession.selectedDays = List<int>.of(_selectedDays);
        }
        return;
      }

      _selectedDays = [..._selectedDays, dayId]..sort();
      if (widget.modalPreview == null) {
        _RemindersSession.selectedDays = List<int>.of(_selectedDays);
      }
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

    return BackdropFilter(
      filter: ImageFilter.blur(sigmaX: 5, sigmaY: 5),
      child: DecoratedBox(
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
                  stops: const [
                    0,
                    RemindersTokens.createTaskKeyboardGradientStop,
                    RemindersTokens.createTaskKeyboardGradientStop,
                  ],
                )
              : null,
        ),
        child: Padding(
          padding: EdgeInsets.only(
            bottom: isCreateTask ? RemindersTokens.createTaskKeyboardHeight : 0,
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
        ),
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

class _AchievementBadge extends StatefulWidget {
  const _AchievementBadge({
    required this.completedCount,
    required this.planGoal,
  });

  final int completedCount;
  final int planGoal;

  @override
  State<_AchievementBadge> createState() => _AchievementBadgeState();
}

class _AchievementBadgeState extends State<_AchievementBadge>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 3600),
    )..forward();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, _) {
        return SizedBox(
          width: 118,
          height: 92,
          child: Stack(
            clipBehavior: Clip.none,
            children: [
              for (final piece in _celebrationConfetti)
                _AnimatedConfettiPiece(
                  piece: piece,
                  elapsedMs: _controller.value * 3600,
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
                  child: _CelebrationEmoji(elapsedMs: _controller.value * 3600),
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
                    '${widget.completedCount} из ${widget.planGoal}',
                    style: RemindersTypography.semiBold14(
                      RemindersTokens.contentConstant,
                    ),
                  ),
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}

class _CelebrationEmoji extends StatelessWidget {
  const _CelebrationEmoji({required this.elapsedMs});

  final double elapsedMs;

  @override
  Widget build(BuildContext context) {
    final progress = (elapsedMs / 1500).clamp(0.0, 1.0);
    final frame = _popperFrame(progress);

    return Transform.translate(
      offset: frame.offset,
      child: Transform.rotate(
        angle: frame.rotation,
        child: Transform.scale(
          scale: frame.scale,
          child: const Text('🎉', style: TextStyle(fontSize: 40, height: 1)),
        ),
      ),
    );
  }
}

class _AnimatedConfettiPiece extends StatelessWidget {
  const _AnimatedConfettiPiece({required this.piece, required this.elapsedMs});

  final _ConfettiPiece piece;
  final double elapsedMs;

  @override
  Widget build(BuildContext context) {
    const origin = Offset(32, 42);
    final startMs = 210 + piece.delayMs;
    final localT = ((elapsedMs - startMs) / (3600 - startMs)).clamp(0.0, 1.0);
    final width = piece.shape == _ConfettiShape.strip ? 4.0 : 7.0;
    final height = switch (piece.shape) {
      _ConfettiShape.strip => 12.0,
      _ConfettiShape.dot => 6.0,
      _ConfettiShape.square => 7.0,
    };
    final transform = _confettiTransform(piece, localT);

    return Positioned(
      left: origin.dx,
      top: origin.dy,
      child: Opacity(
        opacity: transform.opacity,
        child: Transform.translate(
          offset: transform.offset - Offset(width / 2, height / 2),
          child: Transform.rotate(
            angle: transform.rotation,
            child: Transform.scale(
              scale: transform.scale,
              child: Container(
                width: width,
                height: height,
                decoration: BoxDecoration(
                  color: piece.color,
                  borderRadius: BorderRadius.circular(
                    piece.shape == _ConfettiShape.dot ? 999 : 2,
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _PopperFrame {
  const _PopperFrame({
    required this.offset,
    required this.rotation,
    required this.scale,
  });

  final Offset offset;
  final double rotation;
  final double scale;
}

class _ConfettiTransform {
  const _ConfettiTransform({
    required this.offset,
    required this.rotation,
    required this.scale,
    required this.opacity,
  });

  final Offset offset;
  final double rotation;
  final double scale;
  final double opacity;
}

class _ConfettiPiece {
  const _ConfettiPiece({
    required this.x,
    required this.y,
    required this.endX,
    required this.endY,
    required this.rotateDegrees,
    required this.delayMs,
    required this.color,
    required this.shape,
  });

  final double x;
  final double y;
  final double endX;
  final double endY;
  final double rotateDegrees;
  final double delayMs;
  final Color color;
  final _ConfettiShape shape;
}

enum _ConfettiShape { dot, square, strip }

_PopperFrame _popperFrame(double t) {
  return switch (t) {
    < 0.15 => _interpolatePopper(
      t / 0.15,
      Offset.zero,
      const Offset(-5, 7),
      0,
      -12,
      1,
      0.9,
    ),
    < 0.22 => _interpolatePopper(
      (t - 0.15) / 0.07,
      const Offset(-5, 7),
      const Offset(-7, 9),
      -12,
      -15,
      0.9,
      0.88,
    ),
    < 0.31 => _interpolatePopper(
      (t - 0.22) / 0.09,
      const Offset(-7, 9),
      const Offset(9, -9),
      -15,
      12,
      0.88,
      1.14,
    ),
    < 0.46 => _interpolatePopper(
      (t - 0.31) / 0.15,
      const Offset(9, -9),
      const Offset(-2, 2),
      12,
      -4,
      1.14,
      1.02,
    ),
    < 0.64 => _interpolatePopper(
      (t - 0.46) / 0.18,
      const Offset(-2, 2),
      Offset.zero,
      -4,
      0,
      1.02,
      1,
    ),
    _ => const _PopperFrame(offset: Offset.zero, rotation: 0, scale: 1),
  };
}

_PopperFrame _interpolatePopper(
  double t,
  Offset start,
  Offset end,
  double startDegrees,
  double endDegrees,
  double startScale,
  double endScale,
) {
  final eased = Curves.easeOut.transform(t.clamp(0, 1));

  return _PopperFrame(
    offset: Offset.lerp(start, end, eased)!,
    rotation: _degreesToRadians(lerpDouble(startDegrees, endDegrees, eased)!),
    scale: lerpDouble(startScale, endScale, eased)!,
  );
}

_ConfettiTransform _confettiTransform(_ConfettiPiece piece, double t) {
  final burst = Offset(piece.x, piece.y);
  final fall = Offset(piece.x + 10, piece.y + 210);
  final end = Offset(piece.endX, piece.endY);
  late final Offset offset;
  late final double opacity;
  late final double scale;

  if (t <= 0.08) {
    offset = Offset.zero;
    opacity = 0;
    scale = 0.2;
  } else if (t <= 0.13) {
    final p = (t - 0.08) / 0.05;
    offset = Offset.zero;
    opacity = p;
    scale = lerpDouble(0.2, 0.95, p)!;
  } else if (t <= 0.24) {
    final p = Curves.easeOut.transform((t - 0.13) / 0.11);
    offset = Offset.lerp(Offset.zero, burst, p)!;
    opacity = 1;
    scale = lerpDouble(0.95, 1, p)!;
  } else if (t <= 0.52) {
    final p = Curves.easeInOut.transform((t - 0.24) / 0.28);
    offset = Offset.lerp(burst, fall, p)!;
    opacity = 1;
    scale = lerpDouble(1, 0.94, p)!;
  } else {
    final p = Curves.easeIn.transform((t - 0.52) / 0.48);
    offset = Offset.lerp(fall, end, p)!;
    opacity = lerpDouble(0.95, 0, p)!;
    scale = lerpDouble(0.94, 0.76, p)!;
  }

  return _ConfettiTransform(
    offset: offset,
    opacity: opacity.clamp(0, 1),
    scale: scale,
    rotation: _degreesToRadians(piece.rotateDegrees * t),
  );
}

double _degreesToRadians(double degrees) {
  return degrees * math.pi / 180;
}

const _celebrationConfetti = [
  _ConfettiPiece(
    x: -118,
    y: -130,
    endX: -126,
    endY: 250,
    rotateDegrees: -330,
    delayMs: 8,
    color: Color(0xffff4d6d),
    shape: _ConfettiShape.strip,
  ),
  _ConfettiPiece(
    x: -92,
    y: -206,
    endX: -108,
    endY: 300,
    rotateDegrees: 240,
    delayMs: 28,
    color: Color(0xffffd166),
    shape: _ConfettiShape.square,
  ),
  _ConfettiPiece(
    x: -52,
    y: -250,
    endX: -82,
    endY: 342,
    rotateDegrees: -190,
    delayMs: 0,
    color: Color(0xff34c759),
    shape: _ConfettiShape.dot,
  ),
  _ConfettiPiece(
    x: -10,
    y: -294,
    endX: -40,
    endY: 376,
    rotateDegrees: 310,
    delayMs: 18,
    color: Color(0xff45a3ff),
    shape: _ConfettiShape.strip,
  ),
  _ConfettiPiece(
    x: 42,
    y: -278,
    endX: 18,
    endY: 410,
    rotateDegrees: -260,
    delayMs: 38,
    color: Color(0xffff8a00),
    shape: _ConfettiShape.square,
  ),
  _ConfettiPiece(
    x: 92,
    y: -230,
    endX: 72,
    endY: 394,
    rotateDegrees: 290,
    delayMs: 12,
    color: Color(0xff9b5cff),
    shape: _ConfettiShape.dot,
  ),
  _ConfettiPiece(
    x: 136,
    y: -176,
    endX: 136,
    endY: 370,
    rotateDegrees: -230,
    delayMs: 48,
    color: Color(0xff00c2a8),
    shape: _ConfettiShape.strip,
  ),
  _ConfettiPiece(
    x: 184,
    y: -112,
    endX: 202,
    endY: 330,
    rotateDegrees: 350,
    delayMs: 64,
    color: Color(0xffff8ab3),
    shape: _ConfettiShape.dot,
  ),
  _ConfettiPiece(
    x: -128,
    y: -60,
    endX: -138,
    endY: 404,
    rotateDegrees: -275,
    delayMs: 72,
    color: Color(0xfff9d423),
    shape: _ConfettiShape.strip,
  ),
  _ConfettiPiece(
    x: -84,
    y: -120,
    endX: -116,
    endY: 438,
    rotateDegrees: 210,
    delayMs: 54,
    color: Color(0xff1dd1a1),
    shape: _ConfettiShape.square,
  ),
  _ConfettiPiece(
    x: -24,
    y: -164,
    endX: -60,
    endY: 454,
    rotateDegrees: -180,
    delayMs: 68,
    color: Color(0xff54a0ff),
    shape: _ConfettiShape.dot,
  ),
  _ConfettiPiece(
    x: 36,
    y: -152,
    endX: 26,
    endY: 462,
    rotateDegrees: 340,
    delayMs: 82,
    color: Color(0xffff6b6b),
    shape: _ConfettiShape.strip,
  ),
  _ConfettiPiece(
    x: 94,
    y: -128,
    endX: 102,
    endY: 448,
    rotateDegrees: -390,
    delayMs: 92,
    color: Color(0xff5f27cd),
    shape: _ConfettiShape.square,
  ),
  _ConfettiPiece(
    x: 156,
    y: -72,
    endX: 180,
    endY: 422,
    rotateDegrees: 265,
    delayMs: 112,
    color: Color(0xff48dbfb),
    shape: _ConfettiShape.square,
  ),
  _ConfettiPiece(
    x: 214,
    y: -26,
    endX: 248,
    endY: 382,
    rotateDegrees: -300,
    delayMs: 98,
    color: Color(0xffff9f43),
    shape: _ConfettiShape.dot,
  ),
  _ConfettiPiece(
    x: -106,
    y: -268,
    endX: -130,
    endY: 210,
    rotateDegrees: 420,
    delayMs: 104,
    color: Color(0xffee5253),
    shape: _ConfettiShape.strip,
  ),
  _ConfettiPiece(
    x: -62,
    y: -314,
    endX: -86,
    endY: 246,
    rotateDegrees: -250,
    delayMs: 116,
    color: Color(0xff2ed573),
    shape: _ConfettiShape.square,
  ),
  _ConfettiPiece(
    x: 8,
    y: -338,
    endX: -18,
    endY: 286,
    rotateDegrees: 300,
    delayMs: 126,
    color: Color(0xffffdd59),
    shape: _ConfettiShape.dot,
  ),
  _ConfettiPiece(
    x: 76,
    y: -304,
    endX: 52,
    endY: 322,
    rotateDegrees: -210,
    delayMs: 146,
    color: Color(0xff70a1ff),
    shape: _ConfettiShape.strip,
  ),
  _ConfettiPiece(
    x: 140,
    y: -246,
    endX: 132,
    endY: 360,
    rotateDegrees: 230,
    delayMs: 136,
    color: Color(0xffff4757),
    shape: _ConfettiShape.square,
  ),
  _ConfettiPiece(
    x: 198,
    y: -164,
    endX: 210,
    endY: 402,
    rotateDegrees: -320,
    delayMs: 152,
    color: Color(0xff7bed9f),
    shape: _ConfettiShape.dot,
  ),
  _ConfettiPiece(
    x: 238,
    y: -84,
    endX: 270,
    endY: 436,
    rotateDegrees: 290,
    delayMs: 164,
    color: Color(0xffffa502),
    shape: _ConfettiShape.strip,
  ),
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
