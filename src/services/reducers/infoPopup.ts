import { OPEN_INFO_POPUP, CLOSE_INFO_POPUP } from "../actions/infoPopup";
import { TInfoPopupActions } from "../actions/infoPopup";

type TInitialState = {
  selectedOrderPopupIng: boolean;
};

const initialState: TInitialState = {
  selectedOrderPopupIng: false,
};

export const infoPopupReducer = (
  state = initialState,
  action: TInfoPopupActions,
) => {
  switch (action.type) {
    case OPEN_INFO_POPUP: {
      return {
        ...state,
        selectedOrderPopupIng: true,
      };
    }
    case CLOSE_INFO_POPUP: {
      return {
        ...initialState,
      };
    }
    default: {
      return state;
    }
  }
};
