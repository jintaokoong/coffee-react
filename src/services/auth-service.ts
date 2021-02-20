import { AxiosResponse } from 'axios';
import { ApiLoginSuccessResponse, ApiRefreshTokenSuccessResponse } from '../interfaces/api/auth';
import axios from './axios';


export const login = async (payload: any): Promise<AxiosResponse<ApiLoginSuccessResponse>> => {
  try {
    const response: AxiosResponse<ApiLoginSuccessResponse> = await axios.post('/auth/login', {
      email: payload.email,
      password: payload.password,
    });
    return response;
  } catch (e) {
    if (e.response !== undefined) {
      throw e;
    }

    throw e;
  }
}

export const refreshToken = async (): Promise<AxiosResponse<ApiRefreshTokenSuccessResponse>> => {
  try {
    const response: AxiosResponse<ApiRefreshTokenSuccessResponse> = await axios.post('/auth/refresh_token');
    return response;
  } catch (e) {
    throw e;
  }
}