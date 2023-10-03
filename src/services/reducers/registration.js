import {
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  REGISTRATION_OUT,
  REGISTRATION_SET_DATA,
} from "../actions/registration";

const initialState = {
  user: {},
  isAuth: false,
  autorizationRequest: false,
  autorizationFailed: false,
};

export const regisrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTRATION_REQUEST: {
      return {
        ...state,
        autorizationRequest: true,
      };
    }
    case REGISTRATION_SUCCESS: {
      return {
        ...state,
        user: action.data.user,
        autorizationRequest: false,
        isAuth: true,
      };
    }
    case REGISTRATION_SET_DATA: {
      return {
        ...state,
        user: action.user,
      };
    }
    case REGISTRATION_FAILED: {
      return {
        ...initialState,
        autorizationFailed: true,
      };
    }
    case REGISTRATION_OUT: {
      return {
        ...initialState,
        isAuth: false,
      };
    }

    default: {
      return state;
    }
  }
};
