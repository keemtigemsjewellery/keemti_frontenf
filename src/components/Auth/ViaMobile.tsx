import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";

import { mobileAuthValidationSchema } from "utils/validationSchema/auth";
import { AUTH_ROUTE } from "utils/api/routes/clientRoute";
import { authEnum } from "utils/enum/enum";
// import { postLoginRegisterAPI } from "utils/api/service/authService";
import { loginRegisterModel } from "utils/interface/auth";

const ViaMobile = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<loginRegisterModel>({
    resolver: yupResolver(mobileAuthValidationSchema),
  });

  const onSubmit: SubmitHandler<loginRegisterModel> = async (
    data: loginRegisterModel
  ) => {
    const loginData = {
      mobileNo: data.mobileNo,
      channel: authEnum.SMS,
    };

    try {
      // await postLoginRegisterAPI(loginData);
      navigate(AUTH_ROUTE.VERIFY_OTP, {
        state: { value: data.mobileNo, authString: authEnum.MOBILE },
      });
    } catch {
      console.log("Unable to login");
    }
  };

  return (
    <form className="login-register-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="contact-group form-group col-md-12">
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
                className="form-control"
                placeholder="Mobile"
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
      <button type="submit" className="btn btn-primary primary-rounded-btn">
        Get OTP
      </button>
    </form>
  );
};

export default ViaMobile;
