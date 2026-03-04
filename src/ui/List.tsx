import { ReactNode } from "react";
import { Text } from "./Fonts";
import "./List.scss";

export type ListProps = {
  title?: ReactNode;
  children: ReactNode;
};

export function List({ title, children }: ListProps) {
  return (
    <section className="ui-list">
      {title ? (<header className="ui-list__header"><Text variant="medium-18">{title}</Text></header>) : null}
      <div className="ui-list__content">{children}</div>
    </section>
  );
}

export type ListContainerProps = {
  children: ReactNode;
};

export function ListContainer({ children }: ListContainerProps) {
  return <div className="ui-list-container">{children}</div>;
}
