import React from "react";
import { Route, Switch } from "react-router-dom";
import AwaitingChoices from "./pages/backoffice/awaitingChoices";
import Categories from "./pages/backoffice/categories";
import ChoicesList from "./pages/backoffice/choicesList";
import Users from "./pages/backoffice/users";

interface RouterBackofficeProps {}

const RouterBackoffice: React.FC<RouterBackofficeProps> = () => {
  return (
    <Switch>
      <Route
        exact
        path="/backoffice/awaitingchoices"
        component={AwaitingChoices}
      />
      <Route exact path="/backoffice/choiceslist" component={ChoicesList} />
      <Route exact path="/backoffice/categories" component={Categories} />
      <Route exact path="/backoffice/users" component={Users} />
    </Switch>
  );
};

export default RouterBackoffice;
