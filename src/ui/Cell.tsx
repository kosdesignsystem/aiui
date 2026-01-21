import { ReactNode } from "react";

export type CellProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
};

export function Cell({ title, subtitle, leading, trailing }: CellProps) {
  return (
    <div className="ui-cell">
      {leading && <div className="ui-cell__leading">{leading}</div>}
      <div className="ui-cell__content">
        <div className="ui-cell__title">{title}</div>
        {subtitle && <div className="ui-cell__subtitle">{subtitle}</div>}
      </div>
      {trailing && <div className="ui-cell__trailing">{trailing}</div>}
    </div>
  );
}
