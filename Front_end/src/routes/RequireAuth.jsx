import { useLocation, Navigate, Outlet } from "react-router-dom";

import { auth } from "../configs/FireBaseConfig/FireBaseConfig";

const RequireAuth = () => {
  const location = useLocation();

  return (
    <>
      {auth.currentUser ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
};

export default RequireAuth;
