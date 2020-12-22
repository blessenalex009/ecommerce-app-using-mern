import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAutheticated } from "./index";

//component bcoz only one component will be injected otherwise children can load many
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAutheticated() ? ( 
          <Component {...props} />
        ) : ( 
          <Redirect 
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
