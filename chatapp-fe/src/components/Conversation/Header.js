import { faker } from "@faker-js/faker";
import {
  Stack,
  Box,
  Avatar,
  Typography,
  IconButton,
  Divider,
  Menu,
  MenuItem,
  Fade,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CaretDown, MagnifyingGlass, Phone, VideoCamera } from "phosphor-react";
import React from "react";

import { ToggleSidebar, toggleSidebar } from "../../Redux/slices/app";
import { useDispatch, useSelector } from "react-redux";
import StyledBadge from "../StyledBadge";
import useResponsive from '../../hooks/useResponsive'
import { useConversation } from "../../hooks/useConversation";
/**
 * Hiển thi header khung chat
 * @returns {Component}
 */
const Header = ({ id, name, img, online }) => {
  // khoi tao theme
  const theme = useTheme();

  // khởi tao dispatch
  const dispatch = useDispatch();
  const {conversations,current_conversation} = useSelector(state => state.conversation)

  // const dispatch = useDispatch();
  const isMobile = useResponsive("between", "md", "xs", "sm");
  // const theme = useTheme();

  const {deleteConversation} = useConversation()

  const [conversationMenuAnchorEl, setConversationMenuAnchorEl] =
    React.useState(null);
  const openConversationMenu = Boolean(conversationMenuAnchorEl);
  const handleClickConversationMenu = (event) => {
    setConversationMenuAnchorEl(event.currentTarget);
  };
  const handleCloseConversationMenu = () => {
    setConversationMenuAnchorEl(null);
    console.log("delete conversation",current_conversation?.id)
    if(current_conversation?.id){
      deleteConversation(current_conversation.id,conversations)
    }
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
          onClick={() => {
            console.log("open sidebar")
            dispatch(ToggleSidebar());
          }}
          direction="row"
          spacing={2}
        >
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
          <Stack spacing={0.2}>
            <Typography variant="subtitle2">{name}</Typography>
            <Typography variant="caption">{online ? "Online" :"Offline"}</Typography>
          </Stack>
        </Stack>


        <Stack alignItems={"center"} direction="row" spacing={3}>
        <IconButton
              id="conversation-positioned-button"
              aria-controls={
                openConversationMenu
                  ? "conversation-positioned-menu"
                  : undefined
              }
              aria-haspopup="true"
              aria-expanded={openConversationMenu ? "true" : undefined}
              onClick={handleClickConversationMenu}
            >
              <CaretDown />
            </IconButton>
            <Menu
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              TransitionComponent={Fade}
              id="conversation-positioned-menu"
              aria-labelledby="conversation-positioned-button"
              anchorEl={conversationMenuAnchorEl}
              open={openConversationMenu}
              onClose={handleCloseConversationMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Box p={1}>
                <Stack spacing={1}>
                  
                    <MenuItem onClick={handleCloseConversationMenu}>
                      <Stack
                        sx={{ minWidth: 100 }}
                        direction="row"
                        alignItems={"center"}
                        justifyContent="space-between"
                      >
                        <span>{"Delete conversation"}</span>
                      </Stack>{" "}
                    </MenuItem>
                
                </Stack>
              </Box>
              </Menu>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Header;
