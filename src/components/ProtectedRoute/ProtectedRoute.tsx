import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/auth";
import { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated: user } = useAuthContext();
  if (!user) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
