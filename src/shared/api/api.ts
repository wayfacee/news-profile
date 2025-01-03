import axios from "axios";
import { LS_ACCESS_TOKEN_KEY } from "../const";

export const $api = axios.create({
  baseURL: __API__,
});

$api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization =
      localStorage.getItem(LS_ACCESS_TOKEN_KEY) || "";
  }

  return config;
});
