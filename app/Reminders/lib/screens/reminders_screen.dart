import 'package:flutter/material.dart';

import '../models/reminder.dart';
import '../theme/tokens.dart';
import '../theme/typography.dart';
import '../widgets/empty_states.dart';
import '../widgets/reminder_list_section.dart';
import '../widgets/reminder_tabs.dart';

class RemindersScreen extends StatefulWidget {
  const RemindersScreen({super.key});

  @override
  State<RemindersScreen> createState() => _RemindersScreenState();
}

class _RemindersScreenState extends State<RemindersScreen> {
  final _searchController = TextEditingController();
  var _reminders = List<Reminder>.of(reminderSeeds);
  var _filter = ReminderFilter.today;
  var _isSearchMode = false;
  var _preparedReminderCursor = 0;

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final activeCount = getActiveReminderCount(_reminders);
    final overdueCount = getOverdueReminderCount(_reminders);
    final filteredReminders = getRemindersByFilter(_reminders, _filter);
    final groupedReminders = groupReminders(filteredReminders);
    final metaLabel = overdueCount > 0
        ? '$activeCount активных · $overdueCount просрочено'
        : '$activeCount активных';

    return Scaffold(
      backgroundColor: AppColors.backgroundPrimary,
      body: SafeArea(
        bottom: false,
        child: Column(
          children: [
            if (_isSearchMode)
              _SearchHeader(
                controller: _searchController,
                onChanged: (_) => setState(() {}),
                onClose: _closeSearch,
              )
            else ...[
              _Header(metaLabel: metaLabel),
              ReminderTabs(
                value: _filter,
                onChanged: (filter) => setState(() => _filter = filter),
                onSearch: _openSearch,
              ),
            ],
            Expanded(
              child: _isSearchMode
                  ? _SearchContent(
                      query: _searchController.text,
                      reminders: _reminders,
                      onToggle: _toggleReminder,
                    )
                  : _ReminderContent(
                      filter: _filter,
                      filteredReminders: filteredReminders,
                      sections: groupedReminders,
                      onToggle: _toggleReminder,
                    ),
            ),
            if (!_isSearchMode) _BottomActions(onCreateTask: _createTask),
          ],
        ),
      ),
    );
  }

  void _openSearch() {
    setState(() {
      _searchController.clear();
      _isSearchMode = true;
    });
  }

  void _closeSearch() {
    setState(() {
      _searchController.clear();
      _isSearchMode = false;
    });
  }

  void _createTask() {
    final preset =
        preparedReminders[_preparedReminderCursor % preparedReminders.length];
    final nextReminder = createReminderFromPreset(
      preset,
      _preparedReminderCursor,
    );

    setState(() {
      _preparedReminderCursor += 1;
      _reminders = [nextReminder, ..._reminders];
      _filter =
          nextReminder.section == ReminderSectionId.today ||
              nextReminder.section == ReminderSectionId.overdue
          ? ReminderFilter.today
          : ReminderFilter.all;
    });
  }

  void _toggleReminder(String reminderId) {
    setState(() {
      _reminders = _reminders.map((reminder) {
        if (reminder.id != reminderId) {
          return reminder;
        }

        if (reminder.completed) {
          return reminder.copyWith(
            completed: false,
            section: reminder.activeSection ?? restoreReminderSection(reminder),
          );
        }

        return reminder.copyWith(
          completed: true,
          activeSection: reminder.section,
          section: ReminderSectionId.completed,
        );
      }).toList();
    });
  }
}

class _Header extends StatelessWidget {
  const _Header({required this.metaLabel});

  final String metaLabel;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(24, 40, 24, 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Напоминания',
            style: AppTypography.semiBold40(color: AppColors.contentPrimary),
          ),
          const SizedBox(height: AppSpacing.sm),
          Text(
            metaLabel,
            style: AppTypography.regular14(color: AppColors.contentSecondary),
          ),
        ],
      ),
    );
  }
}

class _SearchHeader extends StatelessWidget {
  const _SearchHeader({
    required this.controller,
    required this.onChanged,
    required this.onClose,
  });

  final TextEditingController controller;
  final ValueChanged<String> onChanged;
  final VoidCallback onClose;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 0, 20, 12),
      child: SizedBox(
        height: 56,
        child: TextField(
          controller: controller,
          autofocus: true,
          onChanged: onChanged,
          textInputAction: TextInputAction.search,
          style: AppTypography.regular16(color: AppColors.contentPrimary),
          decoration: InputDecoration(
            hintText: 'Поиск',
            hintStyle: AppTypography.regular16(
              color: AppColors.contentSecondary,
            ),
            filled: true,
            fillColor: AppColors.contentBackground,
            contentPadding: const EdgeInsets.fromLTRB(20, 0, 8, 0),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(AppRadii.md),
              borderSide: BorderSide.none,
            ),
            suffixIcon: Tooltip(
              message: 'Назад',
              child: IconButton(
                onPressed: onClose,
                icon: const Icon(Icons.close_rounded, size: 16),
                color: AppColors.contentPrimary,
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _ReminderContent extends StatelessWidget {
  const _ReminderContent({
    required this.filter,
    required this.filteredReminders,
    required this.sections,
    required this.onToggle,
  });

  final ReminderFilter filter;
  final List<Reminder> filteredReminders;
  final List<ReminderSection> sections;
  final ValueChanged<String> onToggle;

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: EdgeInsets.zero,
      children: [
        if (filteredReminders.isEmpty) EmptyRemindersState(filter: filter),
        for (var index = 0; index < sections.length; index++)
          ReminderListSection(
            section: sections[index],
            onToggle: onToggle,
            showTopBorder: index > 0,
          ),
      ],
    );
  }
}

class _SearchContent extends StatelessWidget {
  const _SearchContent({
    required this.query,
    required this.reminders,
    required this.onToggle,
  });

  final String query;
  final List<Reminder> reminders;
  final ValueChanged<String> onToggle;

  @override
  Widget build(BuildContext context) {
    final results = searchReminders(reminders, query);
    final sections = groupReminders(results);

    if (query.trim().isEmpty) {
      return const SizedBox.expand();
    }

    if (results.isEmpty) {
      return const SearchEmptyState();
    }

    return ListView(
      padding: EdgeInsets.zero,
      children: [
        for (var index = 0; index < sections.length; index++)
          ReminderListSection(
            section: sections[index],
            onToggle: onToggle,
            showTopBorder: index > 0,
          ),
      ],
    );
  }
}

class _BottomActions extends StatelessWidget {
  const _BottomActions({required this.onCreateTask});

  final VoidCallback onCreateTask;

  @override
  Widget build(BuildContext context) {
    final bottomInset = MediaQuery.paddingOf(context).bottom;

    return Container(
      color: AppColors.backgroundSecondary,
      padding: EdgeInsets.fromLTRB(10, 10, 10, bottomInset + 10),
      child: SizedBox(
        width: double.infinity,
        height: 60,
        child: FilledButton(
          onPressed: onCreateTask,
          style: FilledButton.styleFrom(
            backgroundColor: AppColors.accentPrimary,
            foregroundColor: AppColors.contentConstant,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(AppRadii.md),
            ),
            textStyle: AppTypography.medium18(color: AppColors.contentConstant),
          ),
          child: const Text('Создать задачу'),
        ),
      ),
    );
  }
}
