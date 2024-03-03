import { Box, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { Chat_History } from "../../data";
import {
  DocxMessage,
  LinkMessage,
  MediaMessage,
  ReplyMessage,
  TextMessage,
  TimeLine,
} from "./MessageTypes";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentConversation } from "../../Redux/slices/conversation";
/**
 * Hiển thi khung chat
 * @param {Boolean} menu
 * @returns {Component}
 */
const Message = ({ isMobile, menu }) => {
  const dispatch = useDispatch();

  const { conversations, messages } = useSelector(
    (state) => state.conversation
  );
  const {id} = useSelector(
    (state) => state.app?.user
     );

  // useEffect(() => {
  //   const current = conversations.find((el) => el?.id === room_id);

  //   // socket.emit("get_messages", { conversation_id: current?.id }, (data) => {
  //   //   // data => list of messages
  //   //   console.log(data, "List of messages");
  //   //   dispatch(FetchCurrentMessages({ messages: data }));
  //   // });

  //   dispatch(SetCurrentConversation(current));
  // }, []);
  return (
    <Box p={3} sx={{backgroundColor:"#fff"}}>
      <Stack spacing={0.5} >
        {/* xử lí message theo type */}
        {messages &&
          messages.map((message) => {
            switch (message?.type) {
              case "FILE":
                return <DocxMessage message={message} menu={menu} id ={id} />;
              case "LINK":
                return <LinkMessage message={message} menu={menu} id ={id} />;
              case "IMAGE":
                return <MediaMessage message={message} menu={menu} id ={id} />;
              case "reply":
                return <ReplyMessage message={message} menu={menu} id ={id} />;
              case "TEXT":
                //Default tin nhan là text
                return <TextMessage message={message} menu={menu} id ={id} />;
              default:
                return null;
            }
          })}
      </Stack>
    </Box>
  );
};

export default Message;
