import {
  FETCH_ALL_USERS_FAILURE,
  FETCH_ALL_USERS_REQUEST,
  FETCH_ALL_USERS_SUCCESS,
  USER_SIGNING_FAIL,
  USER_SIGNING_REQUEST,
  USER_SIGNING_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
} from "../Constants/userConstants";
import axios from "axios";

export const userSignInAction = (user) => async (dispatch) => {
  try {
    dispatch({ type: USER_SIGNING_REQUEST });

    const { data } = await axios.post("http://localhost:4000/api/Login", user);

    localStorage.setItem("userInfo", JSON.stringify(data));

    dispatch({ type: USER_SIGNING_SUCCESS, payload: data });
    // toast.success("Login Successfully!");
  } catch (error) {
    dispatch({
      type: USER_SIGNING_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    });
    // toast.error("Please Check you Email and Password");
    console.error(error);
  }
};

export const userSignUpAction = (user) => async (dispatch) => {
  dispatch({ type: USER_SIGNUP_REQUEST });
  try {
    const { data } = await axios.post("http://localhost:4000/api/signUp", user);

    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload: error.response.data.error,
    });
  }
};

// all user
export const fetchAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ALL_USERS_REQUEST });

    const response = await fetch("http://localhost:4000/api/allUsers");
    const data = await response.json();

    dispatch({
      type: FETCH_ALL_USERS_SUCCESS,
      payload: data.message.user,
    });
  } catch (error) {
    dispatch({ type: FETCH_ALL_USERS_FAILURE, payload: error.message });
  }
};
