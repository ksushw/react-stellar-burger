import { _getResponseData } from "../utils/get-response-data";
import { config } from "../utils/config";
import { getCookie } from "../utils/getCookie";
import { errorHandler } from "../utils/erorHandler";

errorHandler();

export async function resetPassvordApi(
  newPassword: string,
  code: string,
): Promise<boolean> {
  return fetch(`${config.baseUrl}/password-reset/reset`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      password: newPassword,
      token: code,
    }),
  })
    .then(_getResponseData)
    .then((res) => {
      if (res && res.success) {
        return true;
      } else {
        return false;
      }
    });
}

export async function logOut(): Promise<boolean> {
  return fetch(`${config.baseUrl}/auth/logout`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  })
    .then(_getResponseData)
    .then((res) => {
      if (res && res.success) {
        return true;
      } else {
        return false;
      }
    });
}

export async function userInfoRequest(): Promise<
  false | { name: string; email: string }
> {
  return window
    .fetchAuth(`${config.baseUrl}/auth/user`, {
      method: "GET",
      headers: {
        ...config.headers,
        authorization: "Bearer " + getCookie("accessToken"),
      },
    })
    .then(_getResponseData)
    .then((res) => {
      if (res && res.success) {
        return { name: res.name, email: res.email };
      } else {
        return false;
      }
    });
}

export async function userInfoChangeRequest(info: {
  name: string;
  email: string;
}): Promise<{
  name: string;
  email: string;
}> {
  return window
    .fetchAuth(`${config.baseUrl}/auth/user`, {
      method: "PATCH",
      headers: {
        ...config.headers,
        authorization: "Bearer " + getCookie("accessToken"),
      },
      body: JSON.stringify(info),
    })
    .then(_getResponseData)
    .then((res) => {
      if (res && res.success) {
        return res.user;
      } else {
        return null;
      }
    });
}
