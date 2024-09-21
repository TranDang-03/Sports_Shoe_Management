import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const RequireStaffAuth = () => {
  const { userId, role } = useUser();
  const location = useLocation();

  return (
    <>
      {!userId && role !== 1 ? (
        <Outlet />
      ) : (
        <Navigate to="/" state={{ from: location }} replace />
      )}
    </>
  );
};

export default RequireStaffAuth;
