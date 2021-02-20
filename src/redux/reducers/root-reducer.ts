import { combineReducers } from "@reduxjs/toolkit"
import AuthReducer from './auth-reducer';

const rootReducer = (state: any, action: any) => {
  return combineReducers({
    auth: AuthReducer,
  })(state, action);
}

export default rootReducer;