import 'package:flutter/material.dart';
import '../theme/tokens.dart';
import '../theme/typography.dart';
import '../widgets/screen_scaffold.dart';
import '../widgets/task_item.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final TextEditingController _titleController = TextEditingController();
  final TextEditingController _noteController = TextEditingController();
  bool _showCompleted = true;

  List<Task> tasks = [
    Task(
      id: 'task-1',
      title: 'Собрать список покупок',
      note: 'Молоко, хлеб, овощи',
    ),
    Task(
      id: 'task-2',
      title: 'Позвонить стоматологу',
      note: 'Записаться на следующую неделю',
    ),
    Task(
      id: 'task-3',
      title: 'Отправить отчёт',
      note: 'Финальный драфт',
      completed: true,
    ),
  ];

  @override
  void dispose() {
    _titleController.dispose();
    _noteController.dispose();
    super.dispose();
  }

  void _toggleTask(String id) {
    setState(() {
      tasks = tasks
          .map((task) => task.id == id
              ? task.copyWith(completed: !task.completed)
              : task)
          .toList();
    });
  }

  void _addTask() {
    final title = _titleController.text.trim();
    final note = _noteController.text.trim();

    if (title.isEmpty) {
      return;
    }

    setState(() {
      tasks = [
        Task(
          id: 'task-${DateTime.now().millisecondsSinceEpoch}',
          title: title,
          note: note.isEmpty ? null : note,
        ),
        ...tasks,
      ];
    });

    _titleController.clear();
    _noteController.clear();
  }

  @override
  Widget build(BuildContext context) {
    final activeTasks = tasks.where((task) => !task.completed).toList();
    final completedTasks = tasks.where((task) => task.completed).toList();

    return ScreenScaffold(
      child: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _Header(
              activeCount: activeTasks.length,
              completedCount: completedTasks.length,
            ),
            const SizedBox(height: AppSpacing.lg),
            LayoutBuilder(
              builder: (context, constraints) {
                final isNarrow = constraints.maxWidth < 900;

                final activePanel = _Panel(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Новая задача', style: AppTextStyles.subtitle),
                      const SizedBox(height: AppSpacing.sm),
                      _Form(
                        titleController: _titleController,
                        noteController: _noteController,
                        onSubmit: _addTask,
                      ),
                      const SizedBox(height: AppSpacing.lg),
                      _SectionHeader(
                        title: 'Активные задачи',
                        trailing: Text(
                          '${activeTasks.length} шт.',
                          style: AppTextStyles.muted,
                        ),
                      ),
                      const SizedBox(height: AppSpacing.sm),
                      if (activeTasks.isEmpty)
                        Text('Все задачи выполнены.', style: AppTextStyles.muted)
                      else
                        Column(
                          children: activeTasks
                              .map((task) => Padding(
                                    padding: const EdgeInsets.only(bottom: AppSpacing.sm),
                                    child: TaskItem(
                                      task: task,
                                      onToggle: _toggleTask,
                                    ),
                                  ))
                              .toList(),
                        ),
                    ],
                  ),
                );

                final completedPanel = _Panel(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      _SectionHeader(
                        title: 'Выполненные',
                        trailing: TextButton(
                          onPressed: () => setState(() => _showCompleted = !_showCompleted),
                          style: TextButton.styleFrom(
                            foregroundColor: AppColors.textPrimary,
                            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                            textStyle: AppTextStyles.muted,
                            shape: const StadiumBorder(),
                            side: const BorderSide(color: AppColors.border),
                          ),
                          child: Text(_showCompleted ? 'Скрыть' : 'Показать'),
                        ),
                      ),
                      const SizedBox(height: AppSpacing.sm),
                      if (completedTasks.isEmpty)
                        Text('Пока нет выполненных задач.', style: AppTextStyles.muted)
                      else if (_showCompleted)
                        Column(
                          children: completedTasks
                              .map((task) => Padding(
                                    padding: const EdgeInsets.only(bottom: AppSpacing.sm),
                                    child: TaskItem(
                                      task: task,
                                      onToggle: _toggleTask,
                                    ),
                                  ))
                              .toList(),
                        )
                      else
                        Text('Список скрыт.', style: AppTextStyles.muted),
                    ],
                  ),
                );

                if (isNarrow) {
                  return Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      activePanel,
                      const SizedBox(height: AppSpacing.lg),
                      completedPanel,
                    ],
                  );
                }

                return Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(flex: 3, child: activePanel),
                    const SizedBox(width: AppSpacing.lg),
                    Expanded(flex: 2, child: completedPanel),
                  ],
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}

class _Header extends StatelessWidget {
  const _Header({required this.activeCount, required this.completedCount});

  final int activeCount;
  final int completedCount;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(AppSpacing.lg),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(16),
        gradient: const LinearGradient(
          colors: [Color(0x2B6AA9FF), Color(0x0AFFFFFF)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
      ),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Напоминания · v1', style: AppTextStyles.heading),
                const SizedBox(height: AppSpacing.xs),
                Text('user / Reminders / v1 / Home', style: AppTextStyles.muted),
              ],
            ),
          ),
          const SizedBox(width: AppSpacing.lg),
          _StatCard(label: 'Активные', value: activeCount),
          const SizedBox(width: AppSpacing.md),
          _StatCard(label: 'Выполненные', value: completedCount),
        ],
      ),
    );
  }
}

class _StatCard extends StatelessWidget {
  const _StatCard({required this.label, required this.value});

  final String label;
  final int value;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: AppSpacing.md, vertical: AppSpacing.sm),
      decoration: BoxDecoration(
        color: const Color(0x14FFFFFF),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        children: [
          Text(label, style: AppTextStyles.muted),
          const SizedBox(height: AppSpacing.xs),
          Text(
            value.toString(),
            style: AppTextStyles.heading.copyWith(fontSize: 20),
          ),
        ],
      ),
    );
  }
}

class _Panel extends StatelessWidget {
  const _Panel({required this.child});

  final Widget child;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(AppSpacing.md),
      decoration: BoxDecoration(
        color: const Color(0x14FFFFFF),
        borderRadius: BorderRadius.circular(16),
      ),
      child: child,
    );
  }
}

class _SectionHeader extends StatelessWidget {
  const _SectionHeader({required this.title, required this.trailing});

  final String title;
  final Widget trailing;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(title, style: AppTextStyles.subtitle),
        trailing,
      ],
    );
  }
}

class _Form extends StatelessWidget {
  const _Form({
    required this.titleController,
    required this.noteController,
    required this.onSubmit,
  });

  final TextEditingController titleController;
  final TextEditingController noteController;
  final VoidCallback onSubmit;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        _Field(
          label: 'Название',
          controller: titleController,
          hint: 'Например, купить билеты',
        ),
        const SizedBox(height: AppSpacing.sm),
        _Field(
          label: 'Заметка',
          controller: noteController,
          hint: 'Добавить детали',
        ),
        const SizedBox(height: AppSpacing.sm),
        SizedBox(
          width: double.infinity,
          child: ElevatedButton(
            onPressed: onSubmit,
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.accent,
              foregroundColor: const Color(0xFF0B0E17),
              padding: const EdgeInsets.symmetric(vertical: AppSpacing.sm),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
              textStyle: AppTextStyles.subtitle.copyWith(fontSize: 14),
            ),
            child: const Text('Добавить'),
          ),
        ),
      ],
    );
  }
}

class _Field extends StatelessWidget {
  const _Field({
    required this.label,
    required this.controller,
    required this.hint,
  });

  final String label;
  final TextEditingController controller;
  final String hint;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label.toUpperCase(),
          style: AppTextStyles.muted.copyWith(letterSpacing: 0.8),
        ),
        const SizedBox(height: AppSpacing.xs),
        TextField(
          controller: controller,
          style: AppTextStyles.body,
          decoration: InputDecoration(
            hintText: hint,
            hintStyle: AppTextStyles.muted,
            filled: true,
            fillColor: const Color(0x33000000),
            enabledBorder: OutlineInputBorder(
              borderSide: const BorderSide(color: AppColors.border),
              borderRadius: BorderRadius.circular(10),
            ),
            focusedBorder: OutlineInputBorder(
              borderSide: const BorderSide(color: AppColors.accent),
              borderRadius: BorderRadius.circular(10),
            ),
            contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
          ),
        ),
      ],
    );
  }
}
