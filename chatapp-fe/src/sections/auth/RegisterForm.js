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
import { Register } from "../../Redux/slices/auth";
import { useAuth } from "../../hooks/useAuth";

/**
 * Register form component
 * @returns
 */
const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState();

  const { register } = useAuth();

  /**
   * Shema validation fields in form
   */
  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email must be is valid address"),
    password: Yup.string()
      .min(6, "Password has at least 6 characters")
      .required("Password is required"),
  });

  // default values of input form
  const defauleValues = {
    name: "",
    email: "hoangnv@gmail.com",
    password: "hoang123",
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defauleValues,
  });

  /**
   * handle submit form register
   */
  const onSubmit = async (data) => {
    try {
      register(data);
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
    formState: { errors },
  } = methods;
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <RHFTextFeild name="name" label="Name" />

        <RHFTextFeild name="email" label="Email address" />

        <RHFTextFeild
          name="password"
          label="password"
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
      </Stack>

      <Stack alignItems={"flex-end"} sx={{ my: 2 }}>
        <Link variant="body2" color="inherit" underline="always">
          {"Forgot Password"}
        </Link>
      </Stack>
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
        Sign up
      </Button>
    </FormProvider>
  );
};

export default RegisterForm;
