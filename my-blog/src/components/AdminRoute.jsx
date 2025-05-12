import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthCntx } from "../context/AuthCntx";

const AdminRoute = () => {
  const { user } = useContext(AuthCntx);

  if (!user?.user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.user.isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
