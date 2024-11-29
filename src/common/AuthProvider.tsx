import { createContext, ReactNode } from "react";
import { authService } from "../services/auth-service";
import { useUserAuthStore } from "../hooks/auth";
import { SignInData, SignUpData } from "../types/auth.type";

type ContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated(authStatus: boolean): void;
  login(userData: SignInData): Promise<void>;
  logout(): void;
  signUp(data: SignUpData): Promise<void>;
};

const AuthContext = createContext<ContextType | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, setIsAuthenticated } = useUserAuthStore();

  const {
    signIn: authLogin,
    logout: authLogout,
    signUp: authSignUp,
  } = authService;

  const signUp = async (data: SignUpData) => {
    try {
      await authSignUp({ ...data });
      setIsAuthenticated(true);
    } catch (e) {
      setIsAuthenticated(false);
      throw e;
    }
  };

  const login = async (userData: SignInData) => {
    try {
      await authLogin({ ...userData });
      setIsAuthenticated(true);
    } catch (e) {
      setIsAuthenticated(false);
      throw e;
    }
  };

  const logout = () => {
    authLogout();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        signUp,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
