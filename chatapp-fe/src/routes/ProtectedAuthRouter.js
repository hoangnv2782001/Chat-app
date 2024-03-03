import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedAuthRouter = ({ children }) => {
  const location = useLocation();

 
  const { isLoggedIn } = useSelector((state) => state.auth);

  const token = localStorage.getItem("token") || "";

  console.log("path ",location.pathname,isLoggedIn,token)

  // useEffect(() => {
  //   if (!isLoggedIn && !token && !location.pathname.includes("auth")) {
  //     // Nếu không đăng nhập và không có token và không phải trang đăng nhập, chuyển hướng đến trang đăng nhập
  //     return <Navigate to={`/auth/login`} replace />;
  //   }
  // }, [isLoggedIn, token, location.pathname]);
  if (token) return children;
  

  if (!location.pathname.includes("auth"))
    return <Navigate to={`/auth/login`} replace />;

  return  <Navigate to={`/auth/login`} replace />;
};

export default ProtectedAuthRouter;
