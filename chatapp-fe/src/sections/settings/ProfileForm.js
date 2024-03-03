import React from "react";
import FormProvider from "../../components/hook-form/FormProvider";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { Eye, EyeSlash } from "phosphor-react";
import { Link as RouterLink } from "react-router-dom";
import {
  Alert,
  IconButton,
  InputAdornment,
  Stack,
  Link,
  Button,
} from "@mui/material";
import { RHFTextFeild } from "../../components/hook-form";
import { useTheme } from "@mui/material/styles";
import { useCallback } from "react";

const ProfileForm = () => {
  const ProfileSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    about: Yup.string().required("About is required"),
    avatarUrl: Yup.string().required("Avatar is required").nullable(true),
  });

  const defauleValues = {
    email: "",
    about: "",
  };

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defauleValues,
  });

  const {
    reset,
    watch,
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const values = watch();

  /**
   * 
   * This allows us to isolate resource intensive functions so that they will not automatically run on every render.
   * The useCallback Hook only runs when one of its dependencies update.
   * This can improve performance.
   * 
   */
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue("avatarUrl", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const onSubmit = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <RHFTextFeild
          name="name"
          label="Name"
          helperText={"This name is visible to your contacts."}
        />

        <RHFTextFeild
          multiline
          rows={4}
          maxRows={5}
          name="about"
          label="About"
        />

        <Stack direction="row" justifyContent="end">
          <Button color="primary" size="large" type="submit" variant="outlined">
            Save
          </Button>
        </Stack>
      </Stack>

   
    </FormProvider>
  );
};

export default ProfileForm;
