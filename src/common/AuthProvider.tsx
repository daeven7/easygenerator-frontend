import { createContext, ReactNode } from "react";
import { authService } from "../services/auth-service";
import { useUserAuthStore } from "../hooks/auth";
import { SignInData, SignUpData } from "../types/auth.type";
import { extractNameFromToken } from "../utils/jwt.utils";

type ContextType = {
  isAuthenticated: boolean;
  username: string;
  setUsername(name: string): void;
  setIsAuthenticated(authStatus: boolean): void;
  login(userData: SignInData): Promise<void>;
  logout(): Promise<void>;
  signUp(data: SignUpData): Promise<void>;
};

const AuthContext = createContext<ContextType | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, setIsAuthenticated, setUsername, username } =
    useUserAuthStore();

  const {
    signIn: authLogin,
    logout: authLogout,
    signUp: authSignUp,
  } = authService;

  const signUp = async (data: SignUpData) => {
    try {
      await authSignUp({ ...data });
      setIsAuthenticated(true);
      let name = extractNameFromToken();
      setUsername(name);
    } catch (e) {
      setIsAuthenticated(false);
      throw e;
    }
  };

  const login = async (userData: SignInData) => {
    try {
      await authLogin({ ...userData });
      setIsAuthenticated(true);

      let name = extractNameFromToken();
      setUsername(name);
    } catch (e) {
      setIsAuthenticated(false);
      throw e;
    }
  };

  const logout = async () => {
    await authLogout();
    setIsAuthenticated(false);
    setUsername("");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        signUp,
        login,
        logout,
        username,
        setUsername,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
