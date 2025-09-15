import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <div className="text-center mt-10"></div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
