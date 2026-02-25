import { useMemo, useState } from "react";
import { App } from "../../../../ui/App";
import { Header } from "../../../../ui/Header";
import { View } from "../../../../ui/View";
import { Text } from "../../../../ui/Fonts";
import { Nav } from "../../../../ui/Nav";
import { Icon } from "../../../../ui/Icon";
import { ReminderComposer } from "../widgets/ReminderComposer";
import { ReminderList } from "../widgets/ReminderList";
import "../theme/tokens.scss";
import "./RemindersScreen.scss";

type Reminder = {
  id: number;
  title: string;
  completed: boolean;
};

const initialReminders: Reminder[] = [
  { id: 1, title: "Оплатить интернет", completed: false },
  { id: 2, title: "Позвонить маме", completed: false },
  { id: 3, title: "Подготовить документы к встрече", completed: true },
];

export default function RemindersScreen() {
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);

  const openCount = useMemo(
    () => reminders.filter((item) => !item.completed).length,
    [reminders],
  );

  const doneCount = reminders.length - openCount;

  const handleAdd = (title: string) => {
    setReminders((prev) => [
      { id: Date.now(), title, completed: false },
      ...prev,
    ]);
  };

  const handleToggle = (id: number) => {
    setReminders((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const handleDelete = (id: number) => {
    setReminders((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <App>
      <Header title="Напоминания" />

      <View>
        <section className="reminders-summary">
          <article className="reminders-summary__item">
            <Text variant="regular-14" color="secondary">
              Активные
            </Text>
            <Text variant="semiBold-24">{openCount}</Text>
          </article>

          <article className="reminders-summary__item">
            <Text variant="regular-14" color="secondary">
              Выполнено
            </Text>
            <Text variant="semiBold-24">{doneCount}</Text>
          </article>
        </section>

        <ReminderComposer onAdd={handleAdd} />
        <ReminderList
          reminders={reminders}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      </View>

      <Nav
        items={[
          {
            id: "reminders",
            label: <Text variant="regular-14">Задачи</Text>,
            icon: <Icon name="list-check" width={20} height={20} alt="" />,
            active: true,
          },
          {
            id: "calendar",
            label: <Text variant="regular-14">Сегодня</Text>,
            icon: <Icon name="calendar-today" width={20} height={20} alt="" />,
          },
          {
            id: "archive",
            label: <Text variant="regular-14">Архив</Text>,
            icon: <Icon name="archive-outline" width={20} height={20} alt="" />,
          },
        ]}
      />
    </App>
  );
}
