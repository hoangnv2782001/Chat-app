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
import { useSearchParams } from "react-router-dom";
import { NewPassword } from "../../Redux/slices/auth";
import { useAuth } from "../../hooks/useAuth";
const NewPasswordForm = () => {
  const { resetPassword } = useAuth();

  const [queryParameters] = useSearchParams();

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const NewPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must be at least  characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .required("Password is required")
      .oneOf([Yup.ref("password"), null], "Password must match"),
  });

  const defauleValues = {
    password: "",
    confirmPassword: "",
  };

  const methods = useForm({
    resolver: yupResolver(NewPasswordSchema),
    defauleValues,
  });

  const onSubmit = async (data) => {

    console.log("reset pass ",data)
    try {
      resetPassword({
        ...data,
        token: queryParameters.get("code"),
      });
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

        <RHFTextFeild
          name="password"
          label="New Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            // Emojin
            endAdornment: (
              <InputAdornment>
                <IconButton
                  onClick={() => {
                    setShowPassword((state) => !state);
                  }}
                >
                  {showPassword ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <RHFTextFeild
          name="confirmPassword"
          label="Confirm Password"
          type={showPassword1 ? "text" : "password"}
          InputProps={{
            // Emojin
            endAdornment: (
              <InputAdornment>
                <IconButton
                  onClick={() => {
                    setShowPassword1((state) => !state);
                  }}
                >
                  {showPassword1 ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

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
          Submit
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default NewPasswordForm;
