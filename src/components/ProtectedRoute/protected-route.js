import { Navigate, useLocation } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import { useProvideAuth } from "../UseAuth/useAuth";
import { useState, useEffect } from "react";

export const ProtectedRouteElement = ({ element }) => {
  const [isUserLoaded, setUserLoaded] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const { isAuthorized } = useProvideAuth();

  const { isAuth } = useSelector(
    (store) => ({
      isAuth: store.regisrationReducer.isAuth,
    }),
    shallowEqual,
  );

  async function getAuth() {
    await isAuthorized();
    setUserLoaded(true);
  }

  useEffect(() => {
    getAuth();
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  return isAuth ? (
    element
  ) : (
    <Navigate to="/login" replace state={{ path: currentPath }} />
  );
};
