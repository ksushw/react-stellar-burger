import {
  RESTORE_PASSWORD_REQUEST,
  RESTORE_PASSWORD_SUCCESS,
  RESTORE_PASSWORD_FAILED,
  RESTORE_PASSWORD_CLEAN,
} from "../actions/profile";
import { TUserOrdersActions } from "../actions/profile";

type IInitialState = {
  changePasswordMessage: string;
  isPasswordChanged: boolean;
  changePasswordRequest: boolean;
  changePasswordFailed: boolean;
};

const initialState = {
  changePasswordMessage: "",
  isPasswordChanged: false,
  changePasswordRequest: false,
  changePasswordFailed: false,
};

export const changePasswordReducer = (
  state = initialState,
  action: TUserOrdersActions,
) => {
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
        isPasswordChanged: true,
      };
    }
    case RESTORE_PASSWORD_FAILED: {
      return {
        ...initialState,
        orderFailed: true,
      };
    }
    case RESTORE_PASSWORD_CLEAN: {
      return {
        ...initialState,
      };
    }
    default: {
      return state;
    }
  }
};
