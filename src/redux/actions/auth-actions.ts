// action creators

import { Dispatch } from "redux"
import { LOGIN_SUCCESS, REGISTER_SUCCESS } from "../../constants/redux-types"

export const registerSuccess = (response: any) => {
  return {
    type: REGISTER_SUCCESS,
    payload: response,
  };
}

export const loginSuccess = (response: any) => {
  return {
    type: LOGIN_SUCCESS,
    payload: response,
  };
}