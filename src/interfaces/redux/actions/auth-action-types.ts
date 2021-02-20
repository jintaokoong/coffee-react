import {
  LOGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from '../../../constants/redux-types';
import { LoginSuccessResponse } from '../../dto/auth';

export interface LoginAction {
  type: typeof LOGIN;
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: LoginSuccessResponse;
}

export interface LoginFailAction {
  type: typeof LOGIN_FAIL;
  error: any;
}

export interface RegisterAction {
  type: typeof REGISTER;
}

export interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
  payload: any;
}

export interface RegisterFailAction {
  type: typeof REGISTER_FAIL;
  error: any;
}

export interface LogoutAction {
  type: typeof LOGOUT;
}

export type AuthActionTypes =
  | LoginAction
  | LoginSuccessAction
  | LoginFailAction
  | RegisterAction
  | RegisterSuccessAction
  | RegisterFailAction
  | LogoutAction;
