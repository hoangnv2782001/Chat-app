import {
  Box,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { ChatList } from "../../data";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/search";
import { MagnifyingGlass, Plus } from "phosphor-react";
import { useTheme } from "@mui/material/styles";
import { SimpleBarStyle } from "../../components/Scrollbar";
import ChatElement from "../../components/ChatElement";
import { useState } from "react";
import CreateGroup from "../../sections/main/CreateGroup";
/**
 * Hiển thị khung chat group tương tự khung chat vs bạn
 * Gòm các thành phàn :
 *    Title
 *    Search
 *    Create group
 *    Pinned chat
 *    all chats
 * @returns {component}
 */
const Group = () => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  return (
    <>
      <Stack direction={"row"} sx={{ width: "100%" }}>
        <Box
          sx={{
            position: "relative",
            width: 320,
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background.paper,
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

            {/* Thanh search bar chứa icon MagnifyingGlass và ô nhập liệu */}
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
            </Stack>

            {/* Stack chứa thanh tao group*/}
            <Stack
              alignItems={"center"}
              direction="row"
              justifyContent="space-between"
            >
              <Typography variant="subtitle2" component={Link}>
                Create New Group
              </Typography>

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
              sx={{ flexGrow: 1, overflowY: "scroll", height: "100%" }}
            >
              {/* Scroll bar đã chỉnh sửa part2  */}
              <SimpleBarStyle theme={theme} timeout={500} clickOnTrack={false}>
                {/* pinned chat */}
                <Stack spacing={2.5}>
                  {/* <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                    Pinned
                  </Typography>
                  {ChatList.filter((element) => element.pinned).map(
                    (element) => {
                      return <ChatElement {...element} />;
                    }
                  )} */}

                  {/* <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                    All Chats
                  </Typography>
                  {ChatList.filter((element) => !element.pinned).map(
                    (element) => {
                      return <ChatElement {...element} />;
                    }
                  )} */}
                </Stack>
              </SimpleBarStyle>
            </Stack>
          </Stack>
        </Box>
        {/* //TODO :=> reuse conventation component */}
      </Stack>

      {openDialog && (
        <CreateGroup open={openDialog} handleClose={handleCloseDialog} />
      )}
    </>
  );
};

export default Group;
