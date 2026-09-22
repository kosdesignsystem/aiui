import RouterViewContext from "./components/TransitionGroup";

import {
  BrowserRouter as Router,
} from "react-router";

export const RouterView = () => {
  return (
    <Router>
      <RouterViewContext />
    </Router>
  );
};
