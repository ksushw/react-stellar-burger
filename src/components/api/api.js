import { _getResponseData } from "../../utils/get-response-data";
import { config } from "../../utils/config";

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

export async function logOut(token) {
  return fetch(`${config.baseUrl}/auth/logout`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      token: token,
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
