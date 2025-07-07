import { addNewAddressModel } from "utils/interface/Profile";
import axiosInstance from "../axiosInstance";
import { PROFILE_ROUTE, QUERY_ROUTE } from "../routes/serverRoute";
import { config } from "utils/helper/helper";

export const addNewAddressAPI = (data: addNewAddressModel) => {
  return axiosInstance.post(`${PROFILE_ROUTE.ADD_NEW_ADDRESS}`, data);
};

export const getAddressListAPI = () => {
  return axiosInstance.get(`${PROFILE_ROUTE.GET_ADDRESS_LIST}`);
};

export const deleteAddressAPI = (id: string) => {
  return axiosInstance.delete(`${PROFILE_ROUTE.DELETE_ADDRESS}${id}`);
};

export const updateAddressAPI = (id: string, data: addNewAddressModel) => {
  return axiosInstance.put(`${PROFILE_ROUTE.EDIT_ADDRESS}${id}`, data);
};

export const updateProfileAPI = (data: any) => {
  return axiosInstance.put(`${PROFILE_ROUTE.EDIT_PROFILE}`, data, config);
};

export const getProfileDetailsAPI = () => {
  return axiosInstance.get(`${PROFILE_ROUTE.GET_PROFILE}`);
};

export const addQueryAPI = (data: any) => {
  return axiosInstance.post(`${QUERY_ROUTE.CREATE_QUERY}`, data);
};

export const getAllQueriesAPI = (params: {
  page: number;
  limit: number;
  filter?: string;
}) => {
  return axiosInstance.get(
    `${QUERY_ROUTE.GET_QUERY_LISTS}?page=${params?.page}&limit=${params?.limit}`
  );
};
