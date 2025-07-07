import axiosInstance from "../axiosInstance";
import { DASHBOARD_ROUTE } from "../routes/serverRoute";

export const getDashboardBannersAPI = () => {
  return axiosInstance.get(`${DASHBOARD_ROUTE.BANNER}`);
};

export const getBannerListsBySlugAPI = (slug: string | any) => {
  return axiosInstance.get(`${DASHBOARD_ROUTE.BANNER_LISTS}?slug=${slug}`);
};
