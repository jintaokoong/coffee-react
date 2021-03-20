import { Toolbar } from '@material-ui/core';
import { decode } from 'jsonwebtoken';
import React, { useContext, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { AppDrawer } from './components/app/drawer';
import { Navigation } from './components/headers/navigation';
import { PrivateRoute } from './components/routes/private-route';
import { SkipAuthRoute } from './components/routes/skip-auth-route';
import { DashboardPage } from './pages/dashboard';
import { HomePage } from './pages/home';
import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';
import authService from './services/auth-service';
import { AuthContext, LOGIN_SUCCESS } from './state/context/auth-context';


function App() {
  const [authState, authDispatch] = useContext(AuthContext);
  const history = useHistory();
  const loginStatus = authState.status.login;
  const accessToken = authState.accessToken;
  const authed = accessToken !== undefined && accessToken.length > 0;

  useEffect(() => {
    authService
      .refreshToken()
      .then((data) => {
        const { accessToken } = data;
        const payload: any = decode(accessToken);
        authDispatch({
          type: LOGIN_SUCCESS,
          payload: {
            accessToken: accessToken,
            email: payload['email'],
          },
        });
      })
      .catch((error) => {
        console.error('refresh token failed.');
        console.error(error);
      });
  }, [authDispatch]);

  useEffect(() => {
    if (history && loginStatus === 'SUCCESS') {
      console.log('triggered.');
      history.push('/dashboard');
    }
  }, [loginStatus, history]);

  return (
    <React.Fragment>
      <Navigation />
      <Toolbar />
      <AppDrawer />
      <div className={'content'}>
        <Switch>
          <Route exact path={'/'} component={HomePage} />
          <SkipAuthRoute
            authed={authed}
            path={'/login'}
            component={LoginPage}
          />
          <Route path={'/register'} component={RegisterPage} />
          <PrivateRoute
            authed={authed}
            path={'/dashboard'}
            component={DashboardPage}
          />
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;
