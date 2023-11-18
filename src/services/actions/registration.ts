import { getCookie } from "../../utils/getCookie";
import { setCookie } from "../../utils/setCookie";
import { config } from "../../utils/config";
import { _getResponseData } from "../../utils/get-response-data";
import { Dispatch } from "react";

export const REGISTRATION_REQUEST: "REGISTRATION_REQUEST" =
  "REGISTRATION_REQUEST";
export const REGISTRATION_SUCCESS: "REGISTRATION_SUCCESS" =
  "REGISTRATION_SUCCESS";
export const REGISTRATION_FAILED: "REGISTRATION_FAILED" = "REGISTRATION_FAILED";
export const REGISTRATION_OUT: "REGISTRATION_OUT" = "REGISTRATION_OUT";
export const REGISTRATION_SET_DATA: "REGISTRATION_SET_DATA" =
  "REGISTRATION_SET_DATA";
export const REGISTRATION_AUTH_CHANGE: "REGISTRATION_AUTH_CHANGE" =
  "REGISTRATION_AUTH_CHANGE";

export interface IRegistrationRequest {
  readonly type: typeof REGISTRATION_REQUEST;
}

export interface IRegistrationSuccess {
  readonly type: typeof REGISTRATION_SUCCESS;
  readonly user: { name: string; email: string };
}

export interface IRegistrationFailed {
  readonly type: typeof REGISTRATION_FAILED;
  readonly message?: string;
}

export interface IRegistrationOut {
  readonly type: typeof REGISTRATION_OUT;
}

export interface IRegistrationSetData {
  readonly type: typeof REGISTRATION_SET_DATA;
  readonly user: { name: string; email: string };
}

export interface IRegistrationAuthChange {
  readonly type: typeof REGISTRATION_AUTH_CHANGE;
  readonly status: boolean;
}

export type TRegistrationActions =
  | IRegistrationRequest
  | IRegistrationSuccess
  | IRegistrationFailed
  | IRegistrationOut
  | IRegistrationSetData
  | IRegistrationAuthChange;

export function registrationRequest(
  email: string,
  password: string,
  name: string,
) {
  return function (dispatch: Dispatch<TRegistrationActions>) {
    dispatch({
      type: REGISTRATION_REQUEST,
    });
    fetch(`${config.baseUrl}/auth/register`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      }),
    })
      .then(_getResponseData)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: REGISTRATION_SUCCESS,
            user: res.data.user,
          });
          setCookie("accessToken", res.accessToken.replace(/Bearer /, ""), {
            expires: 60 * 19,
          });
          setCookie("refreshToken", res.refreshToken, {
            expires: 60 * 60 * 24 * 30,
          });
        } else {
          dispatch({
            type: REGISTRATION_FAILED,
            message: res.message,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: REGISTRATION_FAILED,
        });
        console.error(err);
      });
  };
}

export function autorizationRequest(email: string, password: string) {
  return function (dispatch: Dispatch<TRegistrationActions>) {
    dispatch({
      type: REGISTRATION_REQUEST,
    });
    fetch(`${config.baseUrl}/auth/login`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(_getResponseData)
      .then((res) => {
        if (res && res.success) {
          console.log(res.user);
          dispatch({
            type: REGISTRATION_SUCCESS,
            user: res.user,
          });

          setCookie("accessToken", res.accessToken.replace(/Bearer /, ""), {
            expires: 60 * 19,
          });
          setCookie("refreshToken", res.refreshToken, {
            expires: 60 * 60 * 24 * 30,
          });
        } else {
          dispatch({
            type: REGISTRATION_FAILED,
            message: res.message,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: REGISTRATION_FAILED,
        });
        console.error(err);
      });
  };
  console.log(2);
}

export async function refreshToken(): Promise<{
  success: boolean;
  accessToken: string;
  refreshToken: string;
}> {
  const res = await fetch(`${config.baseUrl}/auth/token`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  })
    .then(_getResponseData)
    .then((res) => {
      if (res && res.success) {
        setCookie("accessToken", res.accessToken.replace(/Bearer /, ""), {
          expires: 60 * 19,
        });
        setCookie("refreshToken", res.refreshToken, {
          expires: 60 * 60 * 24 * 30,
        });
      }
      return res;
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
  return res;
}
