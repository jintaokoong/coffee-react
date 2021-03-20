import React, { useCallback, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext, LOGOUT } from '../../state/context/auth-context';
import authService from '../../services/auth-service';
import * as H from 'history';
import Routes from '../../constants/routes';
import { AppBar, Button, IconButton, ListItemIcon, ListItemText, makeStyles, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToApp from '@material-ui/icons/ExitToApp';

const useRouting = (): [H.History<unknown>, (route: string) => (e: any) => void] => {
  const history = useHistory();
  const onLinkClick = useCallback((route: string) => (e: any) => {
    history.push(route);
  }, [history]);
  return [history, onLinkClick];
}

const ProfileButton: React.FC = () => {
  const [authState, authDispatch] = useContext(AuthContext);
  const { accessToken } = authState;
  const isLoggedIn = accessToken.length > 0;
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
      .catch((err) => console.error(err))
      .then(() => {
        setAnchorEl(null);
      });
  }, [history]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return isLoggedIn ? <React.Fragment><IconButton edge={'end'} onClick={handleMenu} color={'inherit'}>
      <AccountCircle/>
    </IconButton> 
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      getContentAnchorEl={null}
      open={open}
      onClose={handleClose}
    >
      <MenuItem disabled>Signed in as {authState.email}</MenuItem>
      <MenuItem onClick={onLogoutHandler}>
        <ListItemIcon>
          <ExitToApp/>
        </ListItemIcon>
        <ListItemText>Logout</ListItemText>
      </MenuItem>
    </Menu>
  </React.Fragment>
  
  : null;
}

const LoginButton: React.FC = () => {
  const [authState,] = useContext(AuthContext);
  const { accessToken } = authState;
  const isLoggedIn = accessToken.length > 0;
  const [, onLinkClick] = useRouting();

  return isLoggedIn 
    ? null 
    : <Button color="inherit" 
        onClick={onLinkClick(Routes.login)}>
          Login
      </Button>;
}


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const Navigation = () => {
  const classes = useStyles();
  return <AppBar position={'fixed'}>
    <Toolbar>
      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" className={classes.title}>
        Coffee
      </Typography>
      <LoginButton />
      <ProfileButton />
    </Toolbar>
  </AppBar>
}
