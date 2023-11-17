import { IIngredient } from "../../utils/types";

export const WS_CONNECTION_USER_START: "WS_CONNECTION_USER_START" =
  "WS_CONNECTION_USER_START";
export const WS_CONNECTION_USER_SUCCESS: "WS_CONNECTION_USER_SUCCESS" =
  "WS_CONNECTION_USER_SUCCESS";
export const WS_CONNECTION_USER_ERROR: "WS_CONNECTION_USER_ERROR" =
  "WS_CONNECTION_USER_ERROR";
export const WS_GET_USER_ORDERS: "WS_GET_USER_ORDERS" = "WS_GET_USER_ORDERS";
export const WS_CONNECTION_USER_CLOSED: "WS_CONNECTION_USER_CLOSED" =
  "WS_CONNECTION_USER_CLOSED";

export interface IConnectionUserStart {
  readonly type: typeof WS_CONNECTION_USER_START;
}

export interface IConnectionUserSuccess {
  readonly type: typeof WS_CONNECTION_USER_SUCCESS;
}

export interface IConnectionUserError {
  readonly type: typeof WS_CONNECTION_USER_ERROR;
  readonly payload: any;
}

export interface IConnectionUserOrders {
  readonly type: typeof WS_GET_USER_ORDERS;
  readonly payload: {
    orders: ReadonlyArray<{
      orders: ReadonlyArray<IIngredient>;
      total: number;
      totalToday: number;
    }>;
    total: number;
    totalToday: number;
    error: string | undefined;
  };
}

export interface IConnectionUserClosed {
  readonly type: typeof WS_CONNECTION_USER_CLOSED;
}

export type TUserOrdersActions =
  | IConnectionUserStart
  | IConnectionUserSuccess
  | IConnectionUserError
  | IConnectionUserOrders
  | IConnectionUserClosed;
