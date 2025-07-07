import * as Yup from "yup";

export const mobileAuthValidationSchema = Yup.object<any>().shape({
  mobileNo: Yup.string()
    .required("Mobile number is required")
    .min(10, "Mobile number should be a minimum of 10 characters")
    .matches(
      /^[0-9]{1,10}$/,
      "Mobile number should be numeric and have a maximum length of 10 digits"
    ),
});

export const emailAuthValidationSchema = Yup.object<any>().shape({
  email: Yup.string()
    .email("Email address format is incorrect")
    .required("Email is required"),
});

export const mobileNoVerfiyOtpValidationSchema = Yup.object<any>().shape({
  mobileNo: Yup.string(),
  otp: Yup.string()
    .required("OTP is required")
    .matches(/^[0-9]{1,6}$/, "OTP should be numeric"),
});

export const emailVerfiyOtpValidationSchema = Yup.object<any>().shape({
  email: Yup.string(),
  otp: Yup.string()
    .required("OTP is required")
    .matches(/^[0-9]{1,6}$/, "OTP should be numeric"),
});

export const otpValidationSchema = Yup.object<any>().shape({
  otp: Yup.string()
    .required("OTP is required")
    .matches(/^[0-9]{1,6}$/, "OTP should be numeric"),
});
