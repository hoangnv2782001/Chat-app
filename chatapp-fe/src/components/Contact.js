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
import { X } from "phosphor-react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { togglesidebar } from "../Redux/slices/app";
import { Edit } from "@mui/icons-material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { Member } from "../components/group/Members";
import AddMembers from "./group/AddMembers";
import useGroup from "../hooks/useGroup";

/**
 * Hien thi contact cua môt chat friend
 * @returns {Component}
 */
const Contact = ({ id, name, avatar, members, admin }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.app);

  const { current_conversation } = useSelector((state) => state.conversation);
  const { leaveGroup,removeMember } = useGroup();
  const [openBlock, setOpenBlock] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [openAddMember, setOpenAddMember] = useState(false);

  console.log("render contact ", members);

  const handleCloseAddMember = () => {
    setOpenAddMember(false);
  };
  const handleCloseBlock = () => {
    setOpenBlock(false);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleRemoveMember = (id) => {
    removeMember(id,current_conversation?.id);
  };

  const handleLeaveGroup = () => {
    const id = members.find((e) => e.id === user.id).memberId;
   
    leaveGroup(id,current_conversation?.id);
    handleCloseDelete();
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
            <Typography variant="subtitle2">Group Info</Typography>
            <IconButton
              onClick={() => {
                dispatch(togglesidebar());
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
          p={2}
          spacing={1.5}
        >
          {/* Thông tin user chat */}

          <Stack spacing={1} alignItems={"center"}>
            <Avatar src={avatar} alt={name} sx={{ width: 64, height: 64 }} />

            {/* Hiển thị tên và tin nhắn cuối cùng chưa đọc */}
            <Stack spacing={0.5}>
              <Typography variant="article" fontWeight={600}>
                {name}
              </Typography>
            </Stack>
          </Stack>

          {admin.id === user.id && (
            <Stack
              direction="row"
              justifyContent="space-evenly"
              alignItems={"center"}
            >
              <Stack spacing={0.5} alignItems={"center"}>
                <IconButton onClick={() => setOpenAddMember(true)}>
                  <GroupAddIcon />
                </IconButton>
                <Typography variant="overline">Add member</Typography>
              </Stack>
              <Stack spacing={0.5} alignItems={"center"}>
                <IconButton>
                  <Edit />
                </IconButton>
                <Typography variant="overline">Edit name</Typography>
              </Stack>
            </Stack>
          )}
          <Divider />

          {/* group */}

          <Stack alignItems={"start"} spacing={2}>
            <Typography sx={{ fontWeight: 500, fontSize: "16px" }}>
              Group member
            </Typography>
            <Stack alignItems={"center"} direction={"row"} spacing={1}>
              <PeopleAltOutlinedIcon />
              <Typography variant="body2">
                {" "}
                {`${members.length} Members`}
              </Typography>
            </Stack>
          </Stack>
          <Stack
            sx={{
              flexGrow: 1,
              width: "100%",
              overflow: "hidden",
              p: "0px 8px",
            }}
          >
            <Stack
              alignItems={"center"}
              // direction={"row"}
              spacing={1.5}
              sx={{ width: "100%", overflow: "auto" }}
            >
              {members.map((e) => (
                <Member key={e.id} {...e} removeMember={handleRemoveMember} />
              ))}
            </Stack>
          </Stack>
        </Stack>
        {/* button */}
        <Stack alignItems={"start"} justifyItems={"center"}>
          <Stack
            onClick={() => {
              setOpenDelete(true);
            }}
            direction={"row"}
            alignItems={"center"}
            spacing={1}
            sx={{
              cursor: "pointer",
              p: 2,
              width: "100%",
              "&:hover": {
                backgroundColor: "#F3F5F6",
              },
            }}
          >
            <LogoutIcon />
            <Typography>Leave Group</Typography>
          </Stack>
        </Stack>
      </Stack>
      {openBlock && (
        <BlockDialog open={openBlock} handleClose={handleCloseBlock} />
      )}
      {openDelete && (
        <DeleteDialog
          open={openDelete}
          handleClose={handleCloseDelete}
          leaveGroup={handleLeaveGroup}
        />
      )}

      {openAddMember && (
        <AddMembers open={openAddMember} handleClose={handleCloseAddMember} />
      )}
      {/* {openAddMember && <Members open={openAddMember} handleClose={handleCloseAddMember} members={members}/>} */}
    </Box>
  );
};

/**
 * Hiển thị dialog xác nhận block
 * @param {Boolean} open
 * @callback {function} handleClose
 * @return {Component}
 */
const DeleteDialog = ({ open, handleClose, leaveGroup }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Leave Group</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure want to leave this group?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={leaveGroup}>Yes</Button>
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
const BlockDialog = ({ open, handleClose }) => {
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
