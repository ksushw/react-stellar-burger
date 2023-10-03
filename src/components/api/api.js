import { _getResponseData } from "../../utils/get-response-data";
import { config } from "../../utils/config";
import { getCookie } from "../../utils/getCookie";
import { errorHandler } from "../../utils/erorHandler";

errorHandler();

export async function resetPassvordApi(newPassword, code) {
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
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function logOut() {
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
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function userInfoRequest() {
  return window
    .fetchAuth(`${config.baseUrl}/auth/user`, {
      method: "GET",
      headers: config.headers,
    })
    .then(_getResponseData)
    .then((res) => {
      return res.user;
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function userInfoChangeRequest(info) {
  return window
    .fetchAuth(`${config.baseUrl}/auth/user`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify(info),
    })
    .then(_getResponseData)
    .then((res) => {
      return res.user;
    })
    .catch((err) => {
      console.log(err);
    });
}
