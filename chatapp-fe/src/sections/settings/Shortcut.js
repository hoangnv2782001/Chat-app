import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";


const Shortcut = ({ open, handleClose }) => {

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        keepMounted
        TransitionComponent={Transition}
        sx={{ p: 4 }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Keyboard Shortcuts</DialogTitle>
        <DialogContent sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            {keyboards.map((element) => {
              return (
                <Grid key={element.key} container item xs={6}>
                  <Stack
                    direction="row"
                    alignItems={"center"}
                    justifyContent="space-between"
                    spacing={3}
                    sx={{ width: "100%" }}
                  >
                    <Typography variant="caption" sx={{ fontSize: 14 }}>
                      {element.title}
                    </Typography>
                    <Stack direction="row" spacing={2}>
                      {element.combination.map((element) => {
                        return (
                          <Button
                            disabled
                            variant="contained"
                            sx={{ color: "#212121" }}
                          >
                            {element}
                          </Button>
                        );
                      })}
                    </Stack>
                  </Stack>
                </Grid>
              );
            })}
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const keyboards = [
  {
    key: 0,
    title: "Mark as unread",
    combination: ["Cmd", "Shift", "U"],
  },
  {
    key: 1,
    title: "Mute",
    combination: ["Cmd", "Shift", "M"],
  },
  {
    key: 2,
    title: "Archive Chat",
    combination: ["Cmd", "Shift", "E"],
  },
  {
    key: 3,
    title: "Delete Chat",
    combination: ["Cmd", "Shift", "D"],
  },
  {
    key: 4,
    title: "Pin Chat",
    combination: ["Cmd", "Shift", "P"],
  },
  {
    key: 5,
    title: "Search",
    combination: ["Cmd", "F"],
  },
  {
    key: 6,
    title: "Search Chat",
    combination: ["Cmd", "Shift", "F"],
  },
  {
    key: 7,
    title: "Next Chat",
    combination: ["Cmd", "N"],
  },
  {
    key: 8,
    title: "Next Step",
    combination: ["Ctrl", "Tab"],
  },
  {
    key: 9,
    title: "Previous Step",
    combination: ["Ctrl", "Shift", "Tab"],
  },
  {
    key: 10,
    title: "New Group",
    combination: ["Cmd", "Shift", "N"],
  },
  {
    key: 11,
    title: "Profile & About",
    combination: ["Cmd", "P"],
  },
  {
    key: 12,
    title: "Increase speed of voice message",
    combination: ["Shift", "."],
  },
  {
    key: 13,
    title: "Decrease speed of voice message",
    combination: ["Shift", ","],
  },
  {
    key: 14,
    title: "Settings",
    combination: ["Shift", "S"],
  },
  {
    key: 15,
    title: "Emoji Panel",
    combination: ["Cmd", "E"],
  },
  {
    key: 16,
    title: "Sticker Panel",
    combination: ["Cmd", "S"],
  },
];
/**
 * Hieu ứng xuất hiện của dialog
 */
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default Shortcut;
