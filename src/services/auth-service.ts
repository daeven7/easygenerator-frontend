import api from "../config/axiosConfig";
import { SignInData, SignUpData, TokenData } from "../types/auth.type";
import { CONSTANTS, ENDPOINTS, MESSAGES } from "../utils/constants.utils";
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
      localStorage.setItem(CONSTANTS.ACCESS_TOKEN_NAME, data.accessToken);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || MESSAGES.SIGN_UP_ERROR_MESSAGE
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
      localStorage.setItem(CONSTANTS.ACCESS_TOKEN_NAME, data.accessToken);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || MESSAGES.SIGN_IN_ERROR_MESSAGE
      );
    }
  },

  logout: async () => {
    try{
      queryClient.removeQueries();
      localStorage.removeItem(CONSTANTS.ACCESS_TOKEN_NAME);
      await api.post(ENDPOINTS.LOGOUT, {}, { withCredentials: true });
      return;
    }catch (error: any) {
      throw new Error(
        error.response?.data?.message || MESSAGES.LOGOUT_ERROR_MESSAGE
      );
    }
    
  },
};
