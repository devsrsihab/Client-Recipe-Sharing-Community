import axios from "axios";
import { cookies } from "next/headers";
import envConfig from "@/src/config/envConfig";
import { getNewAccessToken } from "@/src/services/AuthService";

const axiosInstance = axios.create({
  baseURL: envConfig.baseApi,
});

axiosInstance.interceptors.request.use(
  function (config) {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (accessToken) {
      config.headers.Authorization = accessToken;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },


  async function (error) {
    const config = error.config; 
    if (error.response) {
      const serverMessage = error.response.data?.message || "Something went wrong on the server.";
      return Promise.reject(new Error(serverMessage));
    }

    // if error responsce
    if (error?.response?.status === 401 && !config?.sent) {
      // set the sent flag to true , so that this block of code is not executed again
      config.sent = true;
      const res = await getNewAccessToken()
      const accessToken = res?.data?.accessToken

      // set the token in authorization header
      config.headers['Authorization'] = accessToken
      cookies().set("accessToken", accessToken)

      // retry the request
      return axiosInstance(config)
    }else{

      return Promise.reject(error);
    }

  }
);


export default axiosInstance;