import React from "react";
import FormProvider from "../../components/hook-form/FormProvider";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { Eye, EyeSlash } from "phosphor-react";
import {
  Alert,
  IconButton,
  InputAdornment,
  Stack,
  Link,
  Button,
} from "@mui/material";

import { RHFTextFeild } from "../../components/hook-form";
import { useDispatch } from "react-redux";
import { ForgotPassword } from "../../Redux/slices/auth";
import { useAuth } from "../../hooks/useAuth";

const ResetPasswordForm = () => {
  const { forgotPassword } = useAuth();
  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be is valid address"),
  });

  const defauleValues = {
    email: "hoangnv@gmail.com",
  };

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defauleValues,
  });

  const onSubmit = async (data) => {
    console.log("email ",data)
    try {
      forgotPassword(data.email);
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
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <RHFTextFeild name="email" label="Email address" />

        <Button
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          sx={{
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",

            "&:hover": {
              bgcolor: "text.primary",
              color: (theme) =>
                theme.palette.mode === "light" ? "common.white" : "grey.800",
            },
          }}
        >
          Reset
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default ResetPasswordForm;
