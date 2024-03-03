import { Link, Stack, Typography } from "@mui/material";
import React from "react";

import { Link as RouterLink } from "react-router-dom";
import RegisterForm from "../../sections/auth/RegisterForm";



const Register = () => {
  return (
    <>
      {/* header */}
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Wellcom To Chatapp</Typography>
        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">Already have an accout?</Typography>
          <Link to="/auth/login" component={RouterLink} variant="subtitle2">
            Login
          </Link>
        </Stack>
        {/* register form */}

        <RegisterForm/>

        <Typography
          component="div"
          sx={{
            textAlign: "center",
            mt: 3,
            typography: "caption",
            color: "text.secondary",
          }}
        >
          {"By signining up, I agree to. "}
          <Link underline="always" color="text.primary">
            Term of service
          </Link>
          {" and "}
          <Link underline="always" color="text.primary">
            Privacy policy
          </Link>
        </Typography>
      </Stack>
    </>
  );
};

export default Register;
