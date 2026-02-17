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

  List<Task> tasks = [
    Task(
      id: 'task-1',
      title: 'Подготовить план на неделю',
      note: 'Сфокусироваться на 3 главных задачах',
    ),
    Task(
      id: 'task-2',
      title: 'Разобрать почту',
      note: 'Ответить на важные письма',
    ),
    Task(
      id: 'task-3',
      title: 'Оплатить интернет',
      note: 'До конца дня',
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
          .map(
            (task) => task.id == id
                ? task.copyWith(completed: !task.completed)
                : task,
          )
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
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(AppSpacing.md),
              decoration: BoxDecoration(
                color: const Color(0x14FFFFFF),
                borderRadius: BorderRadius.circular(16),
              ),
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
                    Text('Активных задач нет.', style: AppTextStyles.muted)
                  else
                    Column(
                      children: activeTasks
                          .map(
                            (task) => Padding(
                              padding: const EdgeInsets.only(
                                bottom: AppSpacing.sm,
                              ),
                              child: TaskItem(
                                task: task,
                                onToggle: _toggleTask,
                              ),
                            ),
                          )
                          .toList(),
                    ),
                  const SizedBox(height: AppSpacing.lg),
                  _SectionHeader(
                    title: 'Выполненные',
                    trailing: Text(
                      '${completedTasks.length} шт.',
                      style: AppTextStyles.muted,
                    ),
                  ),
                  const SizedBox(height: AppSpacing.sm),
                  if (completedTasks.isEmpty)
                    Text(
                      'Пока нет выполненных задач.',
                      style: AppTextStyles.muted,
                    )
                  else
                    Column(
                      children: completedTasks
                          .map(
                            (task) => Padding(
                              padding: const EdgeInsets.only(
                                bottom: AppSpacing.sm,
                              ),
                              child: TaskItem(
                                task: task,
                                onToggle: _toggleTask,
                              ),
                            ),
                          )
                          .toList(),
                    ),
                ],
              ),
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
          colors: [Color(0x3D65E6AD), Color(0x0AFFFFFF)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Дела · v1', style: AppTextStyles.heading),
          const SizedBox(height: AppSpacing.xs),
          Text('user / Dela / v1 / Home', style: AppTextStyles.muted),
          const SizedBox(height: AppSpacing.md),
          Row(
            children: [
              Expanded(
                child: _StatCard(label: 'К выполнению', value: activeCount),
              ),
              const SizedBox(width: AppSpacing.sm),
              Expanded(
                child: _StatCard(label: 'Готово', value: completedCount),
              ),
            ],
          ),
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
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.md,
        vertical: AppSpacing.sm,
      ),
      decoration: BoxDecoration(
        color: const Color(0x18FFFFFF),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
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
          hint: 'Например, написать резюме встречи',
        ),
        const SizedBox(height: AppSpacing.sm),
        _Field(
          label: 'Заметка',
          controller: noteController,
          hint: 'Детали задачи',
        ),
        const SizedBox(height: AppSpacing.sm),
        SizedBox(
          width: double.infinity,
          child: ElevatedButton(
            onPressed: onSubmit,
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.buttonPrimary,
              foregroundColor: Colors.white,
              padding: const EdgeInsets.symmetric(vertical: AppSpacing.sm),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10),
              ),
              textStyle: AppTextStyles.subtitle.copyWith(fontSize: 14),
            ),
            child: const Text('Добавить дело'),
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
            contentPadding: const EdgeInsets.symmetric(
              horizontal: 12,
              vertical: 10,
            ),
          ),
        ),
      ],
    );
  }
}
