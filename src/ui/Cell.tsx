import { MouseEventHandler, ReactNode } from "react";
import "./Cell.scss";

export type CellProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export function Cell({ title, subtitle, leading, trailing, onClick }: CellProps) {
  return (
    <button type="button" className="ui-cell" onClick={onClick}>
      {leading && <div className="ui-cell__leading">{leading}</div>}
      <div className="ui-cell__content">
        <div className="ui-cell__title">{title}</div>
        {subtitle && <div className="ui-cell__subtitle">{subtitle}</div>}
      </div>
      {trailing && <div className="ui-cell__trailing">{trailing}</div>}
    </button>
  );
}
