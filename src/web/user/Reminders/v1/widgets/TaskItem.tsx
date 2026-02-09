export type Task = {
  id: string;
  title: string;
  completed: boolean;
  note?: string;
};

type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
};

export default function TaskItem({ task, onToggle }: TaskItemProps) {
  return (
    <li className={`reminders-task ${task.completed ? "is-complete" : ""}`.trim()}>
      <button
        type="button"
        className="reminders-check"
        aria-pressed={task.completed}
        aria-label={task.completed ? "Снять выполнение" : "Отметить как выполненную"}
        onClick={() => onToggle(task.id)}
      >
        {task.completed ? "✓" : ""}
      </button>
      <div className="reminders-task-body">
        <span className="reminders-task-title">{task.title}</span>
        <span className="reminders-task-note">{task.note ?? "Без заметки"}</span>
      </div>
      <button
        type="button"
        className="reminders-task-action"
        onClick={() => onToggle(task.id)}
      >
        {task.completed ? "Вернуть" : "Выполнено"}
      </button>
    </li>
  );
}
