import React, { useState } from "react";

import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";

import Logo from "../../assets/Images/logo.ico";
import { Nav_Buttons, Profile_Menu } from "../../data";
import { Gear } from "phosphor-react";

import { faker } from "@faker-js/faker";

import useSettings from "../../hooks/useSettings";
import AntSwitch from "../../components/AntSwitch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../Redux/slices/auth";
import Profile from "../../pages/dashboard/Profile";
import { socket } from "../../Stomp";

/**
 * SideBar chua cac btton chuc nang
 * state :
 *   anchorEl : phàn tử liên kết với menu
 *   open : trang thái đóng mở menu
 * @function handleClick : sưu kiên click avatar
 * @function handleClose : sự kiên close menu
 * @returns {Component}
 */
const SideBar = () => {
  const dispatch = useDispatch();
  // get theme tu context
  const theme = useTheme();

  // khởi tạo selected state dùng để xác định button click
  const [selected, setSelected] = useState(0);

  const { user } = useSelector((state) => state.app);

  // dung de dinh tuyen
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const [openProfile, setOpenProfile] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // const { onToggleMode } = useSettings();
  return (
    <Box
      p={2}
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
        width: 100,
        height: "100vh",
      }}
    >
      {/* container chưa các component theo chiều dọc */}
      <Stack
        direction="column"
        alignItems={"center"}
        sx={{ height: "100%" }}
        justifyContent="space-between"
        spacing={3}
      >
        {/* container chua tất cả button chức năng + buttom setting*/}
        <Stack alignItems="center" spacing={4}>
          {/* Logo trang web */}
          <Box
            sx={{
              backgroundColor: theme.palette.primary.main,
              height: 64,
              width: 64,
              borderRadius: 1.5,
            }}
          >
            <img src={Logo} alt="chat app logo" />
          </Box>

          {/* thanh navbar chứa các button chức năng  */}
          <Stack
            spacing={2}
            sx={{ width: "max-content" }}
            direction="column"
            alignItems="center"
          >
            {/* hiển thị các button icon */}
            {Nav_Buttons.map((button) =>
              selected === button.index ? (
                /* hiển thị của button khi được click */
                <Box
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                  }}
                >
                  <IconButton
                    sx={{ width: "max-content", color: "#fff" }}
                    key={button.index}
                  >
                    {button.icon}
                  </IconButton>
                </Box>
              ) : (
                /* hiển thị của button khi không được click */
                <IconButton
                  sx={{
                    width: "max-content",
                    color:
                      theme.palette.mode === "light"
                        ? "#000"
                        : theme.palette.text.primary,
                  }}
                  key={button.index}
                  onClick={() => {
                    setSelected(button.index);
                    navigate(getPath(button.index));
                  }}
                >
                  {button.icon}
                </IconButton>
              )
            )}
          </Stack>

        </Stack>

        {/**
              - Hiển thị a vatar sử dụng thư việnk faker
              - bắt sự kiện thay đổi toggle theme  
             **/}
        <Stack spacing={4}>
          {/* <AntSwitch
            theme={theme}
            defaultChecked
            onChange={() => onToggleMode()}
          /> */}
          <Avatar
            id="basic-avatar"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            src={user?.img}
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-avatar",
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Stack spacing={1} px={1}>
              {Profile_Menu.map((element, index) => {
                return (
                  <MenuItem >
                    <Stack
                      onClick={() => {
                        console.log("click menu");
                        if (index === 1) {
                          socket.deactivate();
                          dispatch(Logout());
                        } else {
                          setOpenProfile(true);
                        }
                        handleClose();
                      }}
                      direction="row"
                      sx={{ width: 100 }}
                      alignItems={"center"}
                      justifyContent="space-between"
                    >
                      <span>{element.title}</span>
                      {element.icon}
                    </Stack>
                  </MenuItem>
                );
              })}
            </Stack>
          </Menu>
        </Stack>
      </Stack>
      {openProfile && (
        <Profile open={openProfile} handleClose={() => setOpenProfile(false)} />
      )}
    </Box>
  );
};
/**
 * Lấy đường dẫn của button icon
 * @param {int} index
 * @returns url
 */

const getPath = (index) => {
  switch (index) {
    case 0:
      return "/app";
    case 1:
      return "/group";
    case 2:
      return "/call";
    case 3:
      return "/setting";

    default:
      break;
  }
};

/**
 * Lấy đường dẫn của button icon
 * @param {int} index
 * @returns url
 */

const getMenuPath = (index) => {
  switch (index) {
    case 0:
      return "/profile";
    // case 1:
    //   return "/setting";
    case 2:
      //TODO : uppdate token and set isValidate
      return "/auth/login";

    default:
      break;
  }
};
export default SideBar;
