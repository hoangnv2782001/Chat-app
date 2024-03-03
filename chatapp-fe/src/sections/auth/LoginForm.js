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

import { useDispatch } from "react-redux";
import { Login } from "../../Redux/slices/auth";
import { useAuth } from "../../hooks/useAuth";

const LoginForm = () => {
  // const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState();
  const {login} = useAuth()
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be is valid address"),
    password: Yup.string().required("Password is required"),
  });

  const defauleValues = {
    email: "hoangnv@gmail.com",
    password: "hoang123",
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defauleValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;




  /**
   * handle login 
   * @param {Object} data : du liệu login : email vs password
   */
  const onSubmit = async (data) => {
    try {
     

      login(data)
    } catch (error) {
      console.log("1234567",error);
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
        <Link
          to="/auth/reset-password"
          component={RouterLink}
          variant="body2"
          color="inherit"
          underline="always"
        >
          Forgot Password
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
        Login
      </Button>
    </FormProvider>
  );
};

export default LoginForm;
