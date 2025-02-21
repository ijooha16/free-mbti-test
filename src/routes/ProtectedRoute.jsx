import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../zustand/store/useAuthStore";

const ProtectedRoute = () => {
  const { token } = useAuthStore();
  const isLogin = !!token;

  return isLogin ? <Outlet /> : <Navigate to="/log-in" replace />;
};

export default ProtectedRoute;