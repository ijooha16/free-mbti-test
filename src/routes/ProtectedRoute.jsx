import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../zustand/store/useAuthStore";

const ProtectedRoute = () => {
  const { user } = useAuthStore();

  return user ? <Outlet /> : <Navigate to="/log-in" replace />;
};

export default ProtectedRoute;