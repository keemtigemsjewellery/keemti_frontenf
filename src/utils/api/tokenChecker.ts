import { localStorageEnum } from "utils/enum/enum";
import { getLocalStorageValue } from "utils/helper/helper";
import jwt_decode, { JwtPayload } from "jwt-decode";
import axiosInstance from "./axiosInstance";

export const decodeJwtToken = (): JwtPayload | null => {
  const token = getLocalStorageValue(localStorageEnum.ACCESS_TOKEN);
  if (token) {
    return jwt_decode<JwtPayload>(token);
  }
  return null;
};

export const isTokenExpired = () => {
  const decoded = decodeJwtToken();
  const accessToken = getLocalStorageValue(localStorageEnum.ACCESS_TOKEN);

  if (decoded && decoded.exp && decoded.exp * 1000 < new Date().getTime()) {
    return true;
  } else {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${accessToken}`;
    return false;
  }
};
