import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";

import { emailAuthValidationSchema } from "utils/validationSchema/auth";
import { AUTH_ROUTE } from "utils/api/routes/clientRoute";
import { authEnum } from "utils/enum/enum";
import { loginRegisterModel } from "utils/interface/auth";
import { postLoginRegisterAPI } from "utils/api/service/authService";

const ViaEmail = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<loginRegisterModel>({
    resolver: yupResolver(emailAuthValidationSchema),
  });

  const onSubmit: SubmitHandler<loginRegisterModel> = async (
    data: loginRegisterModel
  ) => {
    const loginData = {
      email: data.email,
      channel: authEnum.EMAIL,
    };

    try {
      await postLoginRegisterAPI(loginData);
      navigate(AUTH_ROUTE.VERIFY_OTP, {
        state: { value: data.email, authString: authEnum.EMAIL },
      });
    } catch {
      console.log("Unable to login");
    }
  };

  return (
    <form className="login-register-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="contact-group form-group col-md-12">
        <label className="email-label">Email</label>
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <input
                type="text"
                className="form-control email"
                placeholder="Email"
                value={value === null || value === undefined ? "" : value}
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
      </div>
      <button type="submit" className="btn btn-primary primary-rounded-btn">
        Get OTP
      </button>
    </form>
  );
};

export default ViaEmail;
