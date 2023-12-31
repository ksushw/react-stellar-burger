import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
} from "../actions/orders";
import { TOrdersActions } from "../actions/orders";
import { IOrder } from "../../utils/types";

type TInitialState = {
  wsConnected: boolean;
  orders: ReadonlyArray<IOrder> | null;
  total: number;
  totalToday: number;
  error: string | undefined;
};

const initialState: TInitialState = {
  wsConnected: false,
  orders: null,
  total: 0,
  totalToday: 0,
  error: undefined,
};

export const ordersReducer = (state = initialState, action: TOrdersActions) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...initialState,
        wsConnected: false,
      };
    case WS_GET_ORDERS:
      return {
        ...state,
        error: undefined,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    default:
      return state;
  }
};
