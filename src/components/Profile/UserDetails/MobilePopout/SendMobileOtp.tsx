import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";
import { loginRegisterModel } from "utils/interface/auth";
import { mobileAuthValidationSchema } from "utils/validationSchema/auth";
import { authEnum } from "utils/enum/enum";
import { postSendOtpForProfileAPI } from "utils/api/service/authService";
import { useEffect } from "react";

interface SendMobileOtpModel {
  isVerifyOtpOpen: any;
  setIsVerifyOtpOpen: any;
  setMobileNumber: any;
  isPopupOpen: any;
}

const SendMobileOtp = ({
  isVerifyOtpOpen,
  setIsVerifyOtpOpen,
  setMobileNumber,
  isPopupOpen,
}: SendMobileOtpModel) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<loginRegisterModel>({
    resolver: yupResolver(mobileAuthValidationSchema),
  });

  useEffect(() => {
    reset();
  }, [isPopupOpen]);

  const onSubmit: SubmitHandler<loginRegisterModel> = async (
    data: loginRegisterModel
  ) => {
    const mobileSendOtpData = {
      mobileNo: data.mobileNo,
      channel: authEnum.SMS,
    };

    try {
      await postSendOtpForProfileAPI(mobileSendOtpData);

      setMobileNumber(data.mobileNo);
      setIsVerifyOtpOpen(true);
    } catch {
      console.log("Unable to login");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="contact-group form-group modal-btn-wrapper">
        <Controller
          name="mobileNo"
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <span className="input-group-text profile-details">
                <label>Mobile Number</label>
                <span>+91</span>
              </span>
              <input
                type="text"
                className="form-control pe-4"
                placeholder="Mobile number"
                disabled={isVerifyOtpOpen ?? false}
                value={value === null || value === undefined ? "" : value}
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
      </div>
      {!isVerifyOtpOpen && (
        <button className="primary-btn w-100" type="submit">
          SEND OTP
        </button>
      )}
    </form>
  );
};

export default SendMobileOtp;
