import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getCartProductsData } from "store/slices/cartSlice";
import { getMenuLevelsData } from "store/slices/menuSlice";
import {
  getGlobalSettingsData,
  getUserDetailsData,
  removeUserDetailsAction,
} from "store/slices/profileSlice";
import { localStorageEnum } from "utils/enum/enum";
import {
  getLocalStorageValue,
  redirectURL,
  removeLocalStorageValue,
  scrollToTop,
  stringToSlug,
} from "utils/helper/helper";

import {
  ROUTE,
  PRODUCT_ROUTE,
  HEADER_TOPBAR_ROUTE,
  BLOG_ROUTE,
  PROFILE_ROUTE,
  AUTH_ROUTE,
} from "utils/api/routes/clientRoute";

import WhiteLogo from "../../../assets/images/white-header.png";
import shopping_bag from "../../../assets/images/tool-shopping-bag.svg";
import like from "../../../assets/images/tool-love.svg";
import user from "../../../assets/images/tool-user.svg";
import account_icon from "../../../assets/images/icons/account-icon1-black2.svg";
import my_order from "../../../assets/images/icons/account-icon2-black.svg";
import SignOutIcon from "../../../assets/images/icons/signout.svg";
import AddressIcon from "../../../assets/images/icons/address-black.svg";
import QueryIcon from "../../../assets/images/icons/question.svg";
import blogIcon from "../../../assets/images/blog-icon.svg";
import { setMobileViewFilterVisiblityAction } from "store/slices/productSlice";
import CartAuthPopupWithoutLogin from "../CartAuthPopupWithoutLogin";
import WishlistAuthPopupWithoutLogin from "../WishlistAuthPopupWithoutLogin";

interface TopHeaderModel {
  setIsMobileViewSidebarOpen: any;
}
const TopHeader = ({ setIsMobileViewSidebarOpen }: TopHeaderModel) => {
  const navigate = useNavigate();

  const token = getLocalStorageValue(localStorageEnum.ACCESS_TOKEN);

  const dispatch = useDispatch();
  const menuLevelsData = useSelector(getMenuLevelsData);
  const { cartProducts } = useSelector(getCartProductsData);
  const userDetails = useSelector(getUserDetailsData);
  const globalSetting = useSelector(getGlobalSettingsData);

  const [searchText, setSearchText] = useState<any>({ value: "", label: "" });
  const [mobileSearchText, setMobileSearchText] = useState("");
  const [isMobileSearchCloseIconVisible, setIsMobileSearchCloseIconVisible] =
    useState(false);

  const signOutHandler = () => {
    removeLocalStorageValue(localStorageEnum.ACCESS_TOKEN);
    navigate(ROUTE.DASHBOARD);
    dispatch(removeUserDetailsAction({}));
  };

  const onSearchTextHandler = (searchFieldEvent: any) => {
    setSearchText({
      value: searchFieldEvent.target.value,
      label: searchFieldEvent.target.value,
    });
  };

  const onSearchFieldEnterHandler = (e: any) => {
    if (searchText?.value !== "") {
      navigate(
        PRODUCT_ROUTE.PRODUCT_SEARCH_LISTS.replace(
          ":searchSlug",
          stringToSlug(searchText?.value)
        )
      );
    }

    if (searchText?.value === "") {
      navigate(PRODUCT_ROUTE.PRODUCT_LISTING_ALL_PRODUCTS);
    }
  };

  const mobileSubmitHandler = () => {
    if (mobileSearchText !== "") {
      navigate(
        PRODUCT_ROUTE.PRODUCT_SEARCH_LISTS.replace(
          ":searchSlug",
          stringToSlug(mobileSearchText)
        )
      );
    }

    if (mobileSearchText === "") {
      navigate(PRODUCT_ROUTE.PRODUCT_LISTING_ALL_PRODUCTS);
    }
    setIsMobileSearchCloseIconVisible(false);
    setMobileSearchText("");
    dispatch(setMobileViewFilterVisiblityAction(false));
  };

  return (
    <>
      <div className="navbar navbar-expand-lg navbar-light py-2 py-lg-3">
        <div className="container">
          <a
            className="navbar-brand cursor-pointer"
            onClick={() => {
              setIsMobileViewSidebarOpen(false);
              navigate(ROUTE.DASHBOARD);
              scrollToTop();
            }}
          >
            <img src={globalSetting?.logoImage ?? WhiteLogo} alt="Logo" />
          </a>

          <div className="form-group has-search d-none d-lg-block relative">
            <i className="far fa-search form-control-feedback"></i>
            <input
              className="form-control"
              placeholder="Search"
              type="text"
              value={searchText ? searchText.value : ""}
              onChange={(e: any) => onSearchTextHandler(e)}
              onKeyDown={(e: any) => {
                e.key === "Enter" && onSearchFieldEnterHandler(e);
              }}
            />
            {searchText.value.length > 0 && (
              <i
                className="fal fa-times close"
                onClick={() => {
                  setSearchText({ value: "", label: "" });
                  navigate(PRODUCT_ROUTE.PRODUCT_LISTING_ALL_PRODUCTS);
                }}
              ></i>
            )}
          </div>

          <div className="header-right d-flex align-items-center">
            <ul className="navbar-toolbar d-none d-sm-flex flex-shrink-0 align-items-center pe-3 px-lg-4">
              {menuLevelsData.level1 &&
                menuLevelsData.level1?.length > 0 &&
                menuLevelsData.level1?.map((item, index) => {
                  return (
                    <li className="navbar-tool me-2 me-lg-4" key={index}>
                      <a
                        className="navbar-tool-icon-box"
                        onClick={() => {
                          setIsMobileViewSidebarOpen(false);
                          item.menu.isMenuDeeplink
                            ? redirectURL(item.menu.deepLink)
                            : navigate(
                                `${HEADER_TOPBAR_ROUTE.LINKS.replace(
                                  ":navbarHeading",
                                  `${item.menu.slug}`
                                )}`
                              );
                        }}
                      >
                        <div className="d-flex flex-column align-items-center cursor-pointer">
                          <span className="tool-icon bg-transparent">
                            <img
                              src={item?.menu?.menuIcon}
                              alt="Header 1"
                              className="w-75"
                            />
                          </span>
                          <span className="d-none d-lg-block mt-0">
                            {item?.menu?.menuName}
                          </span>
                        </div>
                      </a>
                    </li>
                  );
                })}
              <li className="navbar-tool me-2 me-lg-4">
                <a
                  className="navbar-tool-icon-box"
                  onClick={() => {
                    setIsMobileViewSidebarOpen(false);
                    navigate(BLOG_ROUTE.BLOG_LISTS);
                  }}
                >
                  <div className="d-flex flex-column align-items-center cursor-pointer">
                    <span className="tool-icon bg-transparent">
                      <img src={blogIcon} alt="Header 1" />
                    </span>
                    <span className="d-none d-lg-block mt-0">Blog</span>
                  </div>
                </a>
              </li>
            </ul>
            <div className="header-cart ps-0 ps-sm-3 ps-lg-4">
              <ul className="navbar-toolbar d-flex flex-shrink-0 align-items-center">
                <li className="navbar-tool me-2 me-lg-4 d-lg-none">
                  <div
                    className={`navbar-tool-icon-box border-none 
                    ${isMobileSearchCloseIconVisible && "show"}`}
                  >
                    <div className="d-flex flex-column align-items-center">
                      <div
                        className="tool-icon"
                        onClick={() =>
                          setIsMobileSearchCloseIconVisible(
                            !isMobileSearchCloseIconVisible
                          )
                        }
                      >
                        <div className="search-button">
                          <a
                            className={`search-toggle ${
                              isMobileSearchCloseIconVisible && "active"
                            }`}
                            data-selector="#header-1"
                          ></a>
                        </div>
                      </div>
                      <div className="search-box">
                        <input
                          type="text"
                          className="text search-input search-field"
                          value={mobileSearchText ?? ""}
                          onChange={(e: any) =>
                            setMobileSearchText(e.target.value)
                          }
                          autoComplete="off"
                          placeholder="Type here to search..."
                        />
                        <a
                          className="mobile-search-btn"
                          onClick={() => mobileSubmitHandler()}
                        >
                          <i className="far fa-search"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="navbar-tool me-2 ">
                  {token ? (
                    <a
                      className="navbar-tool-icon-box cursor-pointer relative"
                      onClick={() => {
                        setIsMobileViewSidebarOpen(false);
                        token && navigate(PROFILE_ROUTE.PROFILE_ADD_TO_CART);
                      }}
                    >
                      <div className="cart-round-quantity absolute">
                        <span>
                          {token && cartProducts ? cartProducts?.length : 0}
                        </span>
                      </div>
                      <div className="d-flex flex-column align-items-center">
                        <span className="tool-icon">
                          <img src={shopping_bag} alt="shopping bag" />
                        </span>
                      </div>
                    </a>
                  ) : (
                    <a
                      className="navbar-tool-icon-box cursor-pointer relative hehe"
                      data-bs-toggle="modal"
                      data-bs-target="#auth-login-cart"
                    >
                      <div className="cart-round-quantity absolute">
                        <span>
                          {token && cartProducts ? cartProducts?.length : 0}
                        </span>
                      </div>
                      <div className="d-flex flex-column align-items-center">
                        <span className="tool-icon">
                          <img src={shopping_bag} alt="shopping bag" />
                        </span>
                      </div>
                    </a>
                  )}
                </li>
                <li className="navbar-tool me-2 cursor-pointer">
                  {token ? (
                    <a
                      className="navbar-tool-icon-box"
                      onClick={() => {
                        setIsMobileViewSidebarOpen(false);
                        token && navigate(PROFILE_ROUTE.PROFILE_WHISHLIST);
                      }}
                    >
                      <div className="d-flex flex-column align-items-center">
                        <span className="tool-icon">
                          <img src={like} alt="like" />
                        </span>
                      </div>
                    </a>
                  ) : (
                    <a
                      className="navbar-tool-icon-box"
                      data-bs-toggle="modal"
                      data-bs-target="#auth-login-wishlist"
                    >
                      <div className="d-flex flex-column align-items-center">
                        <span className="tool-icon">
                          <img src={like} alt="like" />
                        </span>
                      </div>
                    </a>
                  )}
                </li>
                <li className="navbar-tool">
                  <a href="#" className="navbar-tool-icon-box"></a>
                  <Dropdown
                    className="profile-menu"
                    onClick={() => setIsMobileViewSidebarOpen(false)}
                  >
                    <Dropdown.Toggle className="navbar-tool-icon-box">
                      <div className="d-flex flex-column align-items-center">
                        <span className="tool-icon">
                          {token ? (
                            <img
                              className="profile-image"
                              src={
                                userDetails && userDetails?.profileImage
                                  ? userDetails?.profileImage
                                  : user
                              }
                              alt="user"
                            />
                          ) : (
                            <img src={user} alt="user" />
                          )}
                        </span>
                      </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {!token && (
                        <Dropdown.Item
                          onClick={() => navigate(AUTH_ROUTE.LOGIN)}
                        >
                          <span>
                            <img src={account_icon} alt="Login" />
                          </span>
                          Sign In
                        </Dropdown.Item>
                      )}
                      <Dropdown.Item
                        onClick={() =>
                          token
                            ? navigate(PROFILE_ROUTE.PROFILE)
                            : navigate(AUTH_ROUTE.LOGIN)
                        }
                      >
                        <span>
                          <img src={account_icon} alt="My Account" />
                        </span>
                        My Account
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          token
                            ? navigate(PROFILE_ROUTE.PROFILE_ORDER)
                            : navigate(AUTH_ROUTE.LOGIN)
                        }
                      >
                        <span>
                          <img src={my_order} alt="My Order" />
                        </span>
                        My Orders
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() =>
                          token
                            ? navigate(PROFILE_ROUTE.PROFILE_ADDRESS)
                            : navigate(AUTH_ROUTE.LOGIN)
                        }
                      >
                        <span>
                          <img src={AddressIcon} alt="My Account" />
                        </span>
                        Address
                      </Dropdown.Item>
                      {token && (
                        <Dropdown.Item
                          onClick={() =>
                            token && navigate(PROFILE_ROUTE.PROFILE_MY_QUERIES)
                          }
                        >
                          <span>
                            <img
                              className="myQuriesImage"
                              src={QueryIcon}
                              alt="My Account"
                            />
                          </span>
                          My Queries
                        </Dropdown.Item>
                      )}
                      {token && (
                        <Dropdown.Item onClick={() => signOutHandler()}>
                          <span>
                            <img src={SignOutIcon} alt="My Account" />
                          </span>
                          Sign Out
                        </Dropdown.Item>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <CartAuthPopupWithoutLogin />
      <WishlistAuthPopupWithoutLogin />
    </>
  );
};

export default TopHeader;
