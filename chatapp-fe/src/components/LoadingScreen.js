import { Box, CircularProgress } from "@mui/material";
import React from "react";

export const LoadingScreen = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
      }}
    >
      <CircularProgress />
    </Box>
  );
};


