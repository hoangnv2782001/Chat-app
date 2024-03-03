import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import StyledBadge from "../StyledBadge";
import { faker } from "@faker-js/faker";
import { useFriend } from "../../hooks/useFriend";

const FriendRequestComponent = ({ name, id, img, id1 }) => {
  const theme = useTheme();

  const { acceptRequest, rejectRequest } = useFriend();
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
          sx={{width:"100%"}}
        >
          {/* {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar src={img} alt={faker.name.fullName()} />
            </StyledBadge>
          ) : (
           
          )} */}

          {/* Hiển thị tên và tin nhắn cuối cùng chưa đọc */}
          <Stack spacing={0.3} direction={"row"} alignItems={"center"}>
            <Avatar src={img} alt={faker.name.fullName()} />
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>

          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Button
              variant="contained"
              onClick={() => {
                //socket send

                acceptRequest(id);
              }}
            >
              Accept
            </Button>

            <Button
              variant="contained"
              onClick={() => {
                //socket send
                rejectRequest(id);
              }}
            >
              Reject
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
export { FriendRequestComponent };
