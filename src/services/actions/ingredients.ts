import { _getResponseData } from "../../utils/get-response-data";
import { config } from "../../utils/config";
import { Dispatch } from "react";
import { IIngredient } from "../../utils/types";

export const GET_ITEMS_REQUEST: "GET_ITEMS_REQUEST" = "GET_ITEMS_REQUEST";
export const GET_ITEMS_SUCCESS: "GET_ITEMS_SUCCESS" = "GET_ITEMS_SUCCESS";
export const GET_ITEMS_FAILED: "GET_ITEMS_FAILED" = "GET_ITEMS_FAILED";

export interface IGetItemRequest {
  readonly type: typeof GET_ITEMS_REQUEST;
}

export interface IGetItemSuccess {
  readonly type: typeof GET_ITEMS_SUCCESS;
  readonly data: ReadonlyArray<IIngredient>;
}

export interface IGetItemFailed {
  readonly type: typeof GET_ITEMS_FAILED;
}

export type TGetItemActions =
  | IGetItemRequest
  | IGetItemSuccess
  | IGetItemFailed;

export function getIngredients() {
  return function (dispatch: Dispatch<TGetItemActions>) {
    dispatch({
      type: GET_ITEMS_REQUEST,
    });
    fetch(`${config.baseUrl}/ingredients`)
      .then(_getResponseData)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_ITEMS_SUCCESS,
            data: res.data,
          });
        } else {
          dispatch({
            type: GET_ITEMS_FAILED,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_ITEMS_FAILED,
        });
      });
  };
}
