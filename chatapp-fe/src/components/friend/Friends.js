import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import StyledBadge from "../StyledBadge";
import { faker } from "@faker-js/faker";
import { useFriend } from "../../hooks/useFriend";

const UserComponent = ({ name, id, online, img }) => {
  const theme = useTheme();

  const {sendRequest} = useFriend()
  return (
    <StyleChatBox
      sx={{
        width: "100%",
        boderRadius: 1,
        backgroundColor: theme.palette.background.paper,
      }}
      p={0.5}
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
              <Avatar src={img} alt={name} sizes="100px"/>
            </StyledBadge>
          ) : (
            <Avatar src={img} alt={name} />
          )}

          {/* Hiển thị tên và tin nhắn cuối cùng chưa đọc */}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>

       
        </Stack>
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Button
              onClick={() => {
                //socket send
                sendRequest(id)
              }}
            >
              Send Request
            </Button>
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
export { UserComponent };
