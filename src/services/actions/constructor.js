import { v4 as uuid4 } from "uuid";

export const ADD_FILLING = "ADD_ITEM";
export const DELETE_FILLING = "DELETE_FILLING";
export const REMOVE_ORDER = "REMOVE_FILLING";
export const CHANGE_BUN = "CHANGE_BUN";
export const EDIT_ORDER_DND = "EDIT_ORDER_DND";

export const addIngridient = (item) => {
  return {
    type: ADD_FILLING,
    item: {
      ...item,
      uniqueId: uuid4(),
    },
  };
};
