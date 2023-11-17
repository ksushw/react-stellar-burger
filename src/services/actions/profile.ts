import { config } from "../../utils/config";
import { _getResponseData } from "../../utils/get-response-data";
import { Dispatch } from "react";

export const RESTORE_PASSWORD_REQUEST: "RESTORE_PASSWORD_REQUEST" =
  "RESTORE_PASSWORD_REQUEST";
export const RESTORE_PASSWORD_SUCCESS: "RESTORE_PASSWORD_SUCCESS" =
  "RESTORE_PASSWORD_SUCCESS";
export const RESTORE_PASSWORD_FAILED: "RESTORE_PASSWORD_FAILED" =
  "RESTORE_PASSWORD_FAILED";
export const RESTORE_PASSWORD_CLEAN: "RESTORE_PASSWORD_CLEAN" =
  "RESTORE_PASSWORD_CLEAN";

export interface IRestorePasswordRequest {
  readonly type: typeof RESTORE_PASSWORD_REQUEST;
}

export interface IRestorePasswordSuccess {
  readonly type: typeof RESTORE_PASSWORD_SUCCESS;
  readonly message: string;
}

export interface IRestorePasswordFailed {
  readonly type: typeof RESTORE_PASSWORD_FAILED;
}

export interface IRestorePasswordClean {
  readonly type: typeof RESTORE_PASSWORD_CLEAN;
}

export type TRestorePasswordActions =
  | IRestorePasswordRequest
  | IRestorePasswordSuccess
  | IRestorePasswordFailed
  | IRestorePasswordClean;

export function profileDataChange(email: string) {
  return function (dispatch: Dispatch<TRestorePasswordActions>) {
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
