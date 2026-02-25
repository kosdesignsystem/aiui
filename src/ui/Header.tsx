import { ReactNode } from "react";
import "./Header.scss";

export type HeaderProps = {
  title: ReactNode;
};

export function Header({ title }: HeaderProps) {
  return (
    <header className="ui-header">
      <h1 className="ui-header__title">{title}</h1>
    </header>
  );
}
