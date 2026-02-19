import { ReactNode } from "react";
import "./List.scss";

export type ListProps = {
  title?: ReactNode;
  children: ReactNode;
};

export function List({ title, children }: ListProps) {
  return (
    <section className="ui-list">
      {title && <h4 className="ui-list__title">{title}</h4>}
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
