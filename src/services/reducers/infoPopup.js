import { OPEN_INFO_POPUP } from "../actions/infoPopup";

const initialState = {
  selectedOrderPopupIng: false,
};

export const infoPopupReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_INFO_POPUP: {
      return {
        ...state,
        selectedOrderPopupIng: action.ingredient,
      };
    }
    default: {
      return state;
    }
  }
};
