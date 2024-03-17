import React from "react";
import { getTypeMssage } from "../ChatElement";

import { styled, useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import useGroup from "../../hooks/useGroup";

import { Avatar, Box, Stack, Typography } from "@mui/material";
import { fDateTime } from "../../utils/formatTime";
import { selectConversation } from "../../Redux/slices/conversation";
import { useConversation } from "../../hooks/useConversation";

const GroupElement = ({ id, avatar, name, admin, members, lastMessage }) => {
  const dispatch = useDispatch();

  const sender = members.find(e => e.id=== lastMessage.sender).name
  const { getMessages } = useConversation();

  const { user } = useSelector((state) => state.app);



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
        dispatch(
          selectConversation({
            chatType: "group",
            conversation: { id, avatar, name, admin, members, lastMessage },
          })
        );

        getMessages("group", id);
      }}
    >
      {/* Wrapper toàn bộ các nội dung hiển thị trong box chat */}
      <Stack direction="row" alignItems={"center"} sx={{ width: "100%" }}>
        {/* Hiển thị avatar trong 2 th  online : offline */}
        <Stack direction="row" sx={{ width: "56px", height: "56px" }}>
          <Avatar sx={{ width: 56, height: 56 }} src={avatar} />
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
              {name}
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: "600" }}>
              {lastMessage && fDateTime(lastMessage?.time)}

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
              {lastMessage && (
                <>
                  {lastMessage.sender !== user.id ? `${sender}: ` : "You: "}
                  {lastMessage && getTypeMssage(lastMessage)}
                </>
              )}
            </Typography>

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

export default GroupElement;
