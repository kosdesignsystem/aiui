import '../models/reminder.dart';

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

String routeForReminderFilter(ReminderFilter filter) {
  return filter == ReminderFilter.all
      ? RemindersRoutes.all
      : RemindersRoutes.today;
}
