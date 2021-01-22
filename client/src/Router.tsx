import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/home";

interface RouterProps {}

const Router: React.FC<RouterProps> = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  );
};

export default Router;
