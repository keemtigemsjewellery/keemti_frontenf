import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";
import { loginRegisterModel } from "utils/interface/auth";
import { otpValidationSchema } from "utils/validationSchema/auth";
import { updateVerifyOtpForProfileAPI } from "utils/api/service/authService";
import { authEnum } from "utils/enum/enum";
import { getUserDetailsAction } from "store/slices/profileSlice";
import { getProfileDetailsAPI } from "utils/api/service/profileServices";
import { useDispatch } from "react-redux";

interface VerifyEmailOtpModel {
  emailId: any;
  isPopupOpen: any;
}
const VerifyEmailOtp = ({ emailId, isPopupOpen }: VerifyEmailOtpModel) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<loginRegisterModel>({
    resolver: yupResolver(otpValidationSchema),
  });

  const [successMessage, setSuccessMessage] = useState(false);
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<loginRegisterModel> = async (
    data: loginRegisterModel
  ) => {
    const emailVerifyOtpData = {
      email: emailId,
      channel: authEnum.EMAIL,
      otp: data.otp,
    };

    try {
      await updateVerifyOtpForProfileAPI(emailVerifyOtpData);

      const { data } = await getProfileDetailsAPI();
      dispatch(getUserDetailsAction(data.data));

      setSuccessMessage(true);
      setTimeout(() => {
        setSuccessMessage(false);
      }, 2000);
    } catch {
      console.log("Unable to login");
    }
  };

  useEffect(() => {
    reset();
  }, [isPopupOpen]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="text-center">
        We have sent OTP to your Email
        <br />
        <span>{emailId ?? ""}</span>
      </p>
      <div className="form-group otp-input mt-4 mb-4 mb-0">
        <label>OTP</label>

        <Controller
          name="otp"
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <label>OTP</label>
              <input
                type="tel"
                className="form-control"
                placeholder="XXXXXX"
                maxLength={6}
                value={value === null || value === undefined ? "" : value}
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
      <button className="primary-btn w-100" type="submit">
        VERIFY OTP
      </button>
      {successMessage && (
        <p className="success-message mt-3 mb-0">
          Email updated successfully !!
        </p>
      )}
    </form>
  );
};

export default VerifyEmailOtp;
