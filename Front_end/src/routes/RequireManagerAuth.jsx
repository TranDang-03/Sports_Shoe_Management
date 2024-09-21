import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const RequireManagerAuth = () => {
  const { userId, role } = useUser();
  const location = useLocation();

  return (
    <>
      {userId !== null && role === 0 ? (
        <Outlet />
      ) : (
        <Navigate to="/admin" state={{ from: location }} replace />
      )}
    </>
  );
};

export default RequireManagerAuth;
