import 'dart:ui';

import 'package:flutter/material.dart';

import '../navigation/reminders_routes.dart';
import '../theme/tokens.dart';
import 'reminder_sheets.dart';

class ReminderModalLayer extends StatelessWidget {
  const ReminderModalLayer({
    super.key,
    required this.modal,
    required this.planGoal,
    required this.completedCount,
    required this.selectedDays,
    required this.createController,
    required this.createFocusNode,
    required this.onSaveGoal,
    required this.onClose,
    required this.onCloseCreateTask,
    required this.onCreateTask,
    required this.onToggleDay,
  });

  final RemindersModalPreview modal;
  final int planGoal;
  final int completedCount;
  final List<int> selectedDays;
  final TextEditingController createController;
  final FocusNode createFocusNode;
  final void Function(int goal, List<int> selectedDays) onSaveGoal;
  final VoidCallback onClose;
  final VoidCallback onCloseCreateTask;
  final VoidCallback onCreateTask;
  final ValueChanged<int> onToggleDay;

  @override
  Widget build(BuildContext context) {
    final isCreateTask = modal == RemindersModalPreview.createTask;

    return BackdropFilter(
      filter: ImageFilter.blur(sigmaX: 5, sigmaY: 5),
      child: DecoratedBox(
        decoration: BoxDecoration(
          color: isCreateTask ? null : RemindersTokens.modalOverlay,
          gradient: isCreateTask
              ? LinearGradient(
                  begin: Alignment.bottomCenter,
                  end: Alignment.topCenter,
                  colors: [
                    RemindersTokens.backgroundSecondary,
                    RemindersTokens.backgroundSecondary,
                    RemindersTokens.modalOverlay,
                  ],
                  stops: const [
                    0,
                    RemindersTokens.createTaskKeyboardGradientStop,
                    RemindersTokens.createTaskKeyboardGradientStop,
                  ],
                )
              : null,
        ),
        child: Padding(
          padding: EdgeInsets.only(
            bottom: isCreateTask ? RemindersTokens.createTaskKeyboardHeight : 0,
          ),
          child: Align(
            alignment: Alignment.bottomCenter,
            child: switch (modal) {
              RemindersModalPreview.goalSetup => GoalSetupSheet(
                initialGoal: planGoal,
                initialSelectedDays: selectedDays,
                onSave: onSaveGoal,
                onToggleDay: onToggleDay,
              ),
              RemindersModalPreview.success => CongratulationsSheet(
                completedCount: completedCount,
                planGoal: planGoal,
                onClose: onClose,
              ),
              RemindersModalPreview.createTask => CreateTaskSheet(
                controller: createController,
                focusNode: createFocusNode,
                onClose: onCloseCreateTask,
                onSubmit: onCreateTask,
              ),
            },
          ),
        ),
      ),
    );
  }
}
