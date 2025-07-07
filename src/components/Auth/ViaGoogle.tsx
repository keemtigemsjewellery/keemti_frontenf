import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleIcon from "../../assets/images/icons/google.svg";
import { socialLoginAPI } from "utils/api/service/authService";
import axiosInstance from "utils/api/axiosInstance";
import { ROUTE } from "utils/api/routes/clientRoute";
import { localStorageEnum } from "utils/enum/enum";
import { setLocalStorageValue } from "utils/helper/helper";

const ViaGoogle = () => {
  const url = `https://www.googleapis.com/oauth2/v3/userinfo`;

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      try {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });

        const params = {
          email: res?.data?.email,
          fullName: res?.data?.name,
          loginType: "gmail",
        };

        const { data } = await socialLoginAPI(params);
        setLocalStorageValue(localStorageEnum.ACCESS_TOKEN, data.data.token);
        setLocalStorageValue(localStorageEnum.USER_ID, data.data.userId);
        window.open(ROUTE.DASHBOARD, "_self");
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.data.token}`;
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="google-sso">
      <button className="btn-secondary" onClick={() => login()}>
        <img  src={GoogleIcon} alt="google-icon" />
        Sign in with Google
      </button>
    </div>
  );
};

export default ViaGoogle;
