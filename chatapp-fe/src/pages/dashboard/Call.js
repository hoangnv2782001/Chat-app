// import { Box, Stack } from "@mui/system";
// import React from "react";
// import { SimpleBarStyle } from "../../components/Scrollbar";
// import { Divider, IconButton, Link, Typography } from "@mui/material";
// import {
//   Search,
//   SearchIconWrapper,
//   StyledInputBase,
// } from "../../components/search";

// import { Link as RouterLink } from "react-router-dom";
// import { MagnifyingGlass, Phone, Plus } from "phosphor-react";

// import { useTheme } from "@mui/material/styles";
// import { useState } from "react";
// import { CallLogElement } from "../../components/CallLogElement";
// import { CallList } from "../../data";
// import StartCall from "../../sections/main/StartCall";
// /**
//  * 
//  * @returns component
//  */
// const Call = () => {
//   const theme = useTheme();
//   const [openDialog, setOpenDialog] = useState(false);

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };
//   return (
//     <>
//       <Stack direction={"row"} sx={{ width: "100%" }}>
//         <Box
//           sx={{
//             position: "relative",
//             width: 320,
//             backgroundColor: (theme) =>
//               theme.palette.mode === "light"
//                 ? "#F8FAFF"
//                 : theme.palette.background.paper,
//             boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
//           }}
//         >
//           {/*Wrapper tất cả nội dung trong chat bar và bố cục sử dụng flex*/}
//           <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
//             {/* Chứa tiêu đề side bar và một button icon */}
//             <Stack
//               direction="row"
//               alignItems={"center"}
//               justifyContent="space-between"
//             >
//               <Typography variant="h5">Call Logs</Typography>
//             </Stack>

//             {/* Thanh search bar chứa icon MagnifyingGlass và ô nhập liệu */}
//             <Stack sx={{ width: "100%" }}>
//               <Search>
//                 <SearchIconWrapper>
//                   <MagnifyingGlass color="#709CE6" />
//                 </SearchIconWrapper>
//                 <StyledInputBase
//                   placeholder="Search..."
//                   inputProps={{ "aria-label": "search" }}
//                 />
//               </Search>
//             </Stack>

//             {/* Stack chứa thanh tao group*/}
//             <Stack
//               alignItems={"center"}
//               direction="row"
//               justifyContent="space-between"
//             >
//               <Typography variant="subtitle2" component={Link}>
//                 Start Conversation
//               </Typography>

//               <IconButton
//                 onClick={() => {
//                   setOpenDialog(true);
//                 }}
//               >
//                 <Phone sx={{ color: theme.palette.primary.main }} />
//               </IconButton>
//             </Stack>

//             <Divider />

//             {/* Stack chứa các box chat element */}
//             <Stack
//               direction="column"
//               spacing={2}
//               sx={{ flexGrow: 1, overflowY: "scroll", height: "100%" }}
//             >
//               {/* Scroll bar đã chỉnh sửa part2  */}
//               <SimpleBarStyle theme={theme} timeout={500} clickOnTrack={false}>
//                 {/* pinned chat */}
//                 <Stack spacing={2.5}>
//                   {CallList.map((element) => (
//                     <CallLogElement {...element} />
//                   ))}
//                 </Stack>
//               </SimpleBarStyle>
//             </Stack>
//           </Stack>
//         </Box>
//         {/* //TODO :=> reuse conventation component */}
//       </Stack>

//       {openDialog && <StartCall open={openDialog} handleClose={handleCloseDialog}/>}
//     </>
//   );
// };

// export default Call;
