import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";
import { loginRegisterModel } from "utils/interface/auth";
import { emailAuthValidationSchema } from "utils/validationSchema/auth";
import { authEnum } from "utils/enum/enum";
import { postSendOtpForProfileAPI } from "utils/api/service/authService";
import { useEffect } from "react";

interface SendEmailOtpModel {
  isVerifyOtpOpen: any;
  setIsVerifyOtpOpen: any;
  setEmailId: any;
  isPopupOpen: any;
}

const SendEmailOtp = ({
  isVerifyOtpOpen,
  setIsVerifyOtpOpen,
  setEmailId,
  isPopupOpen,
}: SendEmailOtpModel) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<loginRegisterModel>({
    resolver: yupResolver(emailAuthValidationSchema),
  });

  const onSubmit: SubmitHandler<loginRegisterModel> = async (
    data: loginRegisterModel
  ) => {
    const emailSendOtpData = {
      email: data.email,
      channel: authEnum.EMAIL,
    };

    try {
      await postSendOtpForProfileAPI(emailSendOtpData);

      setEmailId(data.email);
      setIsVerifyOtpOpen(true);
    } catch {
      console.log("Unable to login");
    }
  };

  useEffect(() => {
    reset();
  }, [isPopupOpen]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group modal-btn-wrapper">
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <div className="form-group mb-4">
                <label>Email Address</label>
                <input
                  className="form-control pe-4"
                  type="email"
                  placeholder="Email Address"
                  value={value === null || value === undefined ? "" : value}
                  onChange={onChange}
                  disabled={isVerifyOtpOpen ?? false}
                />
                {errors?.email !== undefined && (
                  <p className="text-danger text-start mt-2">
                    {errors?.email?.message as string}
                  </p>
                )}
              </div>
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

export default SendEmailOtp;
