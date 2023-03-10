import { useLocation, Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ allowedRoles }) => {
  const auth = sessionStorage.getItem("role");
  const location = useLocation();

  return allowedRoles.includes(auth) ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default PrivateRoutes;
