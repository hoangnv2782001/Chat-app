import React, { useEffect, useRef } from "react";

import SideBar from "./SideBar";
import { Stack } from "@mui/material";
import {  Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket, socket } from "../../Stomp";
import {
  FetchUserProfile,

} from "../../Redux/slices/app";
import useResponsive from "../../hooks/useResponsive";
import {


  addMessagesThunk,
  removeConversationThunk,
  setCurrentConversation,
  updateConversationThunk,

} from "../../Redux/slices/conversation";
import { useConversations } from "../../hooks/useConversations";
import { useFriend } from "../../hooks/useFriend";
import useGroup from "../../hooks/useGroup";

// const isAuthendicated = f;/
/**
 * Layout thanh navbar chứa các button chứa năng ảnh đại diện và logo web
 * @returns {Component}
 */
const DashboardLayout = () => {
  const { isLoggedIn, token } = useSelector((state) => state.auth);
  const {getGroups} = useGroup()
  const { conversations,current_conversation } = useSelector(
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

        socket.subscribe("/user/queue/notification", (message) => {
        

          const data = JSON.parse(message.body);
          console.log(`du lieu nhan delete conversation `,data);
          if(data.action === 'DELETE_CONVERSATION'){

            console.log("delete conversation")
            dispatch(removeConversationThunk(data.data));
           
          } else if(data.action === 'ADD_GROUP' || 'REMOVE_GROUP'){

            if(current_conversation?.id === data.data){
              dispatch(setCurrentConversation({chatType : null,conversation : null}))
            }
            getGroups();
          }
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
    getFriendRequests();
    getFriends();
    getGroups()
   
  },[]);

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
    
    </>
  );
};

export default DashboardLayout;
