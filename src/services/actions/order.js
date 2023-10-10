import { config } from "../../utils/config";
import { _getResponseData } from "../../utils/get-response-data";
import { errorHandler } from "../../utils/erorHandler";

errorHandler();

export const SEND_ORDER_REQUEST = "SEND_ORDER_REQUEST";
export const SEND_ORDER_SUCCESS = "SEND_ORDER_SUCCESS";
export const SEND_ORDER_FAILED = "SEND_ORDER_FAILED";

export function sendOrder(order) {
  return function (dispatch) {
    dispatch({
      type: SEND_ORDER_REQUEST,
    });
    window
      .fetchAuth(`${config.baseUrl}/orders`, {
        method: "POST",
        headers: config.headers,
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
        } else {
          dispatch({
            type: SEND_ORDER_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: SEND_ORDER_FAILED,
        });
      });
  };
}
