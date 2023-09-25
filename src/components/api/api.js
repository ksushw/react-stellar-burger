import { _getResponseData } from "../../utils/get-response-data";
import { config } from "../../utils/config";

export function resetPassvordApi(newPassword, code) {
  function request() {
    fetch(`${config.baseUrl}/password-reset/reset`, {
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
  return request();
}
