import React, { useEffect, useRef } from "react";

import SideBar from "./SideBar";
import { Stack } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket, socket } from "../../Stomp";
import {
  FetchUserProfile,
  SelectConversation,
  ShowSnackbar,
} from "../../Redux/slices/app";
import useResponsive from "../../hooks/useResponsive";
import {
  UpdateConversation,
  AddConversation,
  AddMessage,
  FetchConversations,
  updateConversation,
  setCurrentConversation,
  fetchCurrentMessages,
  addMessagesThunk,
  removeConversationThunk,
  updateConversationThunk,
} from "../../Redux/slices/conversation";
import { useConversations } from "../../hooks/useConversations";
import { useFriend } from "../../hooks/useFriend";

// const isAuthendicated = f;/
/**
 * Layout thanh navbar chứa các button chứa năng ảnh đại diện và logo web
 * @returns {Component}
 */
const DashboardLayout = () => {
  const { isLoggedIn, token } = useSelector((state) => state.auth);

  const { conversations, current_conversation } = useSelector(
    (state) => state.conversation
  );

  const { getConversations } = useConversations();

  const { getFriends, getFriendRequests } = useFriend();

  console.log("reder conversation when dispatch action", conversations);

  const isDesktop = useResponsive("up", "md");
  const dispatch = useDispatch();

  const handleReceiveMessage = (message) => {
    console.log(`du lieu nhan ${message.body}`);

    const data = JSON.parse(message.body);

    console.log(
      "add messs",
      data?.sender?.id,
      current_conversation,
      conversations
    );
    dispatch(addMessagesThunk(data));
    dispatch(updateConversationThunk(data));
  };

  const handleCloseSocket = function (event) {
    if (socket) {
      socket.deactivate();
      console.log("socket disconnect");
    }
  };

  // handle socket connet
  useEffect(() => {
    if (isLoggedIn) {
      console.log("conversation render ", conversations);

      const onConnect = function (frame) {
        console.log("Connect is successfully!");

        socket.subscribe("/user/queue/message", handleReceiveMessage);

        socket.subscribe("/user/queue/conversation/delete", (message) => {
          console.log(`du lieu nhan delete conversation ${message.body}`);

          const data = JSON.parse(message.body);

          dispatch(removeConversationThunk(data.data));
        });
      };
      if (!socket) {
        connectSocket(token, onConnect);
      }

      // window.addEventListener("beforeunload", handleCloseSocket);
    }
    // cleanup code that disconnects from that system.
    return () => {
      // socket.deactivate()
      // window.removeEventListener("beforeunload", handleCloseSocket);
      console.log("unmount");
    };
  }, [isLoggedIn]);

  useEffect(() => {
    getConversations();

    dispatch(FetchUserProfile());
    dispatch(setCurrentConversation(null));
    dispatch(fetchCurrentMessages({ messages: [] }));
    getFriendRequests();
    getFriends();

    dispatch(SelectConversation({ chatType: null }));
  }, [isLoggedIn]);

  // // chuyern ve trang login nếu chưa xác thực
  // if (!isLoggedIn) {
  //   return <Navigate to="/auth/login" replace={true} />;
  // }

  // jsx render ra component navbar
  return (
    <>
      <Stack
        direction="row"
        sx={{ height: "100vh", width: "100vw", overflow: "hidden" }}
      >
        {isDesktop && (
          // SideBar
          <SideBar />
        )}

        <Outlet />
      </Stack>
      {/* {open_audio_notification_dialog && (
        <AudioCallNotification open={open_audio_notification_dialog} />
      )}
      {open_audio_dialog && (
        <AudioCallDialog
          open={open_audio_dialog}
          handleClose={handleCloseAudioDialog}
        />
      )}
      {open_video_notification_dialog && (
        <VideoCallNotification open={open_video_notification_dialog} />
      )}
      {open_video_dialog && (
        <VideoCallDialog
          open={open_video_dialog}
          handleClose={handleCloseVideoDialog}
        />
      )} */}
    </>
  );
};

export default DashboardLayout;
