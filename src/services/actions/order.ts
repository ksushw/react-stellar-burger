import { config } from "../../utils/config";
import { _getResponseData } from "../../utils/get-response-data";
import { errorHandler } from "../../utils/erorHandler";
import { getCookie } from "../../utils/getCookie";
import { AppThunk } from "../types/index";

errorHandler();

export const SEND_ORDER_REQUEST: "SEND_ORDER_REQUEST" = "SEND_ORDER_REQUEST";
export const SEND_ORDER_SUCCESS: "SEND_ORDER_SUCCESS" = "SEND_ORDER_SUCCESS";
export const SEND_ORDER_FAILED: "SEND_ORDER_FAILED" = "SEND_ORDER_FAILED";

export interface ISendOrderRequest {
  readonly type: typeof SEND_ORDER_REQUEST;
}

export interface ISendOrderSuccess {
  readonly type: typeof SEND_ORDER_SUCCESS;
  readonly order: { number: number };
}

export interface ISendOrderFailed {
  readonly type: typeof SEND_ORDER_FAILED;
}

export type TSendOrderActions =
  | ISendOrderRequest
  | ISendOrderSuccess
  | ISendOrderFailed;

export const sendOrder: AppThunk = (order: ReadonlyArray<string>) => {
  return function (dispatch) {
    dispatch({
      type: SEND_ORDER_REQUEST,
    });

    window
      .fetchAuth(`${config.baseUrl}/orders`, {
        method: "POST",
        headers: {
          ...config.headers,
          authorization: "Bearer " + getCookie("accessToken"),
        },
        body: JSON.stringify({
          ingredients: order,
        }),
      })
      .then(_getResponseData)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: SEND_ORDER_SUCCESS,
            order: res.order,
          });
          return true;
        } else {
          dispatch({
            type: SEND_ORDER_FAILED,
          });
          return false;
        }
      })
      .catch((err) => {
        dispatch({
          type: SEND_ORDER_FAILED,
        });
        return false;
      });
  };
};
