import axiosInstance from "../axiosInstance";
import { BLOG_SERVER_ROUTE } from "../routes/serverRoute";

export const getAllBlogsAPI = (params: {
  page: number;
  limit: number;
  filter?: string;
}) => {
  return axiosInstance.get(
    `${BLOG_SERVER_ROUTE.GET_ALL_BLOG_LIST}?page=${params?.page}&limit=${params?.limit}&filter=${params.filter}`
  );
};

export const getBlogDetailsBySlugAPI = (slug: string | any) => {
  return axiosInstance.get(
    `${BLOG_SERVER_ROUTE.GET_BLOG_DETAILS}?slug=${slug}`
  );
};
