import { AxiosResponse } from 'axios';
import { ApiRefreshTokenSuccessResponse } from '../interfaces/api/auth';
import axios from './axios';

export const login = (payload: any) => {
  return axios.post('/auth/login', payload);
};

export const logout = () => {
  return axios.post('/auth/logout');
};

export const refreshToken = (): Promise<ApiRefreshTokenSuccessResponse> => {
  return axios
    .post('/auth/refresh_token')
    .then((res: AxiosResponse<ApiRefreshTokenSuccessResponse>) => res.data);
};

const authService = {
  login,
  logout,
  refreshToken,
};

export default authService;
