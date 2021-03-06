import { AxiosResponse } from 'axios';
import { ApiRefreshTokenSuccessResponse } from '../interfaces/api/auth';
import axios from './axios';

export const newLogin = (payload: any) => {
  return axios.post('/auth/login', payload);
};

export const logout = () => {
  return axios.post('/auth/logout');
};

export const refreshToken = async (): Promise<
  AxiosResponse<ApiRefreshTokenSuccessResponse>
> => {
  try {
    const response: AxiosResponse<ApiRefreshTokenSuccessResponse> = await axios.post(
      '/auth/refresh_token'
    );
    return response;
  } catch (e) {
    throw e;
  }
};
