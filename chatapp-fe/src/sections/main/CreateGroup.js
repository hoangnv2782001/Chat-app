import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import FormProvider from "../../components/hook-form/FormProvider";
import { RHFTextFeild } from "../../components/hook-form";
import { Stack } from "@mui/system";
import RHFAutocomplete from "../../components/hook-form/RHFAutocomplete";
/**
 * Hiển thị dialog tao group
 * @param {Boolean} open
 * @callback {function} handleClose
 * @return {Component}
 */
const CreateGroup = ({ open, handleClose }) => {
  return (
    <Dialog 
      open={open}
      maxWidth="xs"
      TransitionComponent={Transition}
      keepMounted
      sx={{ p: 4}}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Create new group</DialogTitle>
      {/* sửa đổi so với bảb gốc */}
      <DialogContent sx={{ mt: 3}} style={{paddingTop:"0.5rem"}}>
        <CreateGroupForm handleClose={handleClose} />
      </DialogContent>
     
    </Dialog>
  );
};

const CreateGroupForm = ({ handleClose }) => {
  const CreateGroupSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    member: Yup.array().min(2, "Must have at least 2 members"),
  });

  const defauleValues = {
    title: "",
    member: [],
  };

  const methods = useForm({
    resolver: yupResolver(CreateGroupSchema),
    defauleValues,
  });

  const onSubmit = async (data) => {
    try {
    } catch (error) {
      console.log(error);
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
    }
  };

  const {
    reset,
    setError,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} >
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <RHFTextFeild name="titler" label="Title" />

        <RHFAutocomplete
          name="members"
          label="Members"
          multiple
          freeSolo
          options={MEMBERS.map((option) => option)}
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

//fake member

const MEMBERS = ["hoang1", "hoang", "hoa"];

/**
 * Hieu ứng xuất hiện của dialog
 */
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default CreateGroup;
