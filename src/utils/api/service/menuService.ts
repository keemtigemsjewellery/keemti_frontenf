import axiosInstance from "../axiosInstance";
import { MENU_SERVER_ROUTE } from "../routes/serverRoute";

export const getAllMenuWithSubMenuAPI = () => {
  return axiosInstance.get(`${MENU_SERVER_ROUTE.GET_ALL_MENU_WITH_SUBMENU}`);
};
