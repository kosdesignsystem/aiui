enum ReminderFilter { today, all }

enum ReminderSectionId { overdue, today, upcoming, noDate, completed }

enum ReminderPriority { high, medium, normal }

enum ReminderListId { work, home, personal }

class ReminderListInfo {
  const ReminderListInfo({required this.id, required this.label});

  final ReminderListId id;
  final String label;
}

class Reminder {
  const Reminder({
    required this.id,
    required this.title,
    required this.note,
    required this.listId,
    required this.section,
    required this.dueLabel,
    required this.priority,
    required this.completed,
    this.activeSection,
    this.dueTime,
    this.repeatLabel,
  });

  final String id;
  final String title;
  final String note;
  final ReminderListId listId;
  final ReminderSectionId section;
  final ReminderSectionId? activeSection;
  final String dueLabel;
  final String? dueTime;
  final String? repeatLabel;
  final ReminderPriority priority;
  final bool completed;

  Reminder copyWith({
    ReminderSectionId? section,
    ReminderSectionId? activeSection,
    bool? completed,
  }) {
    return Reminder(
      id: id,
      title: title,
      note: note,
      listId: listId,
      section: section ?? this.section,
      activeSection: activeSection ?? this.activeSection,
      dueLabel: dueLabel,
      dueTime: dueTime,
      repeatLabel: repeatLabel,
      priority: priority,
      completed: completed ?? this.completed,
    );
  }
}

class PreparedReminder {
  const PreparedReminder({
    required this.title,
    required this.dateOffset,
    required this.listId,
    this.dueTime,
  });

  final String title;
  final int? dateOffset;
  final String? dueTime;
  final ReminderListId listId;
}

class ReminderSection {
  const ReminderSection({
    required this.id,
    required this.title,
    required this.reminders,
  });

  final ReminderSectionId id;
  final String title;
  final List<Reminder> reminders;
}

const reminderLists = [
  ReminderListInfo(id: ReminderListId.work, label: 'Работа'),
  ReminderListInfo(id: ReminderListId.home, label: 'Дом'),
  ReminderListInfo(id: ReminderListId.personal, label: 'Личное'),
];

const reminderSeeds = [
  Reminder(
    id: 'reminder-1',
    title: 'Согласовать макет главного экрана',
    note: 'Проверить состояния пустого списка и поиска.',
    listId: ReminderListId.work,
    section: ReminderSectionId.today,
    dueLabel: 'Сегодня',
    dueTime: '10:30',
    priority: ReminderPriority.high,
    completed: false,
  ),
  Reminder(
    id: 'reminder-2',
    title: 'Купить батарейки для датчика',
    note: 'AA, четыре штуки.',
    listId: ReminderListId.home,
    section: ReminderSectionId.today,
    dueLabel: 'Сегодня',
    dueTime: '18:00',
    priority: ReminderPriority.medium,
    completed: false,
  ),
  Reminder(
    id: 'reminder-3',
    title: 'Отправить документы в бухгалтерию',
    note: 'Счета и акт за апрель.',
    listId: ReminderListId.work,
    section: ReminderSectionId.overdue,
    dueLabel: 'Вчера',
    dueTime: '17:45',
    priority: ReminderPriority.high,
    completed: false,
  ),
  Reminder(
    id: 'reminder-4',
    title: 'Запланировать тренировку',
    note: 'Среда или пятница вечером.',
    listId: ReminderListId.personal,
    section: ReminderSectionId.upcoming,
    dueLabel: 'Завтра',
    dueTime: '20:00',
    repeatLabel: 'Еженедельно',
    priority: ReminderPriority.normal,
    completed: false,
  ),
  Reminder(
    id: 'reminder-5',
    title: 'Разобрать входящие заметки',
    note: 'Перенести важное в проекты.',
    listId: ReminderListId.personal,
    section: ReminderSectionId.noDate,
    dueLabel: 'Без срока',
    priority: ReminderPriority.normal,
    completed: false,
  ),
  Reminder(
    id: 'reminder-6',
    title: 'Позвонить поставщику',
    note: 'Уточнить окно доставки.',
    listId: ReminderListId.work,
    section: ReminderSectionId.completed,
    dueLabel: 'Сегодня',
    dueTime: '09:20',
    priority: ReminderPriority.medium,
    completed: true,
  ),
];

const preparedReminders = [
  PreparedReminder(
    title: 'Подготовить статус по проекту',
    dateOffset: 0,
    dueTime: '12:00',
    listId: ReminderListId.work,
  ),
  PreparedReminder(
    title: 'Оплатить интернет',
    dateOffset: 1,
    dueTime: '19:00',
    listId: ReminderListId.home,
  ),
  PreparedReminder(
    title: 'Записаться к врачу',
    dateOffset: 3,
    dueTime: '10:00',
    listId: ReminderListId.personal,
  ),
  PreparedReminder(
    title: 'Отнести документы в офис',
    dateOffset: 7,
    dueTime: '09:30',
    listId: ReminderListId.work,
  ),
  PreparedReminder(
    title: 'Разобрать список покупок',
    dateOffset: null,
    listId: ReminderListId.home,
  ),
];

const reminderSectionOrder = [
  ReminderSectionId.overdue,
  ReminderSectionId.today,
  ReminderSectionId.upcoming,
  ReminderSectionId.noDate,
  ReminderSectionId.completed,
];

const reminderSectionTitles = {
  ReminderSectionId.overdue: 'Просрочено',
  ReminderSectionId.today: 'Сегодня',
  ReminderSectionId.upcoming: 'Позже',
  ReminderSectionId.noDate: 'Без срока',
  ReminderSectionId.completed: 'Выполнено',
};

ReminderListInfo getReminderList(ReminderListId listId) {
  return reminderLists.firstWhere((list) => list.id == listId);
}

List<Reminder> getRemindersByFilter(
  List<Reminder> reminders,
  ReminderFilter filter,
) {
  if (filter == ReminderFilter.all) {
    return reminders;
  }

  return reminders.where((reminder) {
    if (reminder.section == ReminderSectionId.today ||
        reminder.section == ReminderSectionId.overdue) {
      return true;
    }

    if (!reminder.completed) {
      return false;
    }

    return reminder.activeSection == ReminderSectionId.today ||
        reminder.activeSection == ReminderSectionId.overdue ||
        reminder.dueLabel == 'Сегодня' ||
        reminder.dueLabel == 'Вчера';
  }).toList();
}

List<Reminder> searchReminders(List<Reminder> reminders, String rawQuery) {
  final query = _normalizeSearchValue(rawQuery);

  if (query.isEmpty) {
    return [];
  }

  return reminders.where((reminder) {
    final list = getReminderList(reminder.listId);
    final searchable = _normalizeSearchValue(
      '${reminder.title} ${reminder.note} ${list.label} ${reminder.dueLabel}',
    );

    return searchable.contains(query);
  }).toList();
}

List<ReminderSection> groupReminders(List<Reminder> reminders) {
  return reminderSectionOrder
      .map(
        (sectionId) => ReminderSection(
          id: sectionId,
          title: reminderSectionTitles[sectionId]!,
          reminders: reminders
              .where((reminder) => reminder.section == sectionId)
              .toList(),
        ),
      )
      .where((section) => section.reminders.isNotEmpty)
      .toList();
}

int getActiveReminderCount(List<Reminder> reminders) {
  return reminders.where((reminder) => !reminder.completed).length;
}

int getOverdueReminderCount(List<Reminder> reminders) {
  return reminders
      .where(
        (reminder) =>
            !reminder.completed &&
            reminder.section == ReminderSectionId.overdue,
      )
      .length;
}

String formatReminderMeta(Reminder reminder) {
  final list = getReminderList(reminder.listId);
  final parts = [
    reminder.dueTime == null
        ? reminder.dueLabel
        : '${reminder.dueLabel}, ${reminder.dueTime}',
    list.label,
    reminder.repeatLabel,
  ].whereType<String>().where((part) => part.isNotEmpty);

  return parts.join(' · ');
}

ReminderSectionId restoreReminderSection(Reminder reminder) {
  if (reminder.dueLabel == 'Вчера') {
    return ReminderSectionId.overdue;
  }

  if (reminder.dueLabel == 'Сегодня') {
    return ReminderSectionId.today;
  }

  if (reminder.dueLabel == 'Без срока') {
    return ReminderSectionId.noDate;
  }

  return ReminderSectionId.upcoming;
}

Reminder createReminderFromPreset(PreparedReminder preset, int cursor) {
  final dateKey = _getPreparedReminderDateKey(preset);
  final section = _getReminderSection(dateKey);

  return Reminder(
    id: 'reminder-${DateTime.now().millisecondsSinceEpoch}-$cursor',
    title: preset.title,
    note: '',
    listId: preset.listId,
    section: section,
    activeSection: section,
    dueLabel: _formatReminderDateLabel(dateKey),
    dueTime: preset.dueTime,
    priority: ReminderPriority.normal,
    completed: false,
  );
}

String _normalizeSearchValue(String value) => value.toLowerCase().trim();

String _toDateKey(DateTime date) {
  final month = date.month.toString().padLeft(2, '0');
  final day = date.day.toString().padLeft(2, '0');

  return '${date.year}-$month-$day';
}

DateTime _getDateByOffset(int offset) {
  final today = DateTime.now();

  return DateTime(today.year, today.month, today.day + offset);
}

String _getPreparedReminderDateKey(PreparedReminder preset) {
  final offset = preset.dateOffset;

  if (offset == null) {
    return '';
  }

  return _toDateKey(_getDateByOffset(offset));
}

ReminderSectionId _getReminderSection(String dateKey) {
  if (dateKey.isEmpty) {
    return ReminderSectionId.noDate;
  }

  final todayKey = _toDateKey(DateTime.now());

  if (dateKey.compareTo(todayKey) < 0) {
    return ReminderSectionId.overdue;
  }

  if (dateKey == todayKey) {
    return ReminderSectionId.today;
  }

  return ReminderSectionId.upcoming;
}

String _formatReminderDateLabel(String dateKey) {
  if (dateKey.isEmpty) {
    return 'Без срока';
  }

  final today = DateTime.now();
  final tomorrow = DateTime(today.year, today.month, today.day + 1);

  if (dateKey == _toDateKey(today)) {
    return 'Сегодня';
  }

  if (dateKey == _toDateKey(tomorrow)) {
    return 'Завтра';
  }

  final parts = dateKey.split('-').map(int.parse).toList();
  final date = DateTime(parts[0], parts[1], parts[2]);
  const monthNames = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];

  return '${date.day} ${monthNames[date.month - 1]}';
}
