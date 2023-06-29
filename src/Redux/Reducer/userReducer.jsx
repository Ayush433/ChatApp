import {
  FETCH_ALL_USERS_FAILURE,
  FETCH_ALL_USERS_REQUEST,
  FETCH_ALL_USERS_SUCCESS,
  USER_SIGNING_FAIL,
  USER_SIGNING_REQUEST,
  USER_SIGNING_RESET,
  USER_SIGNING_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_RESET,
  USER_SIGNUP_SUCCESS,
} from "../Constants/userConstants";

export const userReducerSignIn = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNING_REQUEST:
      return {
        loading: false,
        userInfo: action.payload,
        isAuthenticated: false,
      };
    case USER_SIGNING_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
        isAuthenticated: true,
      };
    case USER_SIGNING_FAIL:
      return { loading: false, userInfo: null, error: action.payload };
    case USER_SIGNING_RESET:
      return {};

    default:
      return state;
  }
};

//SignUp
export const userReducerSignUp = (state = {}, action) => {
  switch (action.type) {
    case USER_SIGNUP_REQUEST:
      return { loading: true };
    case USER_SIGNUP_SUCCESS:
      return {
        loading: false,
        userSignUp: action.payload,
      };
    case USER_SIGNUP_FAIL:
      return { loading: false, error: action.payload };
    case USER_SIGNUP_RESET:
      return {};
    default:
      return state;
  }
};
// all users
// reducer.js

const initialState = {
  loading: false,
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case FETCH_ALL_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
