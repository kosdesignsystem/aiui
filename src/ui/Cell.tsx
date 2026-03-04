import { KeyboardEvent, ReactNode } from "react";
import "./Cell.scss";

export type CellProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  onClick?: () => void;
};

export function Cell({
  title,
  subtitle,
  leading,
  trailing,
  onClick,
}: CellProps) {
  const isInteractive = typeof onClick === "function";

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={`ui-cell-shell${isInteractive ? " is-interactive" : ""}`}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <div className="ui-cell">
        <div className="ui-cell__leading">{leading}</div>
        <div className="ui-cell__content">
          <div className="ui-cell__title">{title}</div>
          <div className="ui-cell__subtitle">{subtitle}</div>
        </div>
        <div className="ui-cell__trailing">{trailing}</div>
      </div>
    </div>
  );
}
