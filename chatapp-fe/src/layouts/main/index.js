import { Container, Stack } from "@mui/material";
import React from "react";
import Logo from "../../assets/Images/logo.ico";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";


/**
 * Layout chinh cua app
 * @returns {Component}
 */
const MainLayout = () => {
 
  const token = localStorage.getItem("token") ||  ""
  if (token) {
    return <Navigate to="/app" replace={true}/>;
  }

  return (
    <>
      <Container sx={{ mt: 5 }} maxWidth="sm">
        {/* Logo web main layout */}
        <Stack spacing={5}>
          <Stack
            sx={{ width: "100%" }}
            alignItems={"center"}
            direction="column"
          >
            <img
              style={{ width: 120, height: 120 }}
              src={Logo}
              alt="chat app logo"
            />
          </Stack>
        </Stack>
        {/* hien thi comonent sau khi truy cap riuter */}
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
