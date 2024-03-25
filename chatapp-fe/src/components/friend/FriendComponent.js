import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import StyledBadge from "../StyledBadge";

import { Chat } from "phosphor-react";


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

              console.log("start conversation")
              startConversation({name,id,online,img})

              console.log("select conversation :", id);
              other.handleClose();

              
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
