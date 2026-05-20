import '../models/reminder.dart';

class RemindersSession {
  RemindersSession._();

  static var reminders = List<Reminder>.of(reminderSeeds);
  static var selectedDays = List<int>.of(defaultSelectedGoalDays);
  static var planGoal = dailyGoalDefault;
  static var createdReminderCursor = 0;
  static var hasShownGoalSetup = false;

  static void markGoalSetupShown() {
    hasShownGoalSetup = true;
  }

  static void reset() {
    reminders = List<Reminder>.of(reminderSeeds);
    selectedDays = List<int>.of(defaultSelectedGoalDays);
    planGoal = dailyGoalDefault;
    createdReminderCursor = 0;
    hasShownGoalSetup = false;
  }
}
