import {
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  REGISTRATION_OUT,
} from "../actions/registration";

const initialState = {
  user: {},
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

    default: {
      return state;
    }
  }
};
