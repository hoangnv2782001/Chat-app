import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Typography,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CloseIcon from "@mui/icons-material/Close";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import FormProvider from "../../components/hook-form/FormProvider";
import { RHFTextFeild } from "../../components/hook-form";
import { Stack } from "@mui/system";
import RHFAutocomplete from "../../components/hook-form/RHFAutocomplete";
import { useSelector } from "react-redux";

import useGroup from "../../hooks/useGroup";
import { uploadAvatarApi } from "../../service/FileService";
import { useApp } from "../../hooks/useApp";
/**
 * Hiển thị dialog tao group
 * @param {Boolean} open
 * @callback {function} handleClose
 * @return {Component}
 *
 */
const CreateGroup = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      maxWidth="lg"
      TransitionComponent={Transition}
      keepMounted
      position={"absolute"}
      sx={{
        margin:
          "0 auto 100px" /* margin-top: 0, margin-right và margin-left: auto, margin-bottom: 10px */,
        width: "fit-content",
      }}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <Stack
        sx={{
          paddingLeft: "16px",
          paddingRight: "16px",
          paddingTop: "16px",
          width: "520px",
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
          Create Group
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
      {/* sửa đổi so với bảb gốc */}

      <DialogContent sx={{ mt: 3 }} style={{ paddingTop: "0.5rem" }}>
        <CreateGroupForm handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
};

const CreateGroupForm = ({ handleClose }) => {
  const CreateGroupSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    // member: Yup.string().min(2, "Must have at least 2 members"),
    members: Yup.array().required().min(2, "Must have at least 2 memberss"),
  });
  const fileRef = useRef(null);

  const { createGroup } = useGroup();

  const { friends, user } = useSelector((state) => state.app);

  const { showSnackbar, updateAvatar } = useApp();
  const [loadingAvatar, setLoadingAvatar] = useState(false);

  const [avatar, setAvatar] = useState();

  /**
   * upload avatar
   * @param {*} file
   */
  const uploadAvatar = async (file) => {
    try {
      setLoadingAvatar(true);
      const response = await uploadAvatarApi(file);
      if (response.status === 200) {
        setAvatar(response.data);
        setLoadingAvatar(false);
      }
    } catch (err) {
      showSnackbar({ severity: "error", message: "Something went wrong!" });
      setLoadingAvatar(false);
    }
  };

  const defauleValues = {
    name: "",
    members: [],
  };

  const methods = useForm({
    resolver: yupResolver(CreateGroupSchema),
    defauleValues,
  });

  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;
  /**
   * submit form
   * @param {*} data
   */
  const onSubmit = (data) => {
    console.log("create group data", data);
    try {
      if (!avatar) {
        setError("avatar", { message: "Avatar is require" }, true);
        reset();
        return;
      }
      data?.members.push(user);
      createGroup({ ...data, avatar });
      handleClose();
    } catch (error) {
      console.log(error);
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
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

      if (type !== "IMAGE") {
        showSnackbar({ severity: "error", message: "Please select image!!!" });

        return;
      }

      uploadAvatar(event.target.files[0]);
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
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        {!!errors?.afterSubmit && (
          <Alert severity="error">{errors?.afterSubmit.message}</Alert>
        )}

        {!!errors?.avatar && (
          <Alert severity="error">{errors?.avatar.message}</Alert>
        )}

        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={1.5}
          justifyContent={"start"}
        >
          <Box>
            <Stack
              alignItems={"center"}
              justifyContent={"center"}
              direction={"row"}
              onClick={onChooseImage}
              sx={{
                width: "46px",
                height: "46px",
                borderRadius: "50%",
                border: "1px solid #7589a3",
                cursor: "pointer",
              }}
            >
              {avatar ? (
                <Avatar src={avatar} />
              ) : (
                <CameraAltIcon size={"24px"} />
              )}
            </Stack>
          </Box>
          <input
            type="file"
            ref={fileRef}
            accept="image/*"
            onChange={handleOnChange}
            style={{ display: "none" }}
          />
          <RHFTextFeild name="name" label="Name" variant="standard" />
        </Stack>
        {/* <RHFTextFeild name="members" label="Name" variant="standard" /> */}
        <RHFAutocomplete
          name="members"
          label="Memberss"
          filterSelectedOptions
          control={control}
          multiple
          freeSolo
          defauleValue={[]}
          options={friends}
          getOptionLabel={(option) => option?.name}
          ChipProps={{ size: "medium" }}
        />

        <Stack
          direction="row"
          alignItems={"center"}
          justifyContent="end"
          spacing={2}
        >
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Create
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

//fake members

const MEMBERSS = ["hoang1", "hoang", "hoa"];

/**
 * Hieu ứng xuất hiện của dialog
 */
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default CreateGroup;
