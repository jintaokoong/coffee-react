import { API_STATUS } from '../../../constants/types';

export interface AuthStatusState {
  login: API_STATUS;
  register: API_STATUS;
}

export interface AuthState {
  accessToken: string;
  email: string;
  status: AuthStatusState;
}
