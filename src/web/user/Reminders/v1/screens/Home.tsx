import { useMemo, useState, type FormEvent } from "react";
import TaskItem, { type Task } from "../widgets/TaskItem";
import "../theme/reminders.scss";

const initialTasks: Task[] = [
  {
    id: "task-1",
    title: "Собрать список покупок",
    note: "Молоко, хлеб, овощи",
    completed: false,
  },
  {
    id: "task-2",
    title: "Позвонить стоматологу",
    note: "Записаться на следующую неделю",
    completed: false,
  },
  {
    id: "task-3",
    title: "Отправить отчёт",
    note: "Финальный драфт",
    completed: true,
  },
];

export default function RemindersHome() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [showCompleted, setShowCompleted] = useState(true);

  const activeTasks = useMemo(() => tasks.filter((task) => !task.completed), [tasks]);
  const completedTasks = useMemo(() => tasks.filter((task) => task.completed), [tasks]);

  const handleToggle = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: trimmedTitle,
      note: note.trim() || undefined,
      completed: false,
    };

    setTasks((prev) => [newTask, ...prev]);
    setTitle("");
    setNote("");
  };

  return (
    <section className="screen reminders">
      <header className="reminders-hero">
        <div>
          <h2>Напоминания · v1</h2>
          <p className="reminders-path">user / Reminders / v1 / Home</p>
        </div>
        <div className="reminders-stats">
          <div>
            <span>Активные</span>
            <strong>{activeTasks.length}</strong>
          </div>
          <div>
            <span>Выполненные</span>
            <strong>{completedTasks.length}</strong>
          </div>
        </div>
      </header>

      <div className="reminders-grid">
        <div className="reminders-panel">
          <h3>Новая задача</h3>
          <form className="reminders-form" onSubmit={handleSubmit}>
            <label>
              Название
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Например, купить билеты"
              />
            </label>
            <label>
              Заметка
              <input
                type="text"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Добавить детали"
              />
            </label>
            <button type="submit">Добавить</button>
          </form>

          <div className="reminders-section">
            <div className="reminders-section-head">
              <h3>Активные задачи</h3>
              <span>{activeTasks.length} шт.</span>
            </div>
            {activeTasks.length === 0 ? (
              <p className="reminders-empty">Все задачи выполнены.</p>
            ) : (
              <ul className="reminders-list">
                {activeTasks.map((task) => (
                  <TaskItem key={task.id} task={task} onToggle={handleToggle} />
                ))}
              </ul>
            )}
          </div>
        </div>

        <aside className="reminders-panel reminders-panel-secondary">
          <div className="reminders-section-head">
            <h3>Выполненные</h3>
            <button
              type="button"
              className="reminders-toggle"
              onClick={() => setShowCompleted((prev) => !prev)}
            >
              {showCompleted ? "Скрыть" : "Показать"}
            </button>
          </div>
          {completedTasks.length === 0 ? (
            <p className="reminders-empty">Пока нет выполненных задач.</p>
          ) : showCompleted ? (
            <ul className="reminders-list">
              {completedTasks.map((task) => (
                <TaskItem key={task.id} task={task} onToggle={handleToggle} />
              ))}
            </ul>
          ) : (
            <p className="reminders-empty">Список скрыт.</p>
          )}
        </aside>
      </div>
    </section>
  );
}
