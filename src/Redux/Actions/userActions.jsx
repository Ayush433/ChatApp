import {
  USER_SIGNING_FAIL,
  USER_SIGNING_REQUEST,
  USER_SIGNING_SUCCESS,
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
