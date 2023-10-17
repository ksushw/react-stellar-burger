import { combineReducers } from "redux";
import { ingredientReducer } from "./ingredients";
import { constructorReducer } from "./constructor";
import { orderReducer } from "./order";
import { infoPopupReducer } from "./infoPopup";
import { changePasswordReducer } from "./profile";
import { regisrationReducer } from "./registration";
import { ordersReducer } from "./orders";
import { ordersUserReducer } from "./userOrders";

export const rootReducer = combineReducers({
  ingredientReducer,
  constructorReducer,
  orderReducer,
  infoPopupReducer,
  changePasswordReducer,
  regisrationReducer,
  ordersReducer,
  ordersUserReducer,
});
