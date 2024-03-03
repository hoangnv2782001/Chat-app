import { Stack, Typography } from "@mui/material";
import { CaretLeft } from "phosphor-react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import NewPasswordForm from "../../sections/auth/NewPasswordForm";

/**
 * new passwrd component
 * @returns comppônent
 */
const NewPassword = () => {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h3">Reset your password</Typography>

        <Typography sx={{ color: "text.secondary", mb: 5 }}>
          Please enter your new password
        </Typography>

        {/* form */}
        <NewPasswordForm/>

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

export default NewPassword;
