import {
  Avatar,
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,


  Skeleton,


  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { CaretLeft, ClosedCaptioning } from "phosphor-react";
import React, { useRef, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";

import img from "../../assets/Images/cover.png";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";

import { fDate } from "../../utils/formatTime";
import { useApp } from "../../hooks/useApp";
import { uploadAvatarApi } from "../../service/FileService";

const Profile = ({ open, handleClose }) => {
  const { user, friends, friendRequests } = useSelector((state) => state.app);
  const fileRef = useRef(null);

  const { showSnackbar, updateAvatar} = useApp();
  const [loadingAvatar, setLoadingAvatar] = useState(false);

  /**
   * upload avatar 
   * @param {*} file 
   */
  const uploadAvatar = async (file) => {
    try {
      setLoadingAvatar(true)
      const response = await uploadAvatarApi(file);
      if (response.status === 200) {

        // showSnackbar({severity:"success",message:"Change avatr successfully!"})
        // setLoadingAvatar(false)
        updateAvatar(response.data,setLoadingAvatar)

        console.log("upload thanh cong")
      }
    } catch (err) {
      showSnackbar({ severity: "error", message: "Something went wrong!" })
      console.log("upload that bai")
      setLoadingAvatar(false)
    }
  };

  /**
   * choose file
   * @param {*} event 
   * @returns 
   */
  const handleOnChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const type = checkFileType(event.target.files[0]);

      if (type === "FILE") {
        showSnackbar({ severity: "error", message: "Please select image!!!" });
        return;
      }

      uploadAvatar(event.target.files[0])
    }
  };
  /**
   * check file type
   * @param {*} file 
   * @returns 
   */

  const checkFileType = (file) => {
    return file && file["type"].split("/")[0] === "image" ? "IMAGE" : "FILE";
  };

  /**
   * click file
   */
  const onChooseImage = () => {
    fileRef.current.click();
  };

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
          Profile
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
      <DialogContent sx={{ p: 0, width: "100%" }}>
        <Box sx={{ width: 400 }}>
          <Stack
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ height: "auto" }}
          >
            <Box sx={{ height: "120px", width: "100%" }}>
              <img
                src={img}
                alt="123"
                style={{
                  width: "100%",
                  height: "100%",
                  overflowClipMargin: "content-box",
                  overflow: "clip",
                }}
              />
            </Box>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <CameraAltOutlinedIcon
                  sx={{ cursor: "pointer",zIndex:1000 }}
                  
                  onClick={onChooseImage}
                />
              }
            >
              <Avatar
                src={loadingAvatar ? '' : user?.img}
                sx={{ width: "100px", height: "100px", mt: "-30px" }}
              >
               {loadingAvatar && <Skeleton variant="circular" width={100} height={100} />}
              </Avatar>
              <input
                type="file"
                ref={fileRef}
                accept="image/*"
                onChange={handleOnChange}
                style={{ display: "none" }}
              />
            </Badge>{" "}
            <Stack
              direction={"row"}
              alignItems={"center"}
              spacing={1}
              sx={{
                mt: "5px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "18px",
                  fontWeight: 500,
                  lineHeight: "27px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {user?.name}
              </Typography>
              {/* <BorderColorOutlinedIcon
                fontSize={"8px"}
                sx={{
                  cursor: "pointer",
                  ":hover": {
                    backgroundColor: "#DFE2E7",
                    borderRadius: "50%",
                  },
                }}
              /> */}
            </Stack>
          </Stack>

          <Box
            sx={{
              width: "100%",
              height: "10px",
              mt: "10px",
              backgroundColor: "#EEF0F1",
            }}
          ></Box>

          <Stack spacing={1} alignItems={"start"} sx={{ p: "16px 16px" }}>
            <Typography
              sx={{ fontSize: "16px", fontWeight: 500, lineHeight: 1.5 }}
            >
              Personnal Information
            </Typography>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              {" "}
              <Typography sx={{ width: "120px", color: "#7589a3" }}>
                Email{" "}
              </Typography>
              <Typography>{user?.email}</Typography>
            </Stack>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              {" "}
              <Typography sx={{ width: "120px", color: "#7589a3" }}>
                Friends
              </Typography>
              <Typography>{friends?.length}</Typography>
            </Stack>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              {" "}
              <Typography sx={{ width: "120px", color: "#7589a3" }}>
                Friends Request
              </Typography>
              <Typography>{friendRequests?.length}</Typography>
            </Stack>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              {" "}
              <Typography sx={{ width: "120px", color: "#7589a3" }}>
                Joined
              </Typography>
              <Typography>{fDate(user?.createAt)}</Typography>
            </Stack>
          </Stack>
        </Box>
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

export default Profile;
