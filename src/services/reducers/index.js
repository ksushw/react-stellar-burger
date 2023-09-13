import { combineReducers } from "redux";
import { ingredientReducer } from "./ingredients";
import { constructorReducer } from "./constructor";
import { orderReducer } from "./order";
import { infoPopupReducer } from "./infoPopup";

export const rootReducer = combineReducers({
  ingredientReducer,
  constructorReducer,
  orderReducer,
  infoPopupReducer,
});
