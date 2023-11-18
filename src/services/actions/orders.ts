import { IOrders } from "../../utils/types";

export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" =
  "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" =
  "WS_CONNECTION_CLOSED";
export const WS_GET_ORDERS: "WS_GET_ORDERS" = "WS_GET_ORDERS";

export interface IConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
}

export interface IConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
  readonly message: string;
}

export interface IConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: string;
}

export interface IConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IGetOrders {
  readonly type: typeof WS_GET_ORDERS;
  readonly payload: IOrders;
}

export type TOrdersActions =
  | IConnectionStart
  | IConnectionSuccess
  | IConnectionError
  | IConnectionClosed
  | IGetOrders;
