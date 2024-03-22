import {
  Box,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import {

  Users,
} from "phosphor-react";
import React from "react";

import ChatElement from "../../components/ChatElement";
import { useState } from "react";
import Friends from "../../sections/main/Friends";

import { useDispatch, useSelector } from "react-redux";
import useResponsive from '../../hooks/useResponsive'
/**
 * Hiển thi cửa sổ chat
 * @returns {Component}
 *
 */
const Chats = () => {
  const theme = useTheme();
  const isDesktop = useResponsive("up", "md");

  const dispatch = useDispatch();
  
  

  const {conversations} = useSelector((state) => state.conversation);
  



  console.log("con versation ",conversations)

  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  return (
    /**
     * Box wrapper
     */
    <>
      <Box
        sx={{
          position: "relative",
          width: 360,
          backgroundColor:  "#F8FAFF",
          boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
        }}
      >
        {/*Wrapper tất cả nội dung trong chat bar và bố cục sử dụng flex*/}
        <Stack p={2} spacing={2} sx={{ height: "100vh" }}>
          {/* Chứa tiêu đề side bar và một button icon */}
          <Stack
            direction="row"
            alignItems={"center"}
            justifyContent="space-between"
          >
            <Typography variant="h5">Chats</Typography>

            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <IconButton
                onClick={() => {
                  setOpenDialog(true);
                }}
              >
                <Users />
              </IconButton>
           
            </Stack>
          </Stack>

          {/* Thanh search bar chứa icon MagnifyingGlass và ô nhập liệu */}
          {/* <Stack sx={{ width: "100%" }}>
            <Search>
              <SearchIconWrapper>
                <MagnifyingGlass color="#709CE6" />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search..."
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Stack> */}


          {/* Stack chứa các box chat element */}
          <Stack
            direction="column"
            spacing={2}
            //chinh sua
            sx={{ flexGrow: 1, height: "100%" }}
          >
            {/* Scroll bar đã chỉnh sửa part2  */}
            {/* <SimpleBarStyle theme={theme} timeout={500} clickOnTrack={false}> */}
              <Stack spacing={1}>

                {/* </Typography> */}
                {conversations && conversations.map(
                  (element) => {
                    return <ChatElement {...element} />;
                  }
                )}
              </Stack>
            {/* </SimpleBarStyle> */}
          </Stack>
        </Stack>
      </Box>
      {openDialog && (
        <Friends open={openDialog} handleClose={handleCloseDialog} />
      )}
    </>
  );
};

export default Chats;
