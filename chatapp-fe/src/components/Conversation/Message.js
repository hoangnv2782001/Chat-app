import { Avatar, Box, Stack } from "@mui/material";

import {
  DocxMessage,
  LinkMessage,
  MediaMessage,
  Notification,
  ReplyMessage,
  TextMessage,
} from "./MessageTypes";
import { useSelector } from "react-redux";
/**
 * Hiển thi khung chat
 * @param {Boolean} menu
 * @returns {Component}
 */
const Message = ({ menu }) => {
  const { messages } = useSelector((state) => state.conversation);
  const { id } = useSelector((state) => state.app?.user);
  return (
    <Box p={3} sx={{ backgroundColor: "#fff" }}>
      <Stack spacing={1}>
        {/* xử lí message theo type */}
        {messages &&
          messages.map((message, index) => {
            return (
              <Stack
                direction={"row"}
                spacing={1}
                justifyContent={
                  message.type === "NOTIFICATION"
                    ? "center"
                    : message.sender.id === id
                    ? "end"
                    : "start"
                }
                alignItems={"end"}
              >
                {message.sender.id !== id &&
                  message.type !== "NOTIFICATION" && (
                    <Stack
                      alignItems={"center"}
                      justifyContent={"center"}
                      sx={{ width: "28px", height: "28px" }}
                    >
                      {(index === messages.length - 1 ||
                        message.sender.id !==
                          messages[index + 1].sender.id) && (
                        <Avatar
                          src={message.sender.img}
                          alt={message.sender.name}
                          sx={{ width: "100%", height: "100%" }}
                        />
                      )}
                    </Stack>
                  )}
                {(() => {
               
                  switch (message?.type) {
                    case "FILE":
                      return (
                        <DocxMessage message={message} menu={menu} id={id} />
                      );
                    case "LINK":
                      return (
                        <LinkMessage message={message} menu={menu} id={id} />
                      );
                    case "IMAGE":
                      return (
                        <MediaMessage message={message} menu={menu} id={id} />
                      );
                    case "reply":
                      return (
                        <ReplyMessage message={message} menu={menu} id={id} />
                      );
                    case "TEXT":
                      //Default tin nhan là text
                      return (
                        <TextMessage message={message} menu={menu} id={id} />
                      );
                    case "NOTIFICATION":
                      return <Notification message={message} />;
                    default:
                      return null;
                  }
                })()}
              </Stack>
            );
          })}
      </Stack>
    </Box>
  );
};

export default Message;
