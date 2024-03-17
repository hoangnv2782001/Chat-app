import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { Plus } from "phosphor-react";
import React, { useState } from "react";

import CreateGroup from "../../sections/main/CreateGroup";

import { useSelector } from "react-redux";
import GroupElement from "./GroupElement";

const GroupChat = () => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);

  const { groups } = useSelector((state) => state.conversation);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: 360,
          backgroundColor: "#fff",
          boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
        }}
      >
        {/*Wrapper tất cả nội dung trong chat bar và bố cục sử dụng flex*/}
        <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
          {/* Chứa tiêu đề side bar và một button icon */}
          <Stack
            direction="row"
            alignItems={"center"}
            justifyContent="space-between"
          >
            <Typography variant="h5">Groups</Typography>
          </Stack>

          {/* Thanh search bar chứa icon MagnifyingGlass và ô nhập liệu
              <Stack sx={{ width: "100%" }}>
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

          {/* Stack chứa thanh tao group*/}
          <Stack
            alignItems={"center"}
            direction="row"
            justifyContent="space-between"
          >
            <Typography variant="subtitle2">Create New Group</Typography>

            <IconButton
              onClick={() => {
                setOpenDialog(true);
              }}
            >
              <Plus sx={{ color: theme.palette.primary.main }} />
            </IconButton>
          </Stack>

          <Divider />

          {/* Stack chứa các box chat element */}
          <Stack
            direction="column"
            spacing={2}
            sx={{ flexGrow: 1, overflowY: "hidden", height: "100%" }}
          >
            {/* Scroll bar đã chỉnh sửa part2  */}
            {/* <SimpleBarStyle theme={theme} timeout={500} clickOnTrack={false}> */}
            {/* pinned chat */}
            <Stack spacing={1}>
              {groups &&
                groups.map((element) => {
                  return <GroupElement {...element} />;
                })}
            </Stack>

            {/* </SimpleBarStyle> */}
          </Stack>
        </Stack>
      </Box>
      {/* //TODO :=> reuse conventation component */}

      {openDialog && (
        <CreateGroup open={openDialog} handleClose={handleCloseDialog} />
      )}
    </>
  );
};

export default GroupChat;
