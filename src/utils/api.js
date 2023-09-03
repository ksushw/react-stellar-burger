import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
} from "../services/actions/ingridients";

import {
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_FAILED,
} from "../services/actions/order";

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

export function getIngridients() {
  return function (dispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST,
    });
    fetch(`https://norma.nomoreparties.space/api/ingredients`)
      .then(_getResponseData)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_ITEMS_SUCCESS,
            data: res.data,
          });
        } else {
          dispatch({
            type: GET_ITEMS_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_ITEMS_FAILED,
        });
      });
  };
}

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
