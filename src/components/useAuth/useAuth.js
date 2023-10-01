import { logOut } from "../../components/api/api";
import { REGISTRATION_OUT } from "../../services/actions/registration";

import { setCookie } from "../../utils/setCookie";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useState } from "react";
import { autorizationRequest } from "../../services/actions/registration";

export function useProvideAuth() {
  const [user, setUser] = useState(null);

  const { refreshToken, userData } = useSelector(
    (store) => ({
      refreshToken: store.regisrationReducer.refreshToken,
      userData: store.regisrationReducer.user,
      accessToken: store.regisrationReducer.accessToken,
    }),
    shallowEqual,
  );

  const dispatch = useDispatch();

  const signIn = async (email, password) => {
    dispatch(autorizationRequest(email, password));
    setUser(userData);
  };

  const signOut = async () => {
    const res = await logOut(refreshToken);
    if (res) {
      dispatch({ type: REGISTRATION_OUT });
      setCookie("accessToken", "", {
        expires: -1,
      });
      setCookie("refreshToken", "", {
        expires: -1,
      });
    }
    setUser(null);
  };

  return {
    signIn,
    user,
    signOut,
  };
}
