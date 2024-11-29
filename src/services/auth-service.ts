import api from "../config/axiosConfig";
import { SignInData, SignUpData, TokenData } from "../types/auth.type";

export const authService = {
  signUp: async (userInfo: SignUpData) => {
    try {
      const { data } = await api.post<TokenData>(
        "/auth/signup",
        {
          ...userInfo,
        },
        { withCredentials: true }
      );
      console.log("inside authservice signup", data);
      localStorage.setItem("accessToken", data.accessToken);
      // localStorage.setItem("refreshToken", data.refreshToken);
    } catch (error: any) {
      console.log("error in signup", error);
      throw new Error(
        error.response?.data?.message || "An error occurred during signup"
      );
    }
  },

  signIn: async (userData: SignInData) => {
    try {
      const { data } = await api.post<TokenData>(
        "/auth/signin",
        {
          ...userData,
        },
        { withCredentials: true }
      );
      console.log("inside authservice signin", data);
      localStorage.setItem("accessToken", data.accessToken);
      // localStorage.setItem("refreshToken", data.refreshToken);
    } catch (error: any) {
      console.log("error in signin", error);
      throw new Error(
        error.response?.data?.message || "An error occurred during signin"
      );
    }
  },

  logout: async () => {
    console.log("inside logout");
    localStorage.removeItem("accessToken");
    // localStorage.removeItem("refreshToken");
    await api.post("/auth/logout", {}, { withCredentials: true });
    return;
  },
};
