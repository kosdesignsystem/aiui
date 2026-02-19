import { useMemo, useState, type FormEvent } from "react";
import TaskItem, { type Task } from "../widgets/TaskItem";
import "./Home.scss";

const initialTasks: Task[] = [
  {
    id: "task-1",
    title: "Подготовить план на неделю",
    note: "Сфокусироваться на 3 главных задачах",
    completed: false,
  },
  {
    id: "task-2",
    title: "Разобрать почту",
    note: "Ответить на важные письма",
    completed: false,
  },
  {
    id: "task-3",
    title: "Оплатить интернет",
    note: "До конца дня",
    completed: true,
  },
];

export default function DelaHome() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

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
    <section className="screen dela">
      <header className="dela-hero">
        <div>
          <h2>Дела · v1</h2>
          <p className="dela-path">user / Dela / v1 / Home</p>
        </div>
        <div className="dela-stats">
          <div className="dela-stats-card">
            <span>К выполнению</span>
            <strong>{activeTasks.length}</strong>
          </div>
          <div className="dela-stats-card">
            <span>Готово</span>
            <strong>{completedTasks.length}</strong>
          </div>
        </div>
      </header>

      <div className="dela-panel">
        <h3>Новая задача</h3>
        <form className="dela-form" onSubmit={handleSubmit}>
          <label>
            Название
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Например, написать резюме встречи"
            />
          </label>
          <label>
            Заметка
            <input
              type="text"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Детали задачи"
            />
          </label>
          <button type="submit">Добавить дело</button>
        </form>

        <div className="dela-sections">
          <section>
            <div className="dela-section-head">
              <h3>Активные задачи</h3>
              <span>{activeTasks.length} шт.</span>
            </div>
            {activeTasks.length === 0 ? (
              <p className="dela-empty">Активных задач нет.</p>
            ) : (
              <ul className="dela-list">
                {activeTasks.map((task) => (
                  <TaskItem key={task.id} task={task} onToggle={handleToggle} />
                ))}
              </ul>
            )}
          </section>

          <section>
            <div className="dela-section-head">
              <h3>Выполненные</h3>
              <span>{completedTasks.length} шт.</span>
            </div>
            {completedTasks.length === 0 ? (
              <p className="dela-empty">Пока нет выполненных задач.</p>
            ) : (
              <ul className="dela-list">
                {completedTasks.map((task) => (
                  <TaskItem key={task.id} task={task} onToggle={handleToggle} />
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </section>
  );
}
