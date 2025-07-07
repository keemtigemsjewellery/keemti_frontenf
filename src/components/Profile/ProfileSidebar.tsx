import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import {
  getLocalStorageValue,
  profileSidebarScrollToTop,
  removeLocalStorageValue,
} from "utils/helper/helper";
import { localStorageEnum } from "utils/enum/enum";
import { PROFILE_ROUTE, ROUTE } from "utils/api/routes/clientRoute";

import accounticon1 from "../../assets/images/icons/account-icon1.svg";
import accounticon2 from "../../assets/images/icons/account-icon2.svg";
import accounticon3 from "../../assets/images/icons/account-icon3.svg";
import accounticon4 from "../../assets/images/icons/account-icon4.svg";
import accounticon6 from "../../assets/images/icons/account-icon6.svg";
import accounticon5 from "../../assets/images/icons/account-icon5.svg";
import ProfileIcon from "../../assets/images/icons/profile-sidebar-image.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetailsData,
  removeUserDetailsAction,
} from "store/slices/profileSlice";

const ProfileSidebar = () => {
  const navigate = useNavigate();
  const userDetails = useSelector(getUserDetailsData);
  const dispatch = useDispatch();

  const token = getLocalStorageValue(localStorageEnum.ACCESS_TOKEN);

  const signOutHandler = () => {
    removeLocalStorageValue(localStorageEnum.ACCESS_TOKEN);
    navigate(ROUTE.DASHBOARD);
    dispatch(removeUserDetailsAction({}));
  };

  const { pathname } = useLocation();

  const [activeTab, setActiveTab] = useState(PROFILE_ROUTE.PROFILE);

  useEffect(() => {
    if (pathname) {
      pathname.includes(PROFILE_ROUTE.PROFILE) &&
        setActiveTab(PROFILE_ROUTE.PROFILE);
      pathname.includes(PROFILE_ROUTE.PROFILE_ORDER) &&
        setActiveTab(PROFILE_ROUTE.PROFILE_ORDER);
      pathname.includes(PROFILE_ROUTE.PROFILE_WHISHLIST) &&
        setActiveTab(PROFILE_ROUTE.PROFILE_WHISHLIST);
      pathname.includes(PROFILE_ROUTE.PROFILE_ADDRESS) &&
        setActiveTab(PROFILE_ROUTE.PROFILE_ADDRESS);
      pathname.includes(PROFILE_ROUTE.PROFILE_MY_QUERIES) &&
        setActiveTab(PROFILE_ROUTE.PROFILE_MY_QUERIES);
    }
  }, [pathname]);

  return (
    <div className="col-md-12 col-lg-4 col-xl-3 mb-3">
      <div className="accountpage-left">
        <div className="userinfo white-bg white-boxbg">
          <div className="d-flex align-items-center">
            <div className="img">
              <img 
                src={
                  userDetails && userDetails?.profileImage
                    ? userDetails?.profileImage
                    : ProfileIcon
                }
                alt=""
              />
            </div>
            <div className="txt">
              <h6 className="mb-0 font-weight-bold">Hello</h6>
              <h4 className="me-2">
                {userDetails && userDetails?.fullName
                  ? userDetails?.fullName
                  : "Guest"}
                <i className="profile-verified fas fa-badge-check ms-1"></i>
              </h4>
            </div>
          </div>
        </div>
        <div className="accountnav white-bg white-boxbg">
          <ul>
            <li
              className={`cursor-pointer 
              ${activeTab === PROFILE_ROUTE.PROFILE && "active"}`}
              onClick={() => {
                navigate(PROFILE_ROUTE.PROFILE);
                profileSidebarScrollToTop();
              }}
            >
              <a>
                <img  src={accounticon1} alt="icon" />
                Account Detail
              </a>
            </li>
            <li
              className={`cursor-pointer 
              ${activeTab === PROFILE_ROUTE.PROFILE_ORDER && "active"}`}
              onClick={() => {
                navigate(PROFILE_ROUTE.PROFILE_ORDER);
                profileSidebarScrollToTop();
              }}
            >
              <a>
                <img  src={accounticon2} alt="icon" />
                My Orders
              </a>
            </li>
            <li
              className={`cursor-pointer 
          ${activeTab === PROFILE_ROUTE.PROFILE_WHISHLIST && "active"}`}
              onClick={() => {
                navigate(PROFILE_ROUTE.PROFILE_WHISHLIST);
                profileSidebarScrollToTop();
              }}
            >
              <a>
                <img  src={accounticon3} alt="icon" />
                Wishlist
              </a>
            </li>
            <li
              className={`cursor-pointer 
        ${activeTab === PROFILE_ROUTE.PROFILE_ADDRESS && "active"}`}
              onClick={() => {
                navigate(PROFILE_ROUTE.PROFILE_ADDRESS);
                profileSidebarScrollToTop();
              }}
            >
              <a>
                <img  src={accounticon4} alt="icon" />
                Address
              </a>
            </li>
            <li
              className={`cursor-pointer 
        ${activeTab === PROFILE_ROUTE.PROFILE_MY_QUERIES && "active"}`}
              onClick={() => {
                navigate(PROFILE_ROUTE.PROFILE_MY_QUERIES);
                profileSidebarScrollToTop();
              }}
            >
              <a>
                <img  className="myQueriesSidebarImage" src={accounticon6} alt="icon" />
                My Queries
              </a>
            </li>
            {token && (
              <li className="cursor-pointer" onClick={() => signOutHandler()}>
                <a>
                  <img  src={accounticon5} alt="icon" />
                  Sign Out
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
