import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { authService } from "../services/auth-service";
import { useContext } from "react";
import { AuthContext } from "../common/AuthProvider";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { SignUpData } from "../types/auth.type";


export const useSignUp = (): UseMutationResult<
  unknown,
  unknown,
  SignUpData,
  unknown
> => {
  return useMutation<unknown, unknown, SignUpData, unknown>({
    mutationFn: (requestData: SignUpData) => authService.signUp(requestData),
  });
};



type AuthState = {
  isAuthenticated: boolean;
  setIsAuthenticated: (authStatus: boolean) => void;
};


export const useUserAuthStore = create<AuthState>()(
    persist(
      (set, get) => ({
        isAuthenticated: false,
        setIsAuthenticated: (authStatus: boolean) => set({ isAuthenticated: authStatus }),
      }),
      {
        name: 'user-valid', // name of the item in the storage (must be unique)
        storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      },
    ),
  )

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuthContext must be within AuthProvider");
  }

  return ctx;
};
