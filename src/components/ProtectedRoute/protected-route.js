import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRouteElement = ({ element }) => {
  const isAuth = useSelector((store) => store.regisrationReducer.isAuth);

  return isAuth ? element : <Navigate to="/login" replace />;
};
