import {
  LOGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from '../../constants/redux-types';
import { AuthActionTypes } from '../../interfaces/redux/actions/auth-action-types';
import {
  AuthState,
  AuthStatusState,
} from '../../interfaces/redux/states/auth-state';

const INITIAL_STATUS_STATE: AuthStatusState = {
  login: 'INITIAL',
  register: 'INITIAL',
};

const INITIAL_STATE: AuthState = {
  accessToken: '',
  email: '',
  status: INITIAL_STATUS_STATE,
};

const AuthReducer = (state = INITIAL_STATE, action: AuthActionTypes) => {
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

export default AuthReducer;
