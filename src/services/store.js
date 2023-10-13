import { compose, createStore, applyMiddleware } from "redux";
import { rootReducer } from "./reducers";
import thunk from "redux-thunk";
import { socketMiddleware } from "./middleware/socketMiddleware";

import { getCookie } from "../utils/getCookie";

export const wsUrl = `wss://norma.nomoreparties.space/orders/all`;

export const wsPersonalUrl = `wss://norma.nomoreparties.space/orders?token=${getCookie(
  "accessToken",
)}`;

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    socketMiddleware(wsUrl),
    socketMiddleware(wsPersonalUrl),
  ),
);

export const store = createStore(rootReducer, enhancer);
