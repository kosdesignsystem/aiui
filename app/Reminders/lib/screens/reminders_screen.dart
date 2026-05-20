import 'package:flutter/material.dart';

import '../models/reminder.dart';
import '../navigation/reminders_routes.dart';
import '../state/reminders_session.dart';
import '../widgets/chrome.dart';
import '../widgets/plan_progress.dart';
import '../widgets/reminder_content.dart';
import '../widgets/reminder_modal_layer.dart';

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

  var _reminders = List<Reminder>.of(RemindersSession.reminders);
  var _selectedDays = List<int>.of(RemindersSession.selectedDays);
  var _searchQuery = '';
  late int _planGoal = widget.previewGoal ?? RemindersSession.planGoal;
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
          !RemindersSession.hasShownGoalSetup) {
        RemindersSession.markGoalSetupShown();
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
      RemindersSession.planGoal = nextGoal;
      RemindersSession.selectedDays = nextSelectedDays;
    }
  }

  void _openSearch() {
    _searchController.clear();
    Navigator.of(context).pushNamed(
      RemindersRoutes.search,
      arguments: routeForReminderFilter(widget.filter),
    );
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
      RemindersSession.createdReminderCursor += 1;
      _reminders = [
        createReminderFromTitle(title, RemindersSession.createdReminderCursor),
        ..._reminders,
      ];
      RemindersSession.reminders = List<Reminder>.of(_reminders);
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
      RemindersSession.reminders = List<Reminder>.of(nextReminders);

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
          : ReminderModalLayer(
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
          ? SearchContent(
              query: _searchQuery,
              searchResults: searchResults,
              groupedSearchResults: groupedSearchResults,
              onToggleReminder: _toggleReminder,
            )
          : ReminderListContent(
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
          RemindersSession.selectedDays = List<int>.of(_selectedDays);
        }
        return;
      }

      _selectedDays = [..._selectedDays, dayId]..sort();
      if (widget.modalPreview == null) {
        RemindersSession.selectedDays = List<int>.of(_selectedDays);
      }
    });
  }
}
