import {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
} from "react";
import { Icon } from "./Icon";
import "./SearchBar.scss";

export type SearchBarProps = {
  leftButton?: ReactNode;
  rightButton?: ReactNode;
  hideSearchIcon?: boolean;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  type?: "search" | "text";
  name?: string;
  autoComplete?: string;
  id?: string;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

export function SearchBar({
  leftButton,
  rightButton,
  hideSearchIcon = false,
  value,
  defaultValue,
  placeholder = "Поиск",
  type = "search",
  name,
  autoComplete,
  id,
  disabled = false,
  readOnly = false,
  onChange,
  onFocus,
  onBlur,
  onKeyDown,
  "aria-label": ariaLabelProp,
  "aria-labelledby": ariaLabelledBy,
}: SearchBarProps) {
  const ariaLabel = ariaLabelProp ?? (ariaLabelledBy ? undefined : "Поиск");

  return (
    <div className="ui-search-bar">
      {leftButton ? <div className="ui-search-bar__action">{leftButton}</div> : null}

      <label className="ui-search-bar__field">
        {!hideSearchIcon ? (
          <span className="ui-search-bar__icon" aria-hidden="true">
            <Icon
              name="search"
              width={24}
              height={24}
              alt=""
              aria-hidden="true"
            />
          </span>
        ) : null}
        <input
          className="ui-search-bar__input"
          type={type}
          id={id}
          name={name}
          autoComplete={autoComplete}
          disabled={disabled}
          readOnly={readOnly}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
        />
      </label>

      {rightButton ? <div className="ui-search-bar__action">{rightButton}</div> : null}
    </div>
  );
}

export type SearchBarButtonProps = {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  title?: string;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  "aria-label"?: string;
};

export function SearchBarButton({
  type = "button",
  disabled = false,
  title,
  children,
  onClick,
  "aria-label": ariaLabel,
}: SearchBarButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      title={title}
      onClick={onClick}
      aria-label={ariaLabel}
      className="ui-search-bar-button"
    >
      {children}
    </button>
  );
}
