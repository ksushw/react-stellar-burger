export const OPEN_INFO_POPUP: "OPEN_INFO_POPUP" = "OPEN_INFO_POPUP";
export const CLOSE_INFO_POPUP: "CLOSE_INFO_POPUP" = "CLOSE_INFO_POPUP";

export interface IOpenInfoPopup {
  readonly type: typeof OPEN_INFO_POPUP;
}

export interface ICloseInfoPopup {
  readonly type: typeof CLOSE_INFO_POPUP;
}

export type TInfoPopupActions = IOpenInfoPopup | ICloseInfoPopup;
