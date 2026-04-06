import axios from "axios";

const BASE_URL = "http://localhost:3000/api/";

// Helper to get token safely from localStorage
const getToken = () => {
  // Primary: Hubmarket auth stores userInfo directly
  const userInfoRaw = localStorage.getItem("userInfo");
  if (userInfoRaw) {
    try {
      const userInfo = JSON.parse(userInfoRaw);
      if (userInfo?.accessToken) return userInfo.accessToken;
    } catch (e) {
      // ignore
    }
  }

  // Secondary: legacy redux-persist format (if present)
  const persisted = localStorage.getItem("persist:root");
  if (persisted) {
    try {
      const user = JSON.parse(JSON.parse(persisted).user).currentUser;
      return user?.accessToken || "";
    } catch (e) {
      return "";
    }
  }
  return "";
};

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
});

// Add interceptor to always include the latest token
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
