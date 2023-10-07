import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRouteElement = ({ element }) => {
  const isAuth = useSelector((store) => store.regisrationReducer.isAuth);
  const location = useLocation();
  const currentPath = location.pathname;

  return isAuth ? (
    element
  ) : (
    <Navigate to="/login" replace state={{ path: currentPath }} />
  );
};
