import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Bell,
  CaretLeft,
  Image,
  Info,
  Key,
  Keyboard,
  Lock,
  Note,
  PencilCircle,
} from "phosphor-react";
import { faker } from "@faker-js/faker";
import Shortcut from "../../sections/settings/Shortcut";
import { useState } from "react";

/**
 * Hien thị setting app
 * @returns {Component}
 * openShortcuts : trang thai đóng mở của shortcut dialog
 * hanldeclose va open cập nhật trạng thái của shortcuts
 */
const Settings = () => {
  const theme = useTheme();
  const [openShortcuts, setOpenShortcuts] = useState(false);

  const handleCloseShortcuts = () => {
    setOpenShortcuts(false);
  };

  const handleOpenShortcuts = () => {
    setOpenShortcuts(true);
  };

  const iconButton = createIconButton({ handleOpenShortcuts });
  return (
    <>
      <Stack sx={{ width: "100%" }} direction="row">
        {/*left panel */}
        <Box
          sx={{
            overflowY: "scroll",
            width: "320",
            height: "100vh",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,
            boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
          }}
        >
          <Stack p={4} spacing={5}>
            {/* setting header */}
            <Stack direction="row" alignItems={"center"} spacing={3}>
              <IconButton>
                <CaretLeft size={24} color={"#4B4B4B"} />
              </IconButton>
              <Typography variant="h6">Settings</Typography>
            </Stack>
            {/* profile user */}

            <Stack direction="row" spacing={3}>
              <Avatar
                src={faker.image.avatar()}
                alt={faker.name.fullName()}
                sx={{ width: 56, height: 56 }}
              />

              {/* info */}
              <Stack spacing={0.5}>
                <Typography variant="article">
                  {faker.name.fullName()}
                </Typography>
                <Typography variant="body2">{faker.random.words()}</Typography>
              </Stack>
            </Stack>
            {/* option setting */}

            <Stack spacing={4}>
              {iconButton.map((element) => {
                return (
                  <>
                    <Stack
                      sx={{ cursor: "pointer" }}
                      spacing={2}
                      onClick={element.onClick}
                    >
                      <Stack alignItems={"center"} direction="row" spacing={2}>
                        {element.icon}
                        <Typography variant="body2">{element.title}</Typography>
                      </Stack>

                      {element.key !== 7 && <Divider />}
                    </Stack>
                  </>
                );
              })}
            </Stack>
          </Stack>
        </Box>
        {/* right panel */}
      </Stack>
      {openShortcuts && (
        <Shortcut open={openShortcuts} handleClose={handleCloseShortcuts} />
      )}
    </>
  );
};

/**
 * Tạo các icon button hiển thị chức năng trong setting
 * @param {Callback} handleOpenShortcuts 
 * @returns 
 */

const createIconButton = ({ handleOpenShortcuts }) => {
  return [
    {
      key: 0,
      icon: <Bell size={20} />,
      title: "Notification",
      onClick: () => {},
    },
    {
      key: 1,
      icon: <Lock size={20} />,
      title: "Privacy",
      onClick: () => {},
    },
    {
      key: 2,
      icon: <Key size={20} />,
      title: "Security",
      onClick: () => {},
    },
    {
      key: 3,
      icon: <PencilCircle size={20} />,
      title: "Theme",
      // onClick: handleOpenTheme,
      onClick: () => {},
    },
    {
      key: 4,
      icon: <Image size={20} />,
      title: "Chat Wallpaper",
      onClick: () => {},
    },
    {
      key: 5,
      icon: <Note size={20} />,
      title: "Request Accout Info",
      onClick: () => {},
    },
    {
      key: 6,
      icon: <Keyboard size={20} />,
      title: "Keyboard Shortcuts",
      onClick: handleOpenShortcuts,
    },
    {
      key: 7,
      icon: <Info size={20} />,
      title: "Help",
      onClick: ()=>{},
    },
  ];
};
export default Settings;
