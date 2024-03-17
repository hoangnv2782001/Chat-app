import { Avatar, Box, Stack, Typography, Badge } from "@mui/material";

import { styled, useTheme, alpha } from "@mui/material/styles";
import React from "react";
import StyledBadge from "./StyledBadge";
import { useDispatch, useSelector } from "react-redux";

import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { fDate, fDateTime } from "../utils/formatTime";
import { useConversation } from "../hooks/useConversation";

import BrokenImageOutlinedIcon from "@mui/icons-material/BrokenImageOutlined";
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import { selectConversation } from "../Redux/slices/conversation";

/**
 * Dùng để hiển thị các box chat
 * @param {Object} { id, name, img, msg, time, unread, online } thông tin về chat
 * @returns {Component}
 */
const ChatElement = ({ id, user, lastMessage }) => {
  const dispatch = useDispatch();

  const { getMessages } = useConversation();

  const {chatType} = useSelector(state=>state.conversation)
  return (
    // wrapper element
    <StyledChatBox
      sx={{
        width: "100%",

        borderRadius: 1,
        overflow: "hidden",
      }}
      p={0.5}
      // handle select conversation
      onClick={() => {
        dispatch(selectConversation({ chatType: "private",conversation :{ id, user } }));
      
        getMessages("private",id);
      }}
    >
      {/* Wrapper toàn bộ các nội dung hiển thị trong box chat */}
      <Stack direction="row" alignItems={"center"} sx={{ width: "100%" }}>
        {/* Hiển thị avatar trong 2 th  online : offline */}
        <Stack direction="row" sx={{ width: "56px", height: "56px" }}>
          {user?.online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar sx={{ width: 56, height: 56 }} src={user?.img} />
            </StyledBadge>
          ) : (
            <Avatar sx={{ width: 56, height: 56 }} src={user?.img} />
          )}
        </Stack>

        <Box sx={{ width: "100%", ml: "10px", pr: "8px", flexGrow: 1 }}>
          {/* Hiển thị tên và tin nhắn cuối cùng chưa đọc */}
          <Stack
            spacing={0.3}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: 1.5,
                overflowY: "hidden",
                overflowX: "hidden",
                textOverflow: "ellipsis",

                overflowWrap: "break-word",
              }}
              variant="subtitle2"
            >
              {user?.name}
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: "600" }}>
              {fDateTime(lastMessage?.time)}

              {/* {lastMessage?.time} */}
            </Typography>
          </Stack>

          {/* Hiển thị thời gian tin nhắn cuối và số tin nhắn chưa đọc */}
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{ width: "200px" }}
          >
            <Typography
              variant="caption"
              sx={{
                overflowY: "hidden",
                overflowX: "hidden",
                textOverflow: "ellipsis",
                textAlign: "start",
                overflowWrap: "break-word",
                whiteSpace: "nowrap",
                width: "100%",
                display: "flex",
                alignItems: "center",
                color: "#7589a3",
                fontWeight: "400",
                fontSize: "14px",
              }}
            >
              {lastMessage.sender === user.id ? "" : "You: "}
              {getTypeMssage(lastMessage)}
            </Typography>
            {lastMessage?.seen && (
              <Badge className="unread-count" color="primary" variant="dot" />
            )}
            {/* <Badge color="primary" badgeContent={unread} /> */}
          </Stack>
        </Box>
      </Stack>
    </StyledChatBox>
  );
};


const StyledChatBox = styled(Box)(({ theme }) => ({
  "&:hover": {
    cursor: "pointer",
  },
}));

export const getTypeMssage = (lastMessage) => {
  switch (lastMessage.type) {
    case "TEXT":
      return lastMessage?.content;
    case "LINK":
      return <AttachmentOutlinedIcon />;
    case "IMAGE":
      return <BrokenImageOutlinedIcon />;
    case "FILE":
      return <DescriptionOutlinedIcon />;
    default:
      break;
  }
};

export default ChatElement;
