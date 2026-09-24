import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

export const getAccessToken = () => accessToken;

axiosInstance.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

let isRefreshing = false;
let refreshQueue = [];

const onRefreshed = (newToken) => {
  refreshQueue.forEach((callback) => callback(newToken));
  refreshQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const { data } = await axios.post(
            "http://localhost:5000/api/auth/refresh-token",
            {},
            { withCredentials: true }
          );
          setAccessToken(data.accessToken);
          isRefreshing = false;
          onRefreshed(data.accessToken);
        } catch (refreshError) {
          isRefreshing = false;
          setAccessToken(null);
          return Promise.reject(refreshError);
        }
      }

      return new Promise((resolve) => {
        refreshQueue.push((newToken) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          resolve(axiosInstance(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;