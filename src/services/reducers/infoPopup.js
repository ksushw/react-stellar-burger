import { OPEN_INFO_POPUP, CLOSE_INFO_POPUP } from "../actions/infoPopup";

const initialState = {
  selectedOrderPopupIng: false,
};

export const infoPopupReducer = (state = initialState, action) => {
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
