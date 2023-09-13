export const SEND_ORDER_REQUEST = "SEND_ORDER_REQUEST";
export const SEND_ORDER_SUCCESS = "SEND_ORDER_SUCCESS";
export const SEND_ORDER_FAILED = "SEND_ORDER_FAILED";

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

export function sendOrder(order) {
  return function (dispatch) {
    dispatch({
      type: SEND_ORDER_REQUEST,
    });
    fetch(`${config.baseUrl}/orders`, {
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
