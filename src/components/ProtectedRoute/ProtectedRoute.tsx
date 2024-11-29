import { Navigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
import { useAuthContext } from "../../hooks/auth";
import { ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated: user } = useAuthContext();
  console.log("isAuthenticated protected", user)
  if (!user) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};