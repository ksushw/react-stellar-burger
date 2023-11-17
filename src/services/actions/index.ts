import { TConstructorActions } from "./constructor";
import { TInfoPopupActions } from "./infoPopup";
import { TGetItemActions } from "./ingredients";
import { TUserOrdersActions } from "./userOrders";
import { TSendOrderActions } from "./order";
import { TOrdersActions } from "./orders";
import { TRestorePasswordActions } from "./profile";
import { TRegistrationActions } from "./registration";

export type TTodoActions =
  | TConstructorActions
  | TInfoPopupActions
  | TGetItemActions
  | TUserOrdersActions
  | TSendOrderActions
  | TOrdersActions
  | TRestorePasswordActions
  | TRegistrationActions;
