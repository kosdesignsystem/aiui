import 'package:flutter/material.dart';

import '../models/reminder.dart';
import 'progress.dart';

class PlanProgress extends StatelessWidget {
  const PlanProgress({
    Key? key,
    required this.filter,
    required this.completedCount,
    required this.planGoal,
    required this.selectedDays,
  }) : super(key: key);

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
