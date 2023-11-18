import {
  WS_CONNECTION_USER_SUCCESS,
  WS_CONNECTION_USER_ERROR,
  WS_CONNECTION_USER_CLOSED,
  WS_GET_USER_ORDERS,
} from "../actions/userOrders";
import { TUserOrdersActions } from "../actions/userOrders";
import { IOrder } from "../../utils/types";

type IInitialState = {
  wsConnected: boolean;
  orders: ReadonlyArray<IOrder>;
  total: number;
  totalToday: number;
  error: string;
};

const initialState: IInitialState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: "",
};

export const ordersUserReducer = (
  state = initialState,
  action: TUserOrdersActions,
): IInitialState => {
  switch (action.type) {
    case WS_CONNECTION_USER_SUCCESS:
      return {
        ...state,
        error: "",
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
        error: "",
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    default:
      return state;
  }
};
