import FacebookLogin from "react-facebook-login";
import axiosInstance from "utils/api/axiosInstance";
import { ROUTE } from "utils/api/routes/clientRoute";
import { socialLoginAPI } from "utils/api/service/authService";
import { localStorageEnum } from "utils/enum/enum";
import { setLocalStorageValue } from "utils/helper/helper";

const ViaFacebook = () => {
  const responseFacebook = async (response: any) => {
    console.log(response);

    // const params = {
    //   email: response?.data?.email,
    //   fullName: response?.data?.name,
    //   loginType: "gmail",
    // };

    // const { data } = await socialLoginAPI(params);
    // setLocalStorageValue(localStorageEnum.ACCESS_TOKEN, data.data.token);
    // setLocalStorageValue(localStorageEnum.USER_ID, data.data.userId);
    // window.open(ROUTE.DASHBOARD, "_self");
    // axiosInstance.defaults.headers.common[
    //   "Authorization"
    // ] = `Bearer ${data.data.token}`;
  };

  return (
    <div className="facebook-sso">
      <FacebookLogin
        appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        scope="public_profile,user_friends"
        cssClass="my-facebook-button-class w-100"
        icon="fa-facebook"
      />
    </div>
  );
};

export default ViaFacebook;
