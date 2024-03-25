import {
  Avatar,
  Badge,

  Button,
  Checkbox,
  Dialog,
  DialogContent,

  IconButton,
  InputAdornment,
  Slide,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import useGroup  from "../../hooks/useGroup";

const AddMembers = ({ open, handleClose }) => {
  const { friends } = useSelector((state) => state.app);

  const { current_conversation } = useSelector((state) => state.conversation);
  const {addMembers} = useGroup()

  const [members, setMembers] = useState([]);
  const users = friends.filter(
    (e) => !current_conversation.members.some((el) => el.id === e.id)
  );
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      sx={{
        zIndex: 1400,
        width: "fit-content",
        margin: "auto",
        borderRadius: 1,
      }}
    >
      <Stack
        sx={{
          paddingLeft: "16px",
          paddingRight: "16px",
          height: "48px",
          paddingBottom: "16px",
        }}
        alignItems={"center"}
        direction={"row"}
        justifyContent={"space-between"}
      >
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: 1.5,
            display: "block",
          }}
        >
          Add Members
        </Typography>
        <CloseIcon
          onClick={handleClose}
          sx={{
            cursor: "pointer",
            ":hover": {
              backgroundColor: "#DFE2E7",
              borderRadius: "50%",
            },
          }}
        />
      </Stack>
      <DialogContent sx={{ p: 0, width: "100%", overflow: "hidden" }}>
        <Stack
          sx={{ width: 400, height: "100%", p: "0px 16px" }}
        >
          <Stack height={"100%"}>
            <TextField
              id="search-bar"
              className="text"
              //   onInput={handleInput}
              //   label="Search title"
              variant="outlined"
              placeholder="Search..."
              size="small"
              sx={{
                width: "100%",
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton type="submit" aria-label="search">
                      <SearchIcon style={{ fill: "blue" }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <Stack
            alignItems={"center"}
            // direction={"row"}
            sx={{ p: "8px 0px", width: "100%", overflow: "auto" }}
          >
            <Stack
              alignItems={"center"}
              direction={"row"}
              justifyContent={!members.length ? "center" : ""}
              spacing={2}
              sx={{ overflow: "auto", width: "100%", height: "100px" }}
            >
              {!!members.length ? (
                members.map((e) => (
                  <MemberList key={e.id} {...e} setMembers={setMembers} />
                ))
              ) : (
                <Typography variant="h5">No member</Typography>
              )}
            </Stack>
            <Stack
              spacing={1}
              alignItems={"start"}
              sx={{ width: "100%", overflowY: "scroll", height: "450px" }}
            >
              <Typography
                sx={{ fontSize: "16px", fontWeight: 500, lineHeight: 1.5 }}
              >
                Recent
              </Typography>
              <Stack
                justifyContent={"center"}
                spacing={1}
                sx={{ width: "100%" }}
              >
                {!!users.length &&
                  users.map((e) => (
                    <FriendLists
                      key={e?.id}
                      {...e}
                      setMembers={setMembers}
                      members={members}
                    />
                  ))}
              </Stack>
            </Stack>
          </Stack>

        </Stack>
        
        <Stack
            alignItems={"center"}
            justifyContent={"center"}
            sx={{ p: 2, height: "54px" }}
          >
            {" "}
            <Button variant="contained" disabled={!members.length} onClick={()=>{
                   addMembers(current_conversation.id,members)
                   handleClose()
            }}>
              Add Members
            </Button>
          </Stack>
      </DialogContent>
    </Dialog>
  );
};
/**
 * Hieu ứng xuất hiện của dialog
 */
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FriendLists = ({ img, name, id, setMembers, members }) => {
  const isChecked = !!members.find((e) => e.id === id);

  const handleClick = () => {
    if (isChecked) {
      setMembers((members) => members.filter((e) => e.id !== id));
    } else {
      setMembers((members) => [...members, { id, name, img }]);
    }
  };

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      onClick={handleClick}
      sx={{
        width: "100%",
        cursor: "pointer",
        p: "4px 8px",
        "&:hover": {
          backgroundColor: "#F5F5F5",
        },
      }}
    >
      <Stack direction={"row"} spacing={1} alignItems={"center"}>
        <Avatar src={img} alt={name} />

        <Typography>{name}</Typography>
      </Stack>
      <Checkbox checked={isChecked} />
    </Stack>
  );
};

const MemberList = ({ id, name, img, setMembers }) => {
  return (
    <Stack
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ width: "78px" }}
    >
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        badgeContent={
          <IconButton
            sx={{
              cursor: "pointer",
              zIndex: 1000,
              width: "24px",
              height: "24px",
            }}
            size={"small"}
            onClick={() => {
              setMembers((members) => members.filter((e) => e.id !== id));
            }}
          >
            <CloseIcon sx={{ width: "100%", height: "100%" }} />
          </IconButton>
        }
      >
        <Avatar src={img} alt={name} />
      </Badge>
      <Typography
      variant="caption"
        sx={{
          
          fontSize: "12px",
          fontWeight: 400,
          textAlign: "center",
          whiteSpaceCollapse: "collapse",
          textOverflow: "ellipsis",
          textWrap: "wrap",
        }}
      >
        {name}
      </Typography>
    </Stack>
  );
};
export default AddMembers;
