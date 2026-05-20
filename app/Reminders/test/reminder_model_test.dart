import 'package:flutter_test/flutter_test.dart';
import 'package:reminders/models/reminder.dart';

void main() {
  test('search matches reminder title, note, list, and due label', () {
    expect(searchReminders(reminderSeeds, 'батарейки'), [reminderSeeds[1]]);
    expect(searchReminders(reminderSeeds, 'бухгалтерию'), [reminderSeeds[2]]);
    expect(searchReminders(reminderSeeds, 'личное'), [
      reminderSeeds[3],
      reminderSeeds[4],
    ]);
    expect(searchReminders(reminderSeeds, 'сегодня'), [
      reminderSeeds[0],
      reminderSeeds[1],
      reminderSeeds[5],
    ]);
  });

  test('complete and reopen preserve the active reminder section', () {
    final completed = completeReminder(reminderSeeds[0]);

    expect(completed.completed, isTrue);
    expect(completed.section, ReminderSectionId.completed);
    expect(completed.activeSection, ReminderSectionId.today);

    final reopened = reopenReminder(completed);

    expect(reopened.completed, isFalse);
    expect(reopened.section, ReminderSectionId.today);
  });

  test('goal and progress values are normalized to safe ranges', () {
    expect(normalizeGoal(0), 1);
    expect(normalizeGoal(dailyGoalDefault + 10), dailyGoalDefault);
    expect(clampProgress(-1, dailyGoalDefault), 0);
    expect(
      clampProgress(dailyGoalDefault + 1, dailyGoalDefault),
      dailyGoalDefault,
    );
  });
}
