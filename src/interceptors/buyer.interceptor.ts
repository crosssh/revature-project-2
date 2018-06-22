import axios from "axios";
export const buyerInterceptor = axios.create();
buyerInterceptor.interceptors.request.use(config => {
  config.headers.Authorization = localStorage.getItem("token");
  return config;
});
