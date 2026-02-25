import { ReactNode } from "react";
import { Text } from "./Fonts";
import "./List.scss";

export type ListProps = {
  title?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function List({ title, children, className }: ListProps) {
  const classes = ["ui-list", className ?? ""].filter(Boolean).join(" ");

  return (
    <section className={classes}>
      {title ? (<header className="ui-list__header"><Text variant="medium-18">{title}</Text></header>) : null}
      <div className="ui-list__content">{children}</div>
    </section>
  );
}

export type ListContainerProps = {
  children: ReactNode;
  className?: string;
};

export function ListContainer({ children, className }: ListContainerProps) {
  const classes = ["ui-list-container", className ?? ""].filter(Boolean).join(" ");
  return <div className={classes}>{children}</div>;
}
