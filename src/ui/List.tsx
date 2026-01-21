import { ReactNode } from "react";

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
