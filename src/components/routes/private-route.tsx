import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
  // tslint:disable-next-line:no-any
  component: any;
  authed: boolean;
}

export const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, authed, ...rest } = props;

  return authed ? (
    <Route {...rest} component={Component} />
  ) : (
    <Redirect to={'/login'} />
  );
};
