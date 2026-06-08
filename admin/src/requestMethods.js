import axios from "axios";

const getBaseUrl = () => {
  let url = import.meta.env.VITE_API_URL || "http://localhost:3000/api/";
  if (!url.endsWith("/")) url += "/";
  if (!url.endsWith("api/")) url += "api/";
  return url;
};

const BASE_URL = getBaseUrl();

const getToken = () => {
  const adminToken = localStorage.getItem("adminToken");
  return adminToken || "";
};

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
});

userRequest.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.token = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
