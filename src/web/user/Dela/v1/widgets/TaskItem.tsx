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
    <li className={`dela-task ${task.completed ? "is-complete" : ""}`.trim()}>
      <button
        type="button"
        className="dela-check"
        aria-pressed={task.completed}
        aria-label={task.completed ? "Вернуть в активные" : "Отметить как выполненную"}
        onClick={() => onToggle(task.id)}
      >
        {task.completed ? "✓" : ""}
      </button>
      <div className="dela-task-body">
        <span className="dela-task-title">{task.title}</span>
        <span className="dela-task-note">{task.note ?? "Без заметки"}</span>
      </div>
      <button type="button" className="dela-task-action" onClick={() => onToggle(task.id)}>
        {task.completed ? "Вернуть" : "Сделано"}
      </button>
    </li>
  );
}
