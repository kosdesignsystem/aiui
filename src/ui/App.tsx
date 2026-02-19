import { ReactNode } from "react";
import "./App.scss";

export type AppProps = {
  children: ReactNode;
};

export function App({ children }: AppProps) {
  return <section className="ui-app">{children}</section>;
}
