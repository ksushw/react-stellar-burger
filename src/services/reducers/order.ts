import {
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_FAILED,
} from "../actions/order";
import { TSendOrderActions } from "../actions/order";

type TInitialState = {
  order: number | null;
  orderRequest: boolean;
  orderFailed: boolean;
};

const initialState: TInitialState = {
  order: null,
  orderRequest: false,
  orderFailed: false,
};

export const orderReducer = (
  state = initialState,
  action: TSendOrderActions,
): TInitialState => {
  switch (action.type) {
    case SEND_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case SEND_ORDER_SUCCESS: {
      return {
        ...state,
        order: action.order?.number,
        orderRequest: false,
      };
    }
    case SEND_ORDER_FAILED: {
      return {
        ...state,
        order: initialState.order,
        orderRequest: false,
        orderFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
