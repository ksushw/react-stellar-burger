import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  ADD_FILLING,
  DELETE_FILLING,
  REMOVE_FILLING,
  CHANGE_BUN,
  OPEN_INFO_POPUP,
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_FAILED,
} from "../actions/action";

const initialState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,

  bun: {},
  fillings: [],
  price: 0,

  selectedOrderPopupIng: false,

  order: {},
  orderRequest: false,
  orderFailed: false,
};

export const ingridientReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        itemsFailed: false,
      };
    }
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        bun: action.data.find((elem) => {
          return elem.type === "bun";
        }),
        items: action.data,
        price: action.data.find((elem) => {
          return elem.type === "bun";
        }).price,
        itemsRequest: false,
      };
    }
    case GET_ITEMS_FAILED: {
      return {
        ...state,
        itemsRequest: false,
        itemsFailed: true,
      };
    }
    case ADD_FILLING: {
      return {
        ...state,
        fillings: [...state.fillings, action.item],
        price: state.price + action.item.price,
      };
    }
    case CHANGE_BUN: {
      return {
        ...state,
        bun: action.bun,
        price: state.price + action.bun.price - state.bun.price,
      };
    }
    case DELETE_FILLING: {
      return {
        ...state,
        fillings: state.fillings.filter(
          (item, index) => index !== action.index,
        ),
        price: state.price - action.price,
      };
    }
    case REMOVE_FILLING: {
      return {
        ...state,
        fillings: [],
        price: state.bun.price,
      };
    }
    case OPEN_INFO_POPUP: {
      return {
        ...state,
        selectedOrderPopupIng: action.ingredient,
      };
    }
    case SEND_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case SEND_ORDER_SUCCESS: {
      return {
        ...state,
        order: action.order.number,
        orderRequest: false,
      };
    }
    case SEND_ORDER_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
