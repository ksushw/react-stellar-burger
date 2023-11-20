import {
  ADD_FILLING,
  DELETE_FILLING,
  REMOVE_ORDER,
  CHANGE_BUN,
  EDIT_ORDER_DND,
} from "../actions/constructor";
import { IIngredient } from "../../utils/types";
import { TConstructorActions } from "../actions/constructor";
import { v4 as uuid4 } from "uuid";

type TInitialState = {
  bun: IIngredient | null;
  fillings: ReadonlyArray<IIngredient & { uniqueId: string }>;
  price: number;
};

const initialState: TInitialState = {
  bun: null,
  fillings: [],
  price: 0,
};

export const constructorReducer = (
  state = initialState,
  action: TConstructorActions,
): TInitialState => {
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
        bun: action.item,
        price:
          state.price +
          action.item.price -
          (state.bun?.price ? state.bun?.price : 0),
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
    case REMOVE_ORDER: {
      return {
        ...initialState,
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
