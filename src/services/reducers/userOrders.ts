import {
  WS_CONNECTION_USER_SUCCESS,
  WS_CONNECTION_USER_ERROR,
  WS_CONNECTION_USER_CLOSED,
  WS_GET_USER_ORDERS,
} from "../actions/userOrders";
import { TUserOrdersActions } from "../actions/userOrders";

const initialState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: undefined,
};

export const ordersUserReducer = (
  state = initialState,
  action: TUserOrdersActions,
) => {
  switch (action.type) {
    case WS_CONNECTION_USER_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };
    case WS_CONNECTION_USER_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };
    case WS_CONNECTION_USER_CLOSED:
      return {
        ...initialState,
        wsConnected: false,
      };
    case WS_GET_USER_ORDERS:
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
