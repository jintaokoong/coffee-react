import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

interface SkipAuthRouteProps extends RouteProps {
  // tslint:disable-next-line:no-any
  component: any;
  authed: boolean;
}

export const SkipAuthRoute = (props: SkipAuthRouteProps) => {
  const { component: Component, authed, ...rest } = props;

  return authed ? (
    <Redirect to={'/dashboard'} />
  ) : (
    <Route {...rest} component={Component} />
  );
};
