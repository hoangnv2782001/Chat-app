import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Bell,
  CaretRight,
  Phone,
  Prohibit,
  Star,
  Trash,
  VideoCamera,
  X,
} from "phosphor-react";

import { ToggleSidebar, UpdateSidebarType } from "../Redux/slices/app";
import { faker } from "@faker-js/faker";
import AntSwitch from "../components/AntSwitch";
import { useDispatch } from "react-redux";
import { useState } from "react";


/**
 * Hien thi contact cua môt chat friend
 * @returns {Component}
 */
const Contact = () => {
  /**
   * theme của app
   * dispatch : đẩy action về phía store
   * open : state cua dialog
   * handleClose : close dialog
   */
  const theme = useTheme();
  const dispatch = useDispatch();

  const [openBlock, setOpenBlock] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleCloseBlock = () => {
    setOpenBlock(false);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  return (
    <Box sx={{ width: 320, height: "100vh" }}>
      <Stack sx={{ height: "100%" }}>
        {/* header contact */}
        <Box
          sx={{
            boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
            width: "100%",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,
          }}
        >
          <Stack
            sx={{ width: "100%", p: 2 }}
            alignItems={"center"}
            direction="row"
            justifyContent="space-between"
            spacing={3}
          >
            <Typography variant="subtitle2">Contact Info</Typography>
            <IconButton
              onClick={() => {
                dispatch(ToggleSidebar());
              }}
            >
              <X />
            </IconButton>
          </Stack>
        </Box>

        {/* body contact */}

        <Stack
          sx={{
            position: "relative",
            flexGrow: 1,
            height: "100%",
            overflowY: "scroll",
          }}
          p={3}
          spacing={3}
        >
          {/* Thông tin user chat */}

          <Stack direction="row" spacing={2} alignItems={"center"}>
            <Avatar
              src={faker.image.avatar()}
              alt={faker.name.fullName()}
              sx={{ width: 64, height: 64 }}
            />

            {/* Hiển thị tên và tin nhắn cuối cùng chưa đọc */}
            <Stack spacing={0.5}>
              <Typography variant="article" fontWeight={600}>
                {faker.name.fullName()}
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {"+84 0374 263 823"}
              </Typography>
            </Stack>
          </Stack>

          {/* phone va camera icon */}
          <Stack
            direction="row"
            justifyContent="space-evenly"
            alignItems={"center"}
          >
            <Stack spacing={1} alignItems={"center"}>
              <IconButton>
                <Phone />
              </IconButton>
              <Typography variant="overline">Voice</Typography>
            </Stack>
            <Stack spacing={1} alignItems={"center"}>
              <IconButton>
                <VideoCamera />
              </IconButton>
              <Typography variant="overline">Camera</Typography>
            </Stack>
          </Stack>

          {/* Phan cach */}
          <Divider />

          {/* thong tin about */}
          <Stack spacing={0.5}>
            <Typography variant="article">About</Typography>
            <Typography variant="body2">Hoang Dep trai</Typography>
          </Stack>

          {/* phan cach */}

          <Divider />

          {/* link media docx */}
          <Stack
            alignItems={"center"}
            direction="row"
            justifyContent="space-between"
          >
            <Typography variant="subtitle2">Media, Link & Docx</Typography>
            <Button
              onClick={() => {
                dispatch(UpdateSidebarType("SHARED"));
              }}
              endIcon={<CaretRight />}
            >
              401
            </Button>
          </Stack>

          {/*  image */}
          <Stack alignItems={"center"} direction="row" spacing={2}>
            {[1, 2, 3].map((element) => (
              <Box>
                <img src={faker.image.food()} alt={faker.name.fullName()} />
              </Box>
            ))}
          </Stack>

          <Divider />
          {/* review star  */}

          <Stack
            alignItems={"center"}
            direction="row"
            justifyContent="space-between"
          >
            <Stack alignItems={"center"} direction="row" spacing={2}>
              <Star size={21} />
              <Typography variant="subtitle2">Starred Messages</Typography>
            </Stack>

            <IconButton
              onClick={() => {
                dispatch(UpdateSidebarType("STARRED"));
              }}
            >
              <CaretRight />
            </IconButton>
          </Stack>
          <Divider />

          {/* notification */}

          <Stack
            alignItems={"center"}
            direction="row"
            justifyContent="space-between"
          >
            <Stack alignItems={"center"} direction="row" spacing={2}>
              <Bell size={21} />
              <Typography variant="subtitle2">Mute Notification</Typography>
            </Stack>

            <AntSwitch defaultChecked />
          </Stack>
          <Divider />

          {/* group */}
          <Typography variant="subtitle2">1 group in common</Typography>
          <Stack alignItems={"center"} direction="row" spacing={2}>
            <Avatar src={faker.image.avatar()} alt={faker.name.fullName()} />
            <Stack spacing={0.5}>
              <Typography variant="article">Codding Monk</Typography>
              <Typography variant="body2">Owl, Parrot, Rabit, You</Typography>
            </Stack>
          </Stack>

          {/* button */}
          <Stack alignItems={"center"} direction="row" spacing={2}>
            <Button
              onClick={() => {setOpenBlock(true)}}
              startIcon={<Prohibit />}
              fullWidth
              variant="outlined"
            >
              Block
            </Button>
            <Button
              onClick={() => {setOpenDelete(true)}}
              startIcon={<Trash />}
              fullWidth
              variant="outlined"
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      </Stack>
      {openBlock && <BlockDialog open ={openBlock} handleClose ={handleCloseBlock}/>}
      {openDelete && <DeleteDialog open ={openDelete} handleClose ={handleCloseDelete} />}
    </Box>
  );
};

/**
 * Hiển thị dialog xác nhận block
 * @param {Boolean} open
 * @callback {function} handleClose
 * @return {Component}
 */
const BlockDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Block this contact</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure want to block this Contact?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Yes</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

/**
 * Hiển thị dialog xác nhận delete
 * @param {Boolean} open
 * @callback {function} handleClose
 * @return {Component}
 */
const DeleteDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Delete this contact</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure want to delete this Contact?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Yes</Button>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

/**
 * Hieu ứng xuất hiện của dialog
 */
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default Contact;
