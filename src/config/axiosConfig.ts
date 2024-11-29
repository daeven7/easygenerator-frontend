import axios from "axios";
import { authService } from "../services/auth-service";

const BASE_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: "http://localhost:3000", //replace with your BaseURL
  headers: {
    "Content-Type": "application/json", // change according header type accordingly
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken"); // get stored access token
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // set in header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          //   const response = await axios.post(`${BASE_URL}/auth/refreshToken`, {
          //     refreshToken,
          //   });
          const response = await axios.get(`${BASE_URL}/auth/refresh`, {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          });
          // don't use axious instance that already configured for refresh token api call
          const newAccessToken = response.data.accessToken;
          const newRefreshToken = response.data.refreshToken;
          localStorage.setItem("accessToken", newAccessToken); //set new access token
          localStorage.setItem("refreshToken", newRefreshToken); //added
          //   originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originalRequest); //recall Api with new token
        } catch (error) {
          console.log("inside error of refresh rotation");
          //   authService.logout()
          // Handle token refresh failure
          // mostly logout the user and re-authenticate by login again
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
