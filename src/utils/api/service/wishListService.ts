import axiosInstance from "../axiosInstance";
import { WISHLIST_SERVER_ROUTE } from "../routes/serverRoute";

export const getAllWishListedProdctsAPI = () => {
  return axiosInstance.get(`${WISHLIST_SERVER_ROUTE.GET_ALL_WISHLIST}`);
};

export const toggleWishListStatusAPI = (params: {
  productId: string;
  type?: string;
}) => {
  return axiosInstance.post(
    `${WISHLIST_SERVER_ROUTE?.ADD_REMOVE_WISHLIST}`,
    params
  );
};
