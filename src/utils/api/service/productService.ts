import { setControllerSignal } from "utils/abortAPIHandler";
import axiosInstance from "../axiosInstance";
import { PRODUCT_SERVER_ROUTE } from "../routes/serverRoute";

export const getAllProductsAPI = (slug: string) => {
  return axiosInstance.get(
    `${PRODUCT_SERVER_ROUTE.GET_ALL_PRODUCTS}?slug=${slug}`
  );
};

export const getProductDetailsAPI = (productSlug: string) => {
  return axiosInstance.get(
    `${PRODUCT_SERVER_ROUTE.GET_PRODUCT_DETAILS}?productSlug=${productSlug}`
  );
};

export const getStaticFilterDetailsAPI = () => {
  return axiosInstance.get(`${PRODUCT_SERVER_ROUTE.GET_FILTER_DETAILS}`);
};

export const getAllProductDetailsByFiltersAPI = (
  queryParams: any,
  controller: any
) => {
  setControllerSignal("/productFilter", controller);

  return axiosInstance.get(
    `${
      PRODUCT_SERVER_ROUTE.GET_ALL_PRODUCTS_BY_FILTERS
    }?${queryParams.toString()}`,
    {
      signal: controller.signal,
    }
  );
};

export const getAllCouponsAPI = (productIds: any) => {
  return axiosInstance.get(
    `${PRODUCT_SERVER_ROUTE.GET_ALL_COUPONS}?${
      productIds.length > 0
        ? `productIds=${productIds.toString()}`
        : `productIds=[]`
    }`
  );
};

export const getAllCategoriesAPI = () => {
  return axiosInstance.get(`${PRODUCT_SERVER_ROUTE.GET_ALL_CATEGORIES}`);
};
