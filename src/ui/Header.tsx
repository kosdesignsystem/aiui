import { ReactNode } from "react";
import "./Header.scss";

export type HeaderProps = {
  title: ReactNode;
  meta?: ReactNode;
};

export function Header({ title, meta }: HeaderProps) {
  return (
    <header className="ui-header">
      <h1 className="ui-header__title">{title}</h1>
      {meta ? <div className="ui-header__meta">{meta}</div> : null}
    </header>
  );
}
