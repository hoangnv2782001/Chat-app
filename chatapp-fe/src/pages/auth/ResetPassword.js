import { Link, Stack, Typography } from "@mui/material";
import { CaretLeft } from "phosphor-react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import ResetPasswordForm from "../../sections/auth/ResetPasswordForm";
const ResetPassword = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h3">Forgot your password</Typography>

        <Typography sx={{ color: "text.secondary", mb: 5 }}>
          {" "}
          Please enter the email address associated with your account and We
          will email you a link to reset your password.
        </Typography>
        {/* form */}

        <ResetPasswordForm/>
        <Typography
          to="/auth/login"
          component={RouterLink}
          variant="subtitle2"
          color="inherit"
          sx={{
            alignItems: "center",
            mt: 3,
            mx: "auto",
            display: "inline-flex",
          }}
        >
          <CaretLeft />
          Back to login
        </Typography>
      </Stack>
    </>
  );
};

export default ResetPassword;
