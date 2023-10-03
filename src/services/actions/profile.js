export const RESTORE_PASSWORD_REQUEST = "RESTORE_PASSWORD_REQUEST";
export const RESTORE_PASSWORD_SUCCESS = "RESTORE_PASSWORD_SUCCESS";
export const RESTORE_PASSWORD_FAILED = "RESTORE_PASSWORD_FAILED";
export const RESTORE_PASSWORD_CLEAN = "RESTORE_PASSWORD_CLEAN";

const config = {
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
  },
};

const _getResponseData = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
};

export function profileDataChange(email) {
  return function (dispatch) {
    dispatch({
      type: RESTORE_PASSWORD_REQUEST,
    });
    fetch(`${config.baseUrl}/password-reset`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({
        email: email,
      }),
    })
      .then(_getResponseData)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: RESTORE_PASSWORD_SUCCESS,
            message: res.message,
          });
        } else {
          dispatch({
            type: RESTORE_PASSWORD_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: RESTORE_PASSWORD_FAILED,
        });
        console.error(err);
      });
  };
}
