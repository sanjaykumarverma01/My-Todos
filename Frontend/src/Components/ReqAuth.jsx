import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { loadData } from "../Utils/accessLocalStorage";

// 1. check if the user is Authenticated
// 2. If yes => redirect/navigate to the page/component that he/she was trying to access
// 3. Else navigate to Login page
const ReqAuth = ({ children }) => {
  console.log(children);
  const location = useLocation();
  const isAuth = useSelector((store) => store.AuthReducer.isAuth);
  let auth = loadData("isAuth");
  let token = loadData("token");
  if (isAuth || (token && auth)) {
    return children;
  }
  return (
    <Navigate
      to="/login"
      state={{
        from: location,
      }}
      replace
    />
  );
};

export { ReqAuth };
