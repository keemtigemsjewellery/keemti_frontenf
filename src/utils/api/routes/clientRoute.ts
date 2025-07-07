export const BASE_URL = `/keemti`;

export const ROUTE = {
  DASHBOARD: `${BASE_URL}/`,
};

export const AUTH_ROUTE = {
  LOGIN: `${BASE_URL}/login`,
  REGISTER: `${BASE_URL}/register`,
  VERIFY_OTP: `${BASE_URL}/verify-otp`,
  FORGOT_PASSWORD: `${BASE_URL}/forgot-password`,
};

export const PRODUCT_ROUTE = {
  BY_CATEGORY: `${BASE_URL}/:categorySlug`,
  PRODUCT_LISTS: `${BASE_URL}/jewellery/:categorySlug`,
  PRODUCT_DETAILS: `${BASE_URL}/jewellery/:categorySlug/:productSlug`,
  CATEGORY_LISTS: `${BASE_URL}/category/:categorySlug`,
  PRODUCT_SEARCH_LISTS: `${BASE_URL}/search/:searchSlug`,
  PRODUCT_LISTING_ALL_PRODUCTS: `${BASE_URL}/all-products`,
  NO_PRODUCT: `${BASE_URL}/no-product`,
};

export const PROFILE_ROUTE = {
  PROFILE: `${BASE_URL}/profile`,
  PROFILE_ORDER: `${BASE_URL}/profile-order`,
  PROFILE_ORDER_DETAILS: `${BASE_URL}/profile-order-detail/:orderId`,
  PROFILE_WHISHLIST: `${BASE_URL}/profile-wishlist`,
  PROFILE_ADDRESS: `${BASE_URL}/profile-address`,
  PROFILE_ADD_TO_CART: `${BASE_URL}/cart`,
  PROFILE_MY_QUERIES: `${BASE_URL}/queries`,
};

export const ORDER_ROUTE = {
  ORDER_DETAIL: `${BASE_URL}/order-detail`,
};

export const BLOG_ROUTE = {
  BLOG_LISTS: `${BASE_URL}/blog`,
  BLOG_DETAILS: `${BASE_URL}/blog/:blogSlug`,
};

export const BANNER_ROUTE = {
  BANNER_LISTS: `${BASE_URL}/banner/:bannerSlug`,
};

export const FOOTER_ROUTE = {
  LINKS: `${BASE_URL}/:footerMenu/:footerSubmenu`,
};

export const HEADER_TOPBAR_ROUTE = {
  LINKS: `${BASE_URL}/:navbarHeading`,
};
