import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
} from "../actions/ingredients";
import { TGetItemActions } from "../actions/ingredients";
import { IIngredient } from "../../utils/types";

type TInitialState = {
  items: ReadonlyArray<IIngredient>;
  itemsRequest: boolean;
  itemsFailed: boolean;
};

const initialState: TInitialState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
};

export const ingredientReducer = (
  state = initialState,
  action: TGetItemActions,
) => {
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
        items: action.data,
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
    default: {
      return state;
    }
  }
};
