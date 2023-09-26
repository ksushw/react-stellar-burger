import {
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  REGISTRATION_OUT,
  REFRESH,
  REFRESH_FAILED,
} from "../actions/registration";

const initialState = {
  user: {},
  accessToken: "",
  refreshToken: "",
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
        accessToken: action.data.accessToken,
        refreshToken: action.data.refreshToken,
        autorizationRequest: false,
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
      };
    }
    case REFRESH: {
      return {
        ...state,
        accessToken: action.data.accessToken,
        refreshToken: action.data.refreshToken,
      };
    }
    case REFRESH_FAILED: {
      return {
        ...state,
        accessToken: "",
        refreshToken: "",
      };
    }
    default: {
      return state;
    }
  }
};
