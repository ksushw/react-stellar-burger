import {
  RESTORE_PASSWORD_REQUEST,
  RESTORE_PASSWORD_SUCCESS,
  RESTORE_PASSWORD_FAILED,
} from "../actions/profile";

const initialState = {
  changePasswordMessage: "xuy",
  changePasswordRequest: false,
  changePasswordFailed: false,
};

export const changePasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESTORE_PASSWORD_REQUEST: {
      return {
        ...state,
        changePasswordRequest: true,
      };
    }
    case RESTORE_PASSWORD_SUCCESS: {
      return {
        ...state,
        changePasswordMessage: action.message,
        changePasswordRequest: false,
        changePasswordFailed: false,
      };
    }
    case RESTORE_PASSWORD_FAILED: {
      return {
        ...initialState,
        orderFailed: true,
      };
    }
    default: {
      return state;
    }
  }
};
