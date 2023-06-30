import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Auth = () => {
  const { userInfo } = localStorage.getItem("userInfo");
  console.log(userInfo);
  const location = useLocation();
  return userInfo === null ? <Navigate to="/signIn" replace /> : <Outlet />;
};

export default Auth;
