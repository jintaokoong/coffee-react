import React, { useMemo, useReducer } from 'react';
import { API_STATUS } from '../../constants/types';

export const LOGIN = 'login';
export const LOGIN_SUCCESS = 'login_success';
export const LOGIN_FAIL = 'login_fail';
export const LOGOUT = 'logout';
export const REGISTER = 'register';
export const REGISTER_SUCCESS = 'register_success';
export const REGISTER_FAIL = 'register_fail';

interface LoginAction {
  type: typeof LOGIN;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: {
    accessToken: string;
    email: string;
  };
}

interface LoginFailAction {
  type: typeof LOGIN_FAIL;
  error: any;
}

interface RegisterAction {
  type: typeof REGISTER;
}

interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
}

interface RegisterFailAction {
  type: typeof REGISTER_FAIL;
}

interface LogoutAction {
  type: typeof LOGOUT;
}

type AuthAction =
  | LoginAction
  | LoginSuccessAction
  | LoginFailAction
  | RegisterAction
  | RegisterSuccessAction
  | RegisterFailAction
  | LogoutAction;

interface AuthState {
  accessToken: string;
  email: string;
  status: {
    login: API_STATUS;
    register: API_STATUS;
  };
}

const INITIAL_STATE: AuthState = {
  accessToken: '',
  email: '',
  status: {
    login: 'INITIAL',
    register: 'INITIAL',
  },
};

const reducer = (state = INITIAL_STATE, action: AuthAction): AuthState => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        status: {
          ...state.status,
          login: 'PROCESSING',
        },
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        email: action.payload.email,
        status: {
          ...state.status,
          login: 'SUCCESS',
        },
      };
    case LOGIN_FAIL:
      return {
        ...state,
        status: {
          ...state.status,
          login: 'FAIL',
        },
      };
    case REGISTER:
      return {
        ...state,
        status: {
          ...state.status,
          register: 'PROCESSING',
        },
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        status: {
          ...state.status,
          register: 'SUCCESS',
        },
      };
    case REGISTER_FAIL:
      return {
        ...state,
        status: {
          ...state.status,
          register: 'FAIL',
        },
      };
    case LOGOUT:
      return {
        ...state,
        accessToken: '',
      };
    default:
      return state;
  }
};

export const AuthContext = React.createContext<
  [AuthState, React.Dispatch<any>]
>([INITIAL_STATE, () => null]);

export const AuthContextProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const values = useMemo<[AuthState, React.Dispatch<any>]>(
    () => [state, dispatch],
    [state, dispatch]
  );

  return (
    <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>
  );
};
