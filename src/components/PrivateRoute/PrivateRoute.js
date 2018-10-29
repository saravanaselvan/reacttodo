import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({
  component: Component,
  authenticated,
  authPending,
  ...rest
}) {
  console.log('private route');
  if(authPending) return null;
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/about" />
        )
      }
    />
  );
}