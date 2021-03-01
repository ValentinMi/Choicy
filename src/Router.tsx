import React from "react";
import { Route, Switch } from "react-router-dom";
import BackOffice from "./pages/backoffice";
import Home from "./pages/home";

interface RouterProps {}

const Router: React.FC<RouterProps> = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/backoffice" component={BackOffice} />
    </Switch>
  );
};

export default Router;
