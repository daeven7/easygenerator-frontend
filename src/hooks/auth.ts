import { useContext } from "react";
import { AuthContext } from "../common/AuthProvider";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthState = {
  isAuthenticated: boolean;
  username: string;
  setIsAuthenticated: (authStatus: boolean) => void;
  setUsername: (name: string) => void;
};

export const useUserAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      setIsAuthenticated: (authStatus: boolean) =>
        set({ isAuthenticated: authStatus }),
      username: "",
      setUsername: (name: string) => set({ username: name }),
    }),
    {
      name: "user-valid",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuthContext must be within AuthProvider");
  }

  return ctx;
};
