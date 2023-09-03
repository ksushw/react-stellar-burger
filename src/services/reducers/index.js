import { combineReducers } from "redux";
import { ingridientReducer } from "./ingridients";
import { constructorReducer } from "./constructor";
import { orderReducer } from "./order";
import { infoPopupReducer } from "./infoPopup";

export const rootReducer = combineReducers({
  ingridientReducer,
  constructorReducer,
  orderReducer,
  infoPopupReducer,
});
