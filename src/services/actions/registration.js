import { useNavigate } from "react-router-dom";

export const REGISTRATION_REQUEST = "REGISTRATION_REQUEST";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_FAILED = "REGISTRATION_FAILED";
export const REGISTRATION_OUT = "REGISTRATION_OUT";

export const REFRESH = "REFRESH";
export const REFRESH_FAILED = "REFRESH_FAILED";

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

export function registrationRequest(email, password, name) {
  return function (dispatch) {
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
            data: res,
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

export function autorizationReques(email, password) {
  return function (dispatch) {
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
          dispatch({
            type: REGISTRATION_SUCCESS,
            data: res,
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

export function autorizationRequest(email, password) {
  return function (dispatch) {
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
          dispatch({
            type: REGISTRATION_SUCCESS,
            data: res,
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

export function refreshToken(reToken) {
  return function (dispatch) {
    fetch(`${config.baseUrl}/auth/token`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({
        token: reToken,
      }),
    })
      .then(_getResponseData)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: REFRESH,
            data: res,
          });
        } else {
          dispatch({
            type: REFRESH_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: REFRESH_FAILED,
        });
        console.error(err);
      });
  };
}
