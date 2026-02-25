import { Text } from "../../../../ui/Fonts";
import { IconButton } from "../../../../ui/IconButton";
import { Icon } from "../../../../ui/Icon";
import "./ReminderList.scss";

type Reminder = {
  id: number;
  title: string;
  completed: boolean;
};

type ReminderListProps = {
  reminders: Reminder[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export function ReminderList({
  reminders,
  onToggle,
  onDelete,
}: ReminderListProps) {
  if (reminders.length === 0) {
    return (
      <div className="reminders-empty">
        <Text variant="regular-14" color="secondary">
          Список пуст. Добавьте первое напоминание.
        </Text>
      </div>
    );
  }

  return (
    <ul className="reminders-list">
      {reminders.map((item) => (
        <li className="reminders-item" key={item.id}>
          <button
            type="button"
            className={`reminders-item__toggle${item.completed ? " is-done" : ""}`}
            aria-label={
              item.completed
                ? `Отметить "${item.title}" как невыполненное`
                : `Отметить "${item.title}" как выполненное`
            }
            onClick={() => onToggle(item.id)}
          >
            {item.completed ? <Icon name="done" width={16} height={16} alt="" /> : null}
          </button>

          <Text
            as="span"
            variant="regular-16"
            className={`reminders-item__title${item.completed ? " is-done" : ""}`}
          >
            {item.title}
          </Text>

          <IconButton
            type="button"
            size={44}
            aria-label={`Удалить "${item.title}"`}
            onClick={() => onDelete(item.id)}
          >
            <Icon name="delete-outline" width={20} height={20} alt="" />
          </IconButton>
        </li>
      ))}
    </ul>
  );
}
