import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import StyledBadge from "../StyledBadge";

import { Chat } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";

import { useConversation } from "../../hooks/useConversation";
const FriendComponent = ({ name, id, online, img, ...other }) => {
  const theme = useTheme();
 
  const {startConversation} = useConversation();
  return (
    <StyleChatBox
      sx={{
        width: "100%",
        boderRadius: 1,
        backgroundColor: theme.palette.background.paper,
      }}
      p={2}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar src={img} />
            </StyledBadge>
          ) : (
            <Avatar src={img} />
          )}

          {/* Hiển thị tên và tin nhắn cuối cùng chưa đọc */}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>
        </Stack>

        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <IconButton
            onClick={() => {
              startConversation({name,id,online,img})


              //

              console.log("select conversation :", id);

              // dispatch(AddDirectConversation())
              other.handleClose();

              // dispatch(SelectConversation({ chatType:"private" }));

              // dispatch(
              //   CreateCurrentConversation({
              //     id: null,
              //     user: {
              //       name,
              //       id,
              //       online,
              //       img,
              //     },
              //   })
              // );
            }}
          >
            <Chat />
          </IconButton>
        </Stack>
      </Stack>
    </StyleChatBox>
  );
};

const StyleChatBox = styled(Box)(({ theme }) => ({
  "&:hover": {
    cursor: "pointer",
  },
}));
export { FriendComponent };
