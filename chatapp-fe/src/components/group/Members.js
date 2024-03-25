import { Avatar, IconButton, Stack, Typography } from "@mui/material";
import React from "react";

import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import { useDispatch, useSelector } from "react-redux";
import { deleteMember } from "../../Redux/slices/conversation";

export const Member = ({avatar, img, name, id, memberId, removeMember }) => {

  const dispatch = useDispatch()
  const handleClick = () => {
    removeMember(memberId);
    dispatch(deleteMember(id));
  };

  const { admin } = useSelector(
    (state) => state.conversation.current_conversation
  );

  const { user } = useSelector(
    (state) => state.app
  );

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      sx={{
        width: "100%",
        cursor: "pointer",
        p: "4px 8px",
        "&:hover": {
          backgroundColor: "#F5F5F5",
        },
      }}
    >
      <Stack direction={"row"} spacing={1} alignItems={"center"}>
        <Avatar src={img || avatar} alt={name} />

        <Stack justifyItems={"center"}>
          {" "}
          <Typography>{name}</Typography>
          {admin.id === id && <Typography>Admin</Typography>}
        </Stack>
      </Stack>
      {admin.id !== id && admin.id === user.id && (
        <IconButton onClick={handleClick}>
          {" "}
          <GroupRemoveIcon />
        </IconButton>
      )}
    </Stack>
  );
};
