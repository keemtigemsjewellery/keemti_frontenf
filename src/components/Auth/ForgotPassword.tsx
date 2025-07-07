import { useNavigate } from "react-router-dom";

import { AUTH_ROUTE } from "../../utils/api/routes/clientRoute";

import loginRegister_bg from "../../assets/images/login-register.jpg";

const ForgotPassword = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="login-register-page">
        <div className="container-fluid p-0">
          <div className="row lr-row m-0">
            <div className="col-lg-6 p-0">
              <div
                className="lr-bg py-5"
                style={{ backgroundImage: "url(" + loginRegister_bg + ")" }}
              >
                <div className="lr-img-content">
                  <h5>
                    Keemti jewellery is absolutely stunning store. I am so happy
                    with my Bar O lace, edgy emerald rings.
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
                    className="back-page cursor-pointer"
                  >
                    <i className="fal fa-arrow-left"></i>
                  </a>
                  <div className="lr-title">
                    <h3>Forgot Password</h3>
                    <p>Lorem ipsume text</p>
                  </div>
                  <form className="login-register-form">
                    <div className="form-group col-md-12">
                      <input
                        type="email"
                        placeholder="Email"
                        className="form-control"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary primary-rounded-btn"
                    >
                      Send Reset Link{" "}
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

export default ForgotPassword;
