import axios from "axios";

const BASE_URL = "http://localhost:3000/api/";

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
  }
);
