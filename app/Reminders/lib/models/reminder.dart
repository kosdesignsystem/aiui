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
    this.activeSection,
    required this.dueLabel,
    this.dueTime,
    this.repeatLabel,
    required this.priority,
    required this.completed,
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
    String? id,
    String? title,
    String? note,
    ReminderListId? listId,
    ReminderSectionId? section,
    ReminderSectionId? activeSection,
    String? dueLabel,
    String? dueTime,
    String? repeatLabel,
    ReminderPriority? priority,
    bool? completed,
  }) {
    return Reminder(
      id: id ?? this.id,
      title: title ?? this.title,
      note: note ?? this.note,
      listId: listId ?? this.listId,
      section: section ?? this.section,
      activeSection: activeSection ?? this.activeSection,
      dueLabel: dueLabel ?? this.dueLabel,
      dueTime: dueTime ?? this.dueTime,
      repeatLabel: repeatLabel ?? this.repeatLabel,
      priority: priority ?? this.priority,
      completed: completed ?? this.completed,
    );
  }
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

const dailyGoalDefault = 15;
const successGoalPreview = 3;
const defaultSelectedGoalDays = [0, 3];
const defaultCreateTaskListId = ReminderListId.personal;

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

const reminderSectionOrder = [
  ReminderSectionId.overdue,
  ReminderSectionId.today,
  ReminderSectionId.upcoming,
  ReminderSectionId.noDate,
  ReminderSectionId.completed,
];

String reminderSectionTitle(ReminderSectionId sectionId) {
  return switch (sectionId) {
    ReminderSectionId.overdue => 'Просрочено',
    ReminderSectionId.today => 'Сегодня',
    ReminderSectionId.upcoming => 'Позже',
    ReminderSectionId.noDate => 'Без срока',
    ReminderSectionId.completed => 'Выполнено',
  };
}

ReminderListInfo getReminderList(ReminderListId listId) {
  return reminderLists.firstWhere(
    (list) => list.id == listId,
    orElse: () => reminderLists.first,
  );
}

List<Reminder> getRemindersByFilter(
  List<Reminder> reminders,
  ReminderFilter filter,
) {
  if (filter == ReminderFilter.today) {
    return reminders
        .where(
          (reminder) =>
              !reminder.completed &&
              (reminder.section == ReminderSectionId.today ||
                  reminder.section == ReminderSectionId.overdue),
        )
        .toList();
  }

  return reminders;
}

String normalizeSearchValue(String value) {
  return value.toLowerCase().trim();
}

List<Reminder> searchReminders(List<Reminder> reminders, String rawQuery) {
  final query = normalizeSearchValue(rawQuery);

  if (query.isEmpty) {
    return [];
  }

  return reminders.where((reminder) {
    final list = getReminderList(reminder.listId);
    final searchable = normalizeSearchValue(
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
          title: reminderSectionTitle(sectionId),
          reminders: reminders
              .where((reminder) => reminder.section == sectionId)
              .toList(),
        ),
      )
      .where((section) => section.reminders.isNotEmpty)
      .toList();
}

String formatReminderMeta(Reminder reminder) {
  final list = getReminderList(reminder.listId);
  final segments = <String>[
    reminder.dueTime == null
        ? reminder.dueLabel
        : '${reminder.dueLabel}, ${reminder.dueTime}',
    list.label,
    if (reminder.repeatLabel != null) reminder.repeatLabel!,
  ];

  return segments.join(' · ');
}

int getCompletedCount(List<Reminder> reminders) {
  return reminders.where((reminder) => reminder.completed).length;
}

int clampProgress(int value, int max) {
  return value.clamp(0, max);
}

int normalizeGoal(int value) {
  return value.clamp(1, dailyGoalDefault);
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

Reminder completeReminder(Reminder reminder) {
  final activeSection = reminder.section == ReminderSectionId.completed
      ? reminder.activeSection ?? restoreReminderSection(reminder)
      : reminder.section;

  return reminder.copyWith(
    completed: true,
    activeSection: activeSection,
    section: ReminderSectionId.completed,
  );
}

Reminder reopenReminder(Reminder reminder) {
  return reminder.copyWith(
    completed: false,
    section: reminder.activeSection ?? restoreReminderSection(reminder),
  );
}

String toDateKey(DateTime date) {
  final month = date.month.toString().padLeft(2, '0');
  final day = date.day.toString().padLeft(2, '0');

  return '${date.year}-$month-$day';
}

String formatReminderDateLabel(DateTime date) {
  final today = DateTime.now();
  final tomorrow = DateTime(today.year, today.month, today.day + 1);
  final dateKey = toDateKey(date);

  if (dateKey == toDateKey(today)) {
    return 'Сегодня';
  }

  if (dateKey == toDateKey(tomorrow)) {
    return 'Завтра';
  }

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

ReminderSectionId getReminderSection(DateTime date) {
  final todayKey = toDateKey(DateTime.now());
  final dateKey = toDateKey(date);

  if (dateKey.compareTo(todayKey) < 0) {
    return ReminderSectionId.overdue;
  }

  if (dateKey == todayKey) {
    return ReminderSectionId.today;
  }

  return ReminderSectionId.upcoming;
}

Reminder createReminderFromTitle(String title, int cursor) {
  final section = getReminderSection(DateTime.now());

  return Reminder(
    id: 'reminder-${DateTime.now().millisecondsSinceEpoch}-$cursor',
    title: title,
    note: '',
    listId: defaultCreateTaskListId,
    section: section,
    activeSection: section,
    dueLabel: formatReminderDateLabel(DateTime.now()),
    priority: ReminderPriority.normal,
    completed: false,
  );
}
