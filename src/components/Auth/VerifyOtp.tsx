import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Controller } from "react-hook-form";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  emailVerfiyOtpValidationSchema,
  mobileNoVerfiyOtpValidationSchema,
} from "utils/validationSchema/auth";
import { authEnum, localStorageEnum } from "utils/enum/enum";
import { setLocalStorageValue } from "utils/helper/helper";
import { loginRegisterModel } from "utils/interface/auth";
import { AUTH_ROUTE, ROUTE } from "utils/api/routes/clientRoute";
import {
  postResendOtpAPI,
  postVerifyOtpAPI,
} from "utils/api/service/authService";
import axiosInstance from "utils/api/axiosInstance";

import loginRegister_bg from "../../assets/images/login-register.jpg";

const VerifyOtp = () => {
  const { state } = useLocation();
  const { value, authString } = state;
  const navigate = useNavigate();

  const [formType, setFormType] = useState(authEnum.VERIFY);
  const [errroMessage, setErrorMessage] = useState("");

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<loginRegisterModel>({
    resolver: yupResolver(
      authString === authEnum.MOBILE
        ? mobileNoVerfiyOtpValidationSchema
        : emailVerfiyOtpValidationSchema
    ),
  });

  useEffect(() => {
    authString === authEnum.MOBILE
      ? setValue("mobileNo", value)
      : setValue("email", value);
  }, [setValue, value]);

  const onSubmit: SubmitHandler<loginRegisterModel> = async (
    data: loginRegisterModel
  ) => {
    const authData: loginRegisterModel = {
      channel: authString === authEnum.MOBILE ? authEnum.SMS : authEnum.EMAIL,
    };
    if (authString === authEnum.EMAIL) {
      authData.email = data.email;
    }
    if (authString === authEnum.MOBILE) {
      authData.mobileNo = data.mobileNo;
    }

    // Reset functionality
    if (formType === authEnum.RESET) {
      try {
        await postResendOtpAPI(authData);
      } catch {
        console.log("Unable to Verify otp");
      }
    }

    // Verify functionality
    if (formType === authEnum.VERIFY) {
      authData.otp = data.otp;

      try {
        const { data } = await postVerifyOtpAPI(authData);
        setLocalStorageValue(localStorageEnum.ACCESS_TOKEN, data.data.token);
        setLocalStorageValue(localStorageEnum.USER_ID, data.data.userId);
        window.open(ROUTE.DASHBOARD, "_self");
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.data.token}`;
      } catch (error: any) {
        setErrorMessage(
          error?.response?.data?.message || "Unable to Verify otp"
        );
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      }
    }
  };

  return (
    <div>
      <div className="login-register-page">
        <div className="container-fluid p-0">
          <div className="row lr-row m-0 flex-column-reverse flex-lg-row">
            <div className="col-lg-6 p-0">
              <div
                className="lr-bg py-5"
                style={{ backgroundImage: "url(" + loginRegister_bg + ")" }}
              >
                <div className="lr-img-content">
                  <h5>
                    Melorra jewellery is absolutely stunning store. I am so
                    happy with my Bar O lace, edgy emerald rings.
                  </h5>
                  <p>
                    Your gift will help us bring lifesaving medical care to
                    people in need
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 p-0 lr-right-outer">
              <div className="lr-right">
                <div className="login-register-box">
                  <a
                    onClick={() => navigate(AUTH_ROUTE.LOGIN)}
                    className="back-page cursor-pointer mt-2"
                  >
                    <i className="fal fa-arrow-left"></i>
                  </a>
                  <div className="lr-title">
                    <h3>Login/Register</h3>
                  </div>
                  <form
                    className="login-register-form"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="contact-group form-group col-md-12">
                      {authString === authEnum.MOBILE ? (
                        <>
                          <span className="input-group-text">
                            <label>Mobile Number</label>
                            <span>+91</span>
                          </span>
                          <Controller
                            name="mobileNo"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                              <>
                                <input
                                  type="text"
                                  className="form-control respendotp"
                                  placeholder="Mobile"
                                  disabled
                                  value={
                                    value === null || value === undefined
                                      ? ""
                                      : value
                                  }
                                  onChange={onChange}
                                />
                                {errors?.mobileNo !== undefined && (
                                  <p className="text-danger text-start mt-2">
                                    {errors?.mobileNo?.message as string}
                                  </p>
                                )}
                              </>
                            )}
                          />
                        </>
                      ) : (
                        <>
                          <label className="email-label">Email</label>
                          <Controller
                            name="email"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                              <>
                                <input
                                  type="text"
                                  className="form-control email respendotp"
                                  placeholder="Email"
                                  disabled
                                  value={
                                    value === null || value === undefined
                                      ? ""
                                      : value
                                  }
                                  onChange={onChange}
                                />
                                {errors?.email !== undefined && (
                                  <p className="text-danger text-start mt-2">
                                    {errors?.email?.message as string}
                                  </p>
                                )}
                              </>
                            )}
                          />
                        </>
                      )}
                    </div>

                    <div className="form-group otp-input mb-3">
                      <label>OTP</label>
                      <Controller
                        name="otp"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <>
                            <input
                              type="tel"
                              className="form-control"
                              placeholder="X X X X X X"
                              maxLength={6}
                              value={
                                value === null || value === undefined
                                  ? ""
                                  : value
                              }
                              onChange={onChange}
                            />
                            {errors?.otp !== undefined && (
                              <p className="text-danger text-center mt-2">
                                {errors?.otp?.message as string}
                              </p>
                            )}
                          </>
                        )}
                      />
                    </div>

                    {errroMessage !== "" && (
                      <p className="text-danger text-start mt-2">
                        {errroMessage}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="btn btn-primary mb-3 primary-rounded-btn"
                      onClick={() => setFormType(authEnum.VERIFY)}
                    >
                      Verify OTP
                    </button>
                    <button
                      className="resent-otp cursor-pointer btn btn-secondary secondary-btn w-100"
                      type="submit"
                      onClick={() => setFormType(authEnum.RESET)}
                    >
                      Resend OTP
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
