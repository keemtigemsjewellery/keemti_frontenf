import { useState } from "react";

import { authEnum } from "utils/enum/enum";
import ViaMobile from "./ViaMobile";
import ViaGoogle from "./ViaGoogle";
import ViaFacebook from "./ViaFacebook";

import loginRegister_bg from "../../assets/images/login-register.jpg";
import email from "../../assets/images/icons/email.svg";
import phone from "../../assets/images/icons/phone-icon.svg";

import ViaEmail from "./ViaEmail";

const LoginRegister = () => {
  const [authString, setAuthString] = useState(authEnum.MOBILE);

  return (
    <>
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
                  <div className="lr-title">
                    <h3>Login/Register</h3>
                  </div>

                  {authString === authEnum.MOBILE && <ViaMobile />}
                  {authString === authEnum.EMAIL && <ViaEmail />}

                  {/* <a
                    className="forget-pass"
                    title="Forgot Password?"
                  >
                    Forgot Password?
                  </a> */}

                  <div className="sign-with-other mt-4">
                    <div className="title my-4">
                      <span className="or">Or sign in with</span>
                    </div>
                    <div className="other-login">
                      {authString === authEnum.EMAIL && (
                        <a
                          className="cursor-pointer"
                          title="Login With Email"
                          onClick={() => setAuthString(authEnum.MOBILE)}
                        >
                          <img src={phone} alt="Login With Mobile" />
                          Login With Mobile
                        </a>
                      )}
                      {authString === authEnum.MOBILE && (
                        <a
                          className="cursor-pointer"
                          title="Login With Email"
                          onClick={() => setAuthString(authEnum.EMAIL)}
                        >
                          <img src={email} alt="Login With Email" />
                          Login With Email
                        </a>
                      )}

                      <ViaGoogle />
                      <ViaFacebook />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginRegister;
