import 'package:flutter/material.dart';

import 'models/reminder.dart';
import 'navigation/reminders_routes.dart';
import 'screens/reminders_screen.dart';
import 'theme/typography.dart';

void main() {
  runApp(const RemindersApp());
}

class RemindersApp extends StatelessWidget {
  const RemindersApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Напоминания',
      debugShowCheckedModeBanner: false,
      theme: RemindersTheme.light(),
      initialRoute: RemindersRoutes.today,
      routes: {
        RemindersRoutes.today: (_) => const RemindersScreen(
              title: 'Напоминания',
              filter: ReminderFilter.today,
              autoShowGoalSetup: true,
            ),
        RemindersRoutes.all: (_) => const RemindersScreen(
              title: 'Напоминания',
              filter: ReminderFilter.all,
            ),
        RemindersRoutes.search: (_) => const RemindersScreen(
              title: 'Напоминания',
              filter: ReminderFilter.all,
              mode: RemindersMode.search,
            ),
        RemindersRoutes.create: (_) => const RemindersScreen(
              title: 'Создание задачи',
              filter: ReminderFilter.today,
              modalPreview: RemindersModalPreview.createTask,
            ),
        RemindersRoutes.goal: (_) => const RemindersScreen(
              title: 'Продуктивность',
              filter: ReminderFilter.today,
              modalPreview: RemindersModalPreview.goalSetup,
              previewGoal: dailyGoalDefault,
            ),
        RemindersRoutes.success: (_) => const RemindersScreen(
              title: 'Успех',
              filter: ReminderFilter.today,
              modalPreview: RemindersModalPreview.success,
              previewGoal: successGoalPreview,
            ),
      },
    );
  }
}
