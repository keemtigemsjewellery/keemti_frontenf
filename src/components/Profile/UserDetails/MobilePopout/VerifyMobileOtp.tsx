import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";
import { loginRegisterModel } from "utils/interface/auth";
import { otpValidationSchema } from "utils/validationSchema/auth";
import { authEnum } from "utils/enum/enum";
import { updateVerifyOtpForProfileAPI } from "utils/api/service/authService";
import { getProfileDetailsAPI } from "utils/api/service/profileServices";
import { getUserDetailsAction } from "store/slices/profileSlice";
import { useDispatch } from "react-redux";

interface VerifyMobileOtpModel {
  mobileNumber: any;
  isPopupOpen: any;
}
const VerifyMobileOtp = ({
  mobileNumber,
  isPopupOpen,
}: VerifyMobileOtpModel) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<loginRegisterModel>({
    resolver: yupResolver(otpValidationSchema),
  });
  const dispatch = useDispatch();

  const [successMessage, setSuccessMessage] = useState(false);

  const onSubmit: SubmitHandler<loginRegisterModel> = async (
    data: loginRegisterModel
  ) => {
    const mobileVerifyOtpData = {
      mobileNo: mobileNumber,
      channel: authEnum.SMS,
      otp: data.otp,
    };

    try {
      await updateVerifyOtpForProfileAPI(mobileVerifyOtpData);
      setSuccessMessage(true);

      const { data } = await getProfileDetailsAPI();
      dispatch(getUserDetailsAction(data.data));

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
        We have sent OTP to your Phone Number
        <br />
        <span>{mobileNumber ?? ""}</span>
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
          Mobile Number updated successfully !!
        </p>
      )}
    </form>
  );
};

export default VerifyMobileOtp;
