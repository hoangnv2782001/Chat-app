import { Divider, IconButton, Stack } from "@mui/material";
import { FacebookLogo, GoogleLogo } from "phosphor-react";
import React from "react";
/**
 * Hien thi icon social login
 * @returns {Component}
 */
const AuthSocial = () => {
  return (
    <div>
      <Divider
        sx={{
          my: 2.5,
          typography: "overline",
          color: "text.disabled",
          "&::before,::after": {
            borderTopStyle: "dashed",
          },
        }}
      >
        OR
      </Divider>

      <Stack direction="row" justifyContent="center" spacing={2}>
        <IconButton>
          <GoogleLogo color="#DF3E30" />
        </IconButton>
        <IconButton >
          <FacebookLogo color="#2962ff" />
        </IconButton>
      </Stack>
    </div>
  );
};

export default AuthSocial;
