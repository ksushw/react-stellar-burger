import { compose, createStore, applyMiddleware } from "redux";
import { rootReducer } from "./reducers";
import thunk from "redux-thunk";
import { socketMiddleware } from "./middleware/socketMiddleware";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_SEND_MESSAGE,
  WS_GET_ORDERS,
} from "./actions/orders";
import {
  WS_CONNECTION_USER_START,
  WS_CONNECTION_USER_SUCCESS,
  WS_CONNECTION_USER_ERROR,
  WS_CONNECTION_USER_CLOSED,
  WS_GET_USER_ORDERS,
} from "./actions/userOrders";

import { getCookie } from "../utils/getCookie";

export const wsUrl = `wss://norma.nomoreparties.space/orders/all`;

export const wsPersonalUrl = `wss://norma.nomoreparties.space/orders?token=${getCookie(
  "accessToken",
)}`;

const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ORDERS,
};

const wsUserActions = {
  wsInit: WS_CONNECTION_USER_START,
  onOpen: WS_CONNECTION_USER_SUCCESS,
  onClose: WS_CONNECTION_USER_CLOSED,
  onError: WS_CONNECTION_USER_ERROR,
  onMessage: WS_GET_USER_ORDERS,
};
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    socketMiddleware(wsUrl, wsActions),
    socketMiddleware(wsPersonalUrl, wsUserActions),
  ),
);

export const store = createStore(rootReducer, enhancer);
