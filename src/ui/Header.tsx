import { ReactNode } from "react";
import { Button, ButtonProps } from "./Button";
import "./Header.scss";

export type HeaderButtonProps = Omit<ButtonProps, "children"> & {
  label: ReactNode;
};

export type HeaderProps = {
  title: ReactNode;
  button?: HeaderButtonProps;
};

export function Header({ title, button }: HeaderProps) {
  return (
    <header className="ui-header">
      <div className="ui-header__main">
        <h1 className="ui-header__title">{title}</h1>
        {button ? (
          <div className="ui-header__button">
            <Button
              variant={button.variant}
              size={button.size}
              type={button.type}
              disabled={button.disabled}
              title={button.title}
              onClick={button.onClick}
              onKeyDown={button.onKeyDown}
              aria-label={button["aria-label"]}
            >
              {button.label}
            </Button>
          </div>
        ) : null}
      </div>
    </header>
  );
}
