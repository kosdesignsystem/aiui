import 'package:flutter/material.dart';

import '../models/reminder.dart';
import 'chrome.dart';
import 'reminder_row.dart';

class ReminderListContent extends StatelessWidget {
  const ReminderListContent({
    super.key,
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

class SearchContent extends StatelessWidget {
  const SearchContent({
    super.key,
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
