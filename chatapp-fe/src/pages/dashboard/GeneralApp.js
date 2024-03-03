import React, { Suspense, lazy } from "react";
import Chats from "./Chats.js";
import { Outlet, useSearchParams } from "react-router-dom";

import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/material";
import Convensation from "../../components/Conversation/index.js";
import { useTheme } from "@mui/material/styles";
import Contact from "../../components/Contact.js";
import { useSelector } from "react-redux";

import NoChatSvg from "../../assets/Illustration/NoChat.js";

/**
 * Hiển thi phần chính của app
 * @returns {Component}
 */

const GeneralApp = () => {
  const theme = useTheme();

  const { sidebar, chatType } = useSelector((state) => state.app);

  console.log("side bar:", sidebar);
  const [searchParams] = useSearchParams();

  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>
      {/* của sổ chat */}
      <Chats />
      <Box
        sx={{
          height: "100%",
          width: sidebar.open ? "calc(100vw - 740px)" : "calc(100vw - 460px)",
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F0F4FA"
              : theme.palette.background.paper,
          borderBottom:
            searchParams.get("type") === "individual-chat" &&
            searchParams.get("id")
              ? "0px"
              : "6px solid #0162C4",
        }}
      >
        {chatType ? (
          <Convensation />
        ) : (
          <Stack
            spacing={2}
            sx={{ height: "100%", width: "100%" }}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <NoChatSvg />
            <Typography variant="subtitle2">
              Select a conversation or start new one
            </Typography>
          </Stack>
        )}
      </Box>
      {/* contact cua user */}
      {/* {sidebar.open &&
        (() => {
          switch (sidebar.type) {
            case "CONTACT":
              return <Contact />;
            case "STARRED":
              return <StarredMessage />;

            case "SHARED":
              return <SharedMessages />;

            default:
              break;
          }
        })()} */}
    </Stack>
  );
};

export default GeneralApp;
