import React, { useCallback, useContext } from 'react';
import {
  Button,
  Classes,
  Menu,
  MenuDivider,
  MenuItem,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading
} from '@blueprintjs/core';
import { Popover2 } from '@blueprintjs/popover2';
import { useHistory } from 'react-router-dom';
import { AuthContext, LOGOUT } from '../../state/context/auth-context';
import authService from '../../services/auth-service';
import * as H from 'history';
import Routes from '../../constants/routes';

const useRouting = (): [H.History<unknown>, (route: string) => (e: any) => void] => {
  const history = useHistory();
  const onLinkClick = useCallback((route: string) => (e: any) => {
    history.push(route);
  }, [history]);
  return [history, onLinkClick];
}

const SignedInMenu = () => {
  const [authState, authDispatch] = useContext(AuthContext);
  const history = useHistory();
  const { email } = authState;

  const onLogoutHandler = useCallback((e: any) => {
    authService
      .logout()
      .then(() => {
        authDispatch({
          type: LOGOUT,
        });
        history.push(Routes.home);
      })
      .catch((err) => console.error(err));
  }, [history]);

  return (
    <Menu>
      <MenuItem shouldDismissPopover={false} text={`Signed in as ${email}`} />
      <MenuDivider />
      <MenuItem text={'Profile'} />
      <MenuItem icon={'log-out'} text={'Sign Out'} onClick={onLogoutHandler} />
    </Menu>
  );
};

const ProfileButton: React.FC = () => {
  const [authState,] = useContext(AuthContext);
  const { accessToken } = authState;
  const isLoggedIn = accessToken.length > 0;

  return isLoggedIn ? <Popover2 placement={'bottom-end'} content={<SignedInMenu />}>
    <Button className={Classes.MINIMAL} icon={'person'} />
  </Popover2> : null;
}

const LoginButton: React.FC = () => {
  const [authState,] = useContext(AuthContext);
  const { accessToken } = authState;
  const isLoggedIn = accessToken.length > 0;
  const [, onLinkClick] = useRouting();

  return isLoggedIn ? null : <Button
    className={Classes.MINIMAL}
    text={'Login'}
    onClick={onLinkClick(Routes.login)}
  />
}

export const Navigation = () => {
  const [, onLinkClick] = useRouting();

  return <Navbar>
    <NavbarGroup>
      <NavbarHeading>Blueprint</NavbarHeading>
      <NavbarDivider />
      <Button
        className={Classes.MINIMAL}
        icon="home"
        text="Home"
        onClick={onLinkClick('/')}
      />
      <Button
        className={Classes.MINIMAL}
        icon="document"
        text="Dashboard"
        onClick={onLinkClick(Routes.dashboard)}
      />
    </NavbarGroup>
    <NavbarGroup align={'right'}>
      <LoginButton />
      <ProfileButton />
    </NavbarGroup>
  </Navbar>;
}
