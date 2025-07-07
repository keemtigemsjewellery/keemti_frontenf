import axiosInstance from "../axiosInstance";
import { ORDER_ROUTE } from "../routes/serverRoute";

export const getAllOrdersAPI = (pageSize: number) => {
  return axiosInstance.get(`${ORDER_ROUTE.GET_ORDER_LIST}?page=${pageSize}`);
};

export const createOrderAPI = (data: any) => {
  return axiosInstance.post(`${ORDER_ROUTE.CREATE_ORDER}`, data);
};

export const applyCouponAPI = (data: any) => {
  return axiosInstance.post(`${ORDER_ROUTE.APPLY_COUPON}`, data);
};

export const getOrderDetailsAPI = (orderId: string) => {
  return axiosInstance.get(
    `${ORDER_ROUTE.GET_ORDER_DETAILS}?orderId=${orderId}`
  );
};
