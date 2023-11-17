import { IIngredient } from "../../utils/types";

export const ADD_FILLING: "ADD_FILLING" = "ADD_FILLING";
export const DELETE_FILLING: "DELETE_FILLING" = "DELETE_FILLING";
export const REMOVE_ORDER: "REMOVE_ORDER" = "REMOVE_ORDER";
export const CHANGE_BUN: "CHANGE_BUN" = "CHANGE_BUN";
export const EDIT_ORDER_DND: "EDIT_ORDER_DND" = "EDIT_ORDER_DND";

export interface IChangeBun {
  readonly type: typeof CHANGE_BUN;
  readonly item: IIngredient;
}

export interface IAddFilling {
  readonly type: typeof ADD_FILLING;
  readonly item: IIngredient;
}

export interface IDeleteFilling {
  readonly type: typeof DELETE_FILLING;
  readonly index: number;
  readonly price: number;
}

export interface IRemoveOrder {
  readonly type: typeof REMOVE_ORDER;
}

export interface IEditOrderDnd {
  readonly type: typeof EDIT_ORDER_DND;
  order: ReadonlyArray<IIngredient>;
}

export type TConstructorActions =
  | IChangeBun
  | IAddFilling
  | IDeleteFilling
  | IRemoveOrder
  | IEditOrderDnd;

export const addIngridient = (item: IIngredient): IAddFilling => {
  return {
    type: ADD_FILLING,
    item: {
      ...item,
    },
  };
};
