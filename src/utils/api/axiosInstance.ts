import axios, {
  AxiosInstance,
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { localStorageEnum } from "utils/enum/enum";
import { getLocalStorageValue } from "utils/helper/helper";
import { ROUTE } from "./routes/clientRoute";

interface Error {
  message: string[];
  statusCode: number;
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

const accessToken = getLocalStorageValue(localStorageEnum.ACCESS_TOKEN);

axiosInstance.interceptors.request.use(
  function (requestConfig: InternalAxiosRequestConfig) {
    requestConfig.headers["Authorization"] = `Bearer ${accessToken}`;

    return requestConfig;
  },
  function (error: AxiosError<Error>) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (responseConfig: AxiosResponse) {
    return responseConfig;
  },
  function (error: AxiosError<Error>) {
    if (error.response?.status === 401) {
      window.location.href = `${ROUTE.DASHBOARD}`;
    }
    if (axios.isCancel(error)) {
      return Promise.resolve();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
