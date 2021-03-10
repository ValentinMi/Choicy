import React, { useContext } from "react";
import { Redirect, Route, RouteProps, Switch } from "react-router-dom";
import { AuthContext } from "./context/auth.context";
import BackOffice from "./pages/backoffice";
import Home from "./pages/home";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Register from "./pages/register";

interface RouterProps {}

const Router: React.FC<RouterProps> = () => {
  const {
    state: { user },
    isLoading,
  } = useContext(AuthContext);
  return (
    <Switch>
      <Route exact path="/" component={Home} />

      {!isLoading && (
        <>
          <PrivateRoute
            exact
            path="/login"
            condition={user === null}
            component={Login}
            redirectPath="/"
          />
          <PrivateRoute
            path="/register"
            condition={user === null}
            component={Register}
            redirectPath="/"
          />
          <PrivateRoute
            exact
            path="/profile"
            condition={user != null}
            component={Profile}
            redirectPath="/login"
          />
          <PrivateRoute
            path="/backoffice"
            condition={user?.isAdmin === true}
            component={BackOffice}
            redirectPath="/login"
          />
        </>
      )}
    </Switch>
  );
};

const PrivateRoute: React.FC<
  RouteProps & {
    component: React.FC;
    condition: boolean;
    redirectPath?: string;
  }
> = ({ component: Component, condition, redirectPath, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        condition ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: redirectPath || "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default Router;
