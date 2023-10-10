import {
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  REGISTRATION_OUT,
  REGISTRATION_SET_DATA,
  REGISTRATION_AUTH_CHANGE,
} from "../actions/registration";

const initialState = {
  user: {},
  isAuth: false,
  tokenPending: false,
  autorizationRequest: false,
  autorizationFailed: false,
};

export const regisrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTRATION_REQUEST: {
      return {
        ...state,
        autorizationRequest: true,
        tokenPending: true,
      };
    }
    case REGISTRATION_SUCCESS: {
      return {
        ...state,
        user: action.data.user,
        autorizationRequest: false,
        tokenPending: false,
        isAuth: true,
      };
    }
    case REGISTRATION_SET_DATA: {
      return {
        ...state,
        user: action.user,
      };
    }
    case REGISTRATION_AUTH_CHANGE: {
      return {
        ...state,
        isAuth: action.status,
      };
    }
    case REGISTRATION_FAILED: {
      return {
        ...initialState,
        autorizationFailed: true,
        tokenPending: false,
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
