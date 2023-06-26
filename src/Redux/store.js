import { createStore, combineReducers } from "redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { userReducerSignIn } from "./Reducer/userReducer";

const reducer = combineReducers({
  signIn: userReducerSignIn,
});

//initial state
let initialState = {
  signIn: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};
const middleware = [thunk];
const store = configureStore({
  reducer,
  initialState,
  middleware: [...getDefaultMiddleware(), ...middleware],
  devTools: process.env.NODE_ENV !== "production",
});
export default store;
