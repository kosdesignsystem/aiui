import { ReactNode } from "react";
import "./View.scss";

export type ViewProps = {
  children: ReactNode;
};

export function View({ children }: ViewProps) {
  return <main className="ui-view">{children}</main>;
}
