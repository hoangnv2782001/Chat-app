import { Dialog, DialogContent, DialogTitle, Slide } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/search";
import { MagnifyingGlass } from "phosphor-react";
import { MEMBERS } from "../../data";
import { CallElement } from "../../components/CallLogElement";

const StartCall = ({ open, handleClose }) => {
  return (
    <Dialog
      // sua đổi so với ban đầu
      open={open}
      maxWidth="xs"
      TransitionComponent={Transition}
      keepMounted
      sx={{ p: 4 }}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      {/* dialog title  */}
      <DialogTitle>Start Call</DialogTitle>
      <DialogContent sx={{mt:4}}>
      <Stack spacing={3}>
            {/* Thanh search bar chứa icon MagnifyingGlass và ô nhập liệu */}
            <Stack sx={{ width: "100%" }}>
              <Search>
                <SearchIconWrapper>
                  <MagnifyingGlass color="#709CE6" />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search..."
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Stack>
    
            {/* call list */}
    
            {MEMBERS.map((element) => (
              <CallElement {...element} />
            ))}
      </Stack>
      </DialogContent>

      {/* content dialog */}
    </Dialog>
  );
};

/**
 * Hieu ứng xuất hiện của dialog
 */
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default StartCall;
