import { AxiosResponse } from "axios";
import { ApiLoginSuccessResponse } from "../interfaces/api/auth";
import { LoginSuccessResponse } from "../interfaces/dto/auth";

export const transformLoginResponse = (from: AxiosResponse<ApiLoginSuccessResponse>): LoginSuccessResponse => {
  return {
    accessToken: from.data.accessToken,
  };
}