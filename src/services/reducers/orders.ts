import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS,
} from "../actions/orders";
import { TUserOrdersActions } from "../actions/orders";
import { IIngredient } from "../../utils/types";

type TInitialState = {
  wsConnected: boolean;
  orders: ReadonlyArray<{
    orders: ReadonlyArray<IIngredient>;
    total: number;
    totalToday: number;
  }>;
  total: number;
  totalToday: number;
  error: string | undefined;
};

const initialState: TInitialState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: undefined,
};

export const ordersReducer = (
  state = initialState,
  action: TUserOrdersActions,
) => {
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
