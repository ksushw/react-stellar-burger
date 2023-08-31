import { combineReducers } from "redux";
import { ingridientReducer } from "./ingridients";

export const rootReducer = combineReducers({
  ingridientReducer,
});
