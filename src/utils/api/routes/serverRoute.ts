export const MENU_SERVER_ROUTE = {
  GET_ALL_MENU_WITH_SUBMENU: `/front/apis/getAllMenu`,
};

export const PRODUCT_SERVER_ROUTE = {
  GET_ALL_PRODUCTS: `/front/apis/getAll/products`,
  GET_PRODUCT_DETAILS: `/front/apis/get/productsDetails`,
  GET_FILTER_DETAILS: `/front/apis/get/productStaticFilter`,
  GET_ALL_PRODUCTS_BY_FILTERS: `/front/apis/getAll/productsFilter`,
  GET_ALL_COUPONS: `/front/apis/get/allCouponCode`,
  GET_ALL_CATEGORIES: `/front/apis/getAll/productCategoryData`,
};

export const AUTH_SERVER_ROUTE = {
  LOGIN_REGISTER: `/user/loginRegister`,
  RESEND_OTP: `/user/resendOtp`,
  VERIFY_OTP: `/user/otpVerification`,
  UPDATE_MOBILE_NO: `/user/updateMobileNumber`,
  SEND_OTP: `/user/sendOtpForUpdateMobileOrEmail`,
  UPDATE_VERIFY_OTP: `/user/verifyOtpForUpdateMobileOrEmail`,
  SOCIAL_LOGIN: `/user/socialLogin`,
};

export const WISHLIST_SERVER_ROUTE = {
  GET_ALL_WISHLIST: `/user/getUserWishlist`,
  ADD_REMOVE_WISHLIST: `user/addRemoveProductFromWishlist`,
};

export const DASHBOARD_ROUTE = {
  BANNER: `/front/apis/get/banners`,
  BANNER_LISTS: `/front/apis/get/bannerData`,
};

export const BLOG_SERVER_ROUTE = {
  GET_ALL_BLOG_LIST: `/front/apis/get/blogs`,
  GET_BLOG_DETAILS: `/front/apis/get/blog/details`,
};

export const PROFILE_ROUTE = {
  ADD_NEW_ADDRESS: "/user/createAddress",
  GET_ADDRESS_LIST: "/user/getAddresses/",
  DELETE_ADDRESS: "/user/deleteAddress/",
  EDIT_ADDRESS: "/user/updateAddress/",
  EDIT_PROFILE: "/user/updateProfile",
  GET_PROFILE: "/user/getProfile",
};

export const SETTING_ROUTE = {
  GET_GLOBAL_SETTINGS: `/front/apis/global-settings`,
};

export const ORDER_ROUTE = {
  GET_ORDER_LIST: "/user/getOrdersData",
  CREATE_ORDER: "/user/placeOrder",
  APPLY_COUPON: "/user/applyCouponCode",
  GET_ORDER_DETAILS: "user/getOrdersDetails",
};

export const QUERY_ROUTE = {
  GET_QUERY_LISTS: "/user/getQueryList",
  CREATE_QUERY: "/user/createQuery",
};
