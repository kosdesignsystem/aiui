import { ReactNode } from "react";
import "./IconGrid.scss";

type IconGridProps = {
  variant: "icon" | "app-icon";
  pathLabel: string;
  names: string[];
  renderIcon: (name: string) => ReactNode;
};

export function IconGrid({ variant, pathLabel, names, renderIcon }: IconGridProps) {
  return (
    <section className={`icon-grid-screen icon-grid-screen--${variant}`}>
      <p className="icon-grid-path">{pathLabel}</p>
      <p className="icon-grid-count">Всего: {names.length}</p>

      <ul className="icon-grid-list">
        {names.map((name) => (
          <li key={name} className="icon-grid-item">
            <span className="icon-grid-icon">{renderIcon(name)}</span>
            <span className="icon-grid-name">{name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
