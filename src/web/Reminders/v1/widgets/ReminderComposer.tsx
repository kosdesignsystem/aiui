import { FormEvent, useState } from "react";
import { Button } from "../../../../ui/Button";
import "./ReminderComposer.scss";

type ReminderComposerProps = {
  onAdd: (title: string) => void;
};

export function ReminderComposer({ onAdd }: ReminderComposerProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextValue = value.trim();

    if (!nextValue) {
      return;
    }

    onAdd(nextValue);
    setValue("");
  };

  return (
    <form className="reminders-composer" onSubmit={handleSubmit}>
      <input
        className="reminders-composer__input"
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Добавить напоминание"
        aria-label="Новое напоминание"
      />
      <Button type="submit" variant="primary" size={44} disabled={!value.trim()}>
        Добавить
      </Button>
    </form>
  );
}
