import { useEffect, Suspense, lazy } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import Dashboard from "./components/Dashboard";
import Loader from "common/loader";
import Header from "components/Common/Header";
import Footer from "./components/Common/Footer";
import ProtectedRoute from "components/Auth/ProtectedRoute";
import NavbarHeading from "components/Common/NavbarHeading";

import { localStorageEnum } from "utils/enum/enum";
import { isTokenExpired } from "utils/api/tokenChecker";
import { removeLocalStorageValue, scrollToTop } from "utils/helper/helper";
import { setAdminShippingValues } from "store/slices/cartSlice";

import {
  AUTH_ROUTE,
  BASE_URL,
  FOOTER_ROUTE,
  HEADER_TOPBAR_ROUTE,
  PRODUCT_ROUTE,
  PROFILE_ROUTE,
  ROUTE,
  BLOG_ROUTE,
  BANNER_ROUTE,
} from "./utils/api/routes/clientRoute";

import "./assets/scss/general.scss";
import "./assets/scss/custom.scss";
import "./assets/scss/fontAwesome.css";
import "react-loading-skeleton/dist/skeleton.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

import { getAllSettingsAPI } from "./components/Common/Footer";
import { setGlobalSettingValueAction } from "store/slices/profileSlice";

import ProductsLists from "./components/Product/ProductList/index";
import ProductsDetail from "./components/Product/ProductDetail";
import Profile from "./components/Profile";
import LoginRegister from "components/Auth";
import VerifyOtp from "./components/Auth/VerifyOtp";
import ForgotPassword from "./components/Auth/ForgotPassword";
import Blog from "components/Blog/Blog";
import BlogDetails from "components/Blog/BlogDetails";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import ProfileOrderDetail from "./components/Profile/MyOrder/ProfileOrderDetail";
import FooterLinkDetails from "components/Common/Footer/FooterLinkDetails";
import AddToCart from "components/Profile/AddToCart";
import NoProduct from "components/Product/NoProduct";

const TawkReactMessenger = lazy(() => import("components/TawkReactMessenger"));

const App = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isTokenExpired()) {
      return removeLocalStorageValue(localStorageEnum.ACCESS_TOKEN);
    }
  }, [pathname]);

  useEffect(() => {
    !(
      pathname.includes("profile-address") ||
      pathname.includes("profile") ||
      pathname.includes("profile-order") ||
      pathname.includes("profile-wishlist") ||
      pathname.includes("queries")
    ) && scrollToTop();
  }, [pathname]);

  useEffect(() => {
    const globalSettingHandler = async () => {
      try {
        const { data } = await getAllSettingsAPI();
        dispatch(setGlobalSettingValueAction(data?.data));
        dispatch(setAdminShippingValues(data?.data));
      } catch {
        console.log("Unable to fetch footer data");
      }
    };
    globalSettingHandler();
  }, []);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Header />
        <Routes>
          {/****** Dashboard *****/}
          <Route path={ROUTE.DASHBOARD} element={<Dashboard />} />
          <Route path={BANNER_ROUTE.BANNER_LISTS} element={<ProductsLists />} />

          {/******Header *****/}
          <Route path={HEADER_TOPBAR_ROUTE.LINKS} element={<NavbarHeading />} />

          {/****** Auth *****/}
          <Route path={AUTH_ROUTE.LOGIN} element={<LoginRegister />} />
          <Route path={AUTH_ROUTE.VERIFY_OTP} element={<VerifyOtp />} />
          <Route
            path={AUTH_ROUTE.FORGOT_PASSWORD}
            element={<ForgotPassword />}
          />

          {/****** Product *****/}
          <Route path={PRODUCT_ROUTE.BY_CATEGORY} element={<ProductsLists />} />
          <Route
            path={PRODUCT_ROUTE.PRODUCT_LISTS}
            element={<ProductsLists />}
          />
          <Route
            path={PRODUCT_ROUTE.PRODUCT_LISTING_ALL_PRODUCTS}
            element={<ProductsLists />}
          />
          <Route
            path={PRODUCT_ROUTE.PRODUCT_SEARCH_LISTS}
            element={<ProductsLists />}
          />
          <Route
            path={PRODUCT_ROUTE.PRODUCT_DETAILS}
            element={<ProductsDetail />}
          />
          <Route
            path={PRODUCT_ROUTE.CATEGORY_LISTS}
            element={<ProductsLists />}
          />
          <Route path={PRODUCT_ROUTE.NO_PRODUCT} element={<NoProduct />} />

          {/****** Profile *****/}
          <Route
            path={PROFILE_ROUTE.PROFILE}
            element={<ProtectedRoute Component={Profile} />}
          />
          <Route
            path={PROFILE_ROUTE.PROFILE_ORDER}
            element={<ProtectedRoute Component={Profile} />}
          />
          <Route
            path={PROFILE_ROUTE.PROFILE_ORDER_DETAILS}
            element={<ProtectedRoute Component={ProfileOrderDetail} />}
          />
          <Route
            path={PROFILE_ROUTE.PROFILE_WHISHLIST}
            element={<ProtectedRoute Component={Profile} />}
          />
          <Route
            path={PROFILE_ROUTE.PROFILE_ADDRESS}
            element={<ProtectedRoute Component={Profile} />}
          />
          <Route
            path={PROFILE_ROUTE.PROFILE_MY_QUERIES}
            element={<ProtectedRoute Component={Profile} />}
          />

          <Route
            path={PROFILE_ROUTE.PROFILE_ADD_TO_CART}
            element={<ProtectedRoute Component={AddToCart} />}
          />

          {/****** Footer *****/}
          <Route path={FOOTER_ROUTE.LINKS} element={<FooterLinkDetails />} />

          <Route path={BLOG_ROUTE.BLOG_LISTS} element={<Blog />} />
          <Route path={BLOG_ROUTE.BLOG_DETAILS} element={<BlogDetails />} />

          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<Navigate to={`${BASE_URL}`} replace />} />
        </Routes>
        <Footer />

        <TawkReactMessenger />
      </Suspense>
    </>
  );
};

export default App;
