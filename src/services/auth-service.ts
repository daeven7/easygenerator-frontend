import api from "../config/axiosConfig";
import { SignInData, SignUpData, TokenData } from "../types/auth.type";
import { ENDPOINTS, QUERY_KEYS } from "../utils/constants.utils";
import { queryClient } from "../config/queryClientConfig";

export const authService = {
  signUp: async (userInfo: SignUpData) => {
    try {
      const { data } = await api.post<TokenData>(
        ENDPOINTS.SIGN_UP,
        {
          ...userInfo,
        },
        { withCredentials: true }
      );
      localStorage.setItem("accessToken", data.accessToken);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "An error occurred during signup"
      );
    }
  },

  signIn: async (userData: SignInData) => {
    try {
      const { data } = await api.post<TokenData>(
        ENDPOINTS.SIGN_IN,
        {
          ...userData,
        },
        { withCredentials: true }
      );
      localStorage.setItem("accessToken", data.accessToken);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "An error occurred during signin"
      );
    }
  },

  logout: async () => {
    // queryClient.removeQueries({ queryKey: [QUERY_KEYS.DASHBOARD_DATA] });
    queryClient.removeQueries();
    localStorage.removeItem("accessToken");
    await api.post(ENDPOINTS.LOGOUT, {}, { withCredentials: true });
    return;
  },
};
