import { faker } from "@faker-js/faker";
import {
  Stack,
  Box,
  Avatar,
  Typography,
  IconButton,

} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CaretDown } from "phosphor-react";
import React from "react";

import {  togglesidebar } from "../../Redux/slices/app";
import { useDispatch } from "react-redux";

/**
 * Hiển thi header khung chat
 * @returns {Component}
 */
const HeaderGroup = ({ id, name, avatar, members}) => {
  // khoi tao theme
  const theme = useTheme();
  // const theme = useTheme();

  const dispatch = useDispatch();

  const handleClickConversationMenu = (event) => {
       dispatch(togglesidebar())
  };
 

  return (
    <Box
      p={2}
      sx={{
        width: "100%",
        backgroundColor:
          theme.palette.mode === "light"
            ? "#F8FAFF"
            : theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0 ,0 ,0 ,0.25)",
      }}
    >
      {/* Wrapper toàn bộ các nội dung hiển thị trong box chat */}
      <Stack
        alignItems={"center"}
        direction="row"
        justifyContent="space-between"
        sx={{ width: "100%", height: "100%" }}
      >
        {/* Hiển thị avatar trong 2 th  online : offline */}
        <Stack
          direction="row"
          spacing={2}
        >
          <Avatar src={avatar  } />

          {/* Hiển thị tên và tin nhắn cuối cùng chưa đọc */}
          <Stack spacing={0.2}>
            <Typography variant="subtitle2">{name}</Typography>
            <Typography variant="caption">
              {`members ${members?.length}`}
              
            </Typography>
          </Stack>
        </Stack>

        <Stack alignItems={"center"} direction="row" spacing={3}>
          <IconButton
            onClick={handleClickConversationMenu}
          >
            <CaretDown />
          </IconButton>
        
        </Stack>
      </Stack>
    </Box>
  );
};

export default HeaderGroup;
