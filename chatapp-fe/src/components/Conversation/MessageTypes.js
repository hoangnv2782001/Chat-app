import {
  Box,
  Divider,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DotsThreeVertical, DownloadSimple, Image } from "phosphor-react";
import React from "react";

import { Message_options } from "../../data/index";
import { fDateTime } from "../../utils/formatTime";

/**
 * Hiển thi divider time
 * @param {Object} message
 * @returns {Component}
 */
export const TimeLine = ({ message, id }) => {
  const theme = useTheme();

  return (
    <Stack direction="row" alignItems={"center"} justifyContent="space-between">
      <Divider width="40%" />
      <Typography variant="caption" sx={{ color: theme.palette.text }}>
        {message.content}
      </Typography>
      <Divider width="40%" />
    </Stack>
  );
};

/**
 * Hiên thi text messag
 * @param {Boolean} menu
 * @param {Object} message : chua  thông tin tin nhắn
 * @returns {Component}
 */

export const TextMessage = ({ message, menu, id }) => {
  const theme = useTheme();
  return (
    <Stack
      direction="row"
      justifyContent={message.receiver === id ? "start" : "end"}
    >
      <Tooltip key={id} placement="right" title={fDateTime(message?.time)}>
        <Box
          p={1}
          sx={{
            borderRadius: 1.5,
            width: "max-content",
            backgroundColor:
              message.receiver === id ? "#F0F0F0" : theme.palette.primary.main,
          }}
        >
          <Typography
            variant="body2"
            color={message.receiver === id ? theme.palette.text : "#fff"}
          >
            {message.content}
          </Typography>
        </Box>
      </Tooltip>

      {/* {menu && <MessageOptions />} */}
    </Stack>
  );
};

/**
 * Hiển thi message med
 * @param {Boolean} menu
 * @param {Object} message
 * @returns {Component}
 */
export const MediaMessage = ({ message, menu, id }) => {
  const theme = useTheme();

  const index = message.content.indexOf(" ");
  const name = message.content.substring(index + 1);
  const link = message.content.substring(0, index);
  return (
    <Stack
      direction="row"
      justifyContent={message.receiver === id ? "start" : "end"}
    >
      <Tooltip key={id} placement="right" title={fDateTime(message?.time)}>
        <Box
          p={1.5}
          sx={{
            borderRadius: 1.5,
            width: "max-content",
            // backgroundColor:
            //   message.receiver === id
            //     ? theme.palette.background.default
            //     : theme.palette.primary.main,
          }}
        >
          <Stack spacing={1}>
            <img
              src={link}
              alt={name}
              style={{ maxHeight: 210, borderRadius: "10px" }}
            ></img>

            {/* <Typography
            variant="body2"
            color={message.receiver === id  ? theme.palette.text : "#fff"}
          >
            {message.content}
          </Typography> */}
          </Stack>
        </Box>
      </Tooltip>
      {/* {menu && <MessageOptions />} */}
    </Stack>
  );
};

/**
 * Hiển thi message rep
 * @param {Boolean} menu
 * @param {Object} message
 * @returns {Component}
 */
export const ReplyMessage = ({ message, menu, id }) => {
  const theme = useTheme();
  return (
    <Stack
      direction="row"
      justifyContent={message.receiver === id ? "start" : "end"}
    >
      <Tooltip key={id} placement="right" title={fDateTime(message?.time)}>
        <Box
          p={1.5}
          sx={{
            borderRadius: 1.5,
            width: "max-content",
            backgroundColor:
              message.receiver === id
                ? theme.palette.background.default
                : theme.palette.primary.main,
          }}
        >
          <Stack spacing={2}>
            <Stack
              p={2}
              spacing={3}
              alignItems={"center"}
              direction="column"
              sx={{
                backgroundColor: theme.palette.background.paper,
                borderRadius: 1,
              }}
            >
              <Typography variant="body2" color={theme.palette.text}>
                {message.content}
              </Typography>
            </Stack>
            <Typography
              variant="body2"
              color={message.receiver === id ? theme.palette.text : "#fff"}
            >
              {message.reply}
            </Typography>
          </Stack>
        </Box>
      </Tooltip>
      {/* {menu && <MessageOptions />} */}
    </Stack>
  );
};

/**
 * Hiển thi link messag
 * @param {Boolean} menu
 * @param {Object} message
 * @returns {Component}
 */
export const LinkMessage = ({ message, menu, id }) => {
  const theme = useTheme();

  const createMarkup = (content) => {
    return { __html: content };
  };
  return (
    <Stack
      direction="row"
      justifyContent={message.receiver === id ? "start" : "end"}
    >
      <Tooltip key={id} placement="right" title={fDateTime(message?.time)}>
        <Box
          p={1.5}
          sx={{
            borderRadius: 1.5,
            width: "max-content",
            backgroundColor:
              message.receiver === id ? "#F0F0F0" : theme.palette.primary.main,
          }}
        >
          <Stack
            p={2}
            spacing={3}
            alignItems={"start"}
            direction="column"
            sx={{
              // backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
              color: "#fff",
            }}
          >
            <div dangerouslySetInnerHTML={createMarkup(message.content)} />
          </Stack>
        </Box>
      </Tooltip>
      {/* {menu && <MessageOptions />} */}
    </Stack>
  );
};

/**
 * Hiển thi doc message
 * @param {Boolean} menu
 * @param {Object} message
 * @returns {Component}
 */
export const DocxMessage = ({ message, menu, id }) => {
  const theme = useTheme();

  const index = message.content.indexOf(" ");
  const name = message.content.substring(index + 1);
  const link = message.content.substring(0, index);
  return (
    <Stack
      direction="row"
      justifyContent={message.receiver === id ? "start" : "end"}
      alignItems={"center"}
    >
      <Tooltip key={id} placement="right" title={fDateTime(message?.time)}>
        <a href={link} download style={{ textDecoration: "none" }}>
          <Box
            p={1.5}
            sx={{
              borderRadius: 1.5,
              width: "max-content",
              backgroundColor: "#F0F0F0",
            }}
          >
            <Stack spacing={2}>
              <Stack
                p={2}
                spacing={3}
                alignItems={"center"}
                direction="row"
                sx={{
                  backgroundColor: "#F0F0F0",
                  borderRadius: 1,
                }}
              >
                <Image size={40} />
                <Typography
                  variant="subtitle2"
                  sx={{
                    color:
                      message.receiver === id ? theme.palette.text : "#000",
                  }}
                >
                  {name}
                </Typography>
                <IconButton>
                  <DownloadSimple />
                </IconButton>
              </Stack>
            </Stack>
          </Box>
        </a>
      </Tooltip>
      {/* {menu && <MessageOptions />} */}
    </Stack>
  );
};

/**
 * Dung để hiển thi thanh menu chứa các action với message
 * State :
 *   anchorEl : dùng để set position cho menu
 *   open : trang thái hiển thi của menu
 * @function handleClick : hanlde click vào menuitem
 * @function handleClose : sử lí sự kiên đóng
 * @returns {Component}
 */
const MessageOptions = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <DotsThreeVertical
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        size={20}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Stack spacing={1} px={1}>
          {Message_options.map((element) => {
            return <MenuItem>{element.title}</MenuItem>;
          })}
        </Stack>
      </Menu>
    </>
  );
};
