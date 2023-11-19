import { logOut } from "../../api/api";
import {
  REGISTRATION_OUT,
  REGISTRATION_AUTH_CHANGE,
} from "../../services/actions/registration";

import { setCookie } from "../../utils/setCookie";
import { getCookie } from "../../utils/getCookie";
import { useDispatch } from "react-redux";

import {
  autorizationRequest,
  refreshToken,
} from "../../services/actions/registration";

export function useProvideAuth() {
  const dispatch = useDispatch();

  const isAuthorized = async (): Promise<boolean> => {
    if (getCookie("accessToken")) {
      dispatch({ type: REGISTRATION_AUTH_CHANGE, status: true });
    } else if (getCookie("refreshToken")) {
      const res: {
        success: boolean;
        accessToken: string;
        refreshToken: string;
      } = await refreshToken();
      res.success && dispatch({ type: REGISTRATION_AUTH_CHANGE, status: true });
    } else {
      dispatch({ type: REGISTRATION_OUT });
    }
    return true;
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    dispatch(autorizationRequest(email, password));
  };

  const signOut = async (): Promise<void> => {
    const res = await logOut();
    console.log("hjkl;");
    if (res) {
      dispatch({ type: REGISTRATION_OUT });
      setCookie("accessToken", "", {
        expires: -1,
      });
      setCookie("refreshToken", "", {
        expires: -1,
      });
    }
  };

  return {
    signIn,
    signOut,
    isAuthorized,
  };
}
