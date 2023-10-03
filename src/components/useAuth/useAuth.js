import { logOut } from "../../components/api/api";
import { REGISTRATION_OUT } from "../../services/actions/registration";

import { setCookie } from "../../utils/setCookie";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useState } from "react";
import { autorizationRequest } from "../../services/actions/registration";

export function useProvideAuth() {
  const [user, setUser] = useState(null);

  const { userData } = useSelector(
    (store) => ({
      userData: store.regisrationReducer.user,
    }),
    shallowEqual,
  );

  const dispatch = useDispatch();

  const signIn = async (email, password) => {
    dispatch(autorizationRequest(email, password));
    setUser(userData);
  };

  const signOut = async () => {
    const res = await logOut();
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
