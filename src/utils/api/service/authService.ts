import axiosInstance from "../axiosInstance";
import { AUTH_SERVER_ROUTE } from "../routes/serverRoute";
import { loginRegisterModel } from "utils/interface/auth";

// /user/loginRegister
export const postLoginRegisterAPI = (data: loginRegisterModel) => {
  return axiosInstance.post(`${AUTH_SERVER_ROUTE.LOGIN_REGISTER}`, data);
};

// /user/resendOtp
export const postResendOtpAPI = (data: loginRegisterModel) => {
  return axiosInstance.post(`${AUTH_SERVER_ROUTE.RESEND_OTP}`, data);
};

// /user/otpVerification
export const postVerifyOtpAPI = (data: loginRegisterModel) => {
  return axiosInstance.post(`${AUTH_SERVER_ROUTE.VERIFY_OTP}`, data);
};

// /user/updateMobileNumber
export const postUpdateMobileNumberAPI = (data: loginRegisterModel) => {
  return axiosInstance.post(`${AUTH_SERVER_ROUTE.UPDATE_MOBILE_NO}`, data);
};

// /user/sendOtpForUpdateMobileOrEmail
export const postSendOtpForProfileAPI = (data: loginRegisterModel) => {
  return axiosInstance.post(`${AUTH_SERVER_ROUTE.SEND_OTP}`, data);
};

// /user/verifyOtpForUpdateMobileOrEmail
export const updateVerifyOtpForProfileAPI = (data: loginRegisterModel) => {
  return axiosInstance.put(`${AUTH_SERVER_ROUTE.UPDATE_VERIFY_OTP}`, data);
};

// /user/socialLogin
export const socialLoginAPI = (data: any) => {
  return axiosInstance.post(`${AUTH_SERVER_ROUTE.SOCIAL_LOGIN}`, data);
};
