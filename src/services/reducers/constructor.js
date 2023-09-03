import {
  ADD_FILLING,
  DELETE_FILLING,
  REMOVE_FILLING,
  CHANGE_BUN,
  EDIT_ORDER_DND,
} from "../actions/constructor";

const initialState = {
  bun: {},
  fillings: [],
  price: 0,
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
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
        price:
          state.price +
          action.bun.price -
          (state.bun.price ? state.bun.price : 0),
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
    case EDIT_ORDER_DND: {
      return {
        ...state,
        fillings: action.order,
      };
    }
    default: {
      return state;
    }
  }
};
