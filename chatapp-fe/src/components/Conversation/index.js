import { Stack, Box } from "@mui/material";

import React, { useEffect, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";
import { useTheme } from "@mui/material/styles";
import useResponsive from "../../hooks/useResponsive";
import { useSelector } from "react-redux";
import { SimpleBarStyle } from "../Scrollbar";
/**
 * Convensation tao khung chat hôi thoai
 * @returns {Conponent}
 */
const Convensation = () => {

  const isMobile = useResponsive("between", "md", "xs", "sm");
  const theme = useTheme();

  const messageListRef = useRef(null);

  const { messages } = useSelector(
    (state) => state.conversation
  );

  const {current_conversation} = useSelector((state) => state.conversation);

  useEffect(() => {
    // Scroll to the bottom of the message list when new messages are added
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [messages]);




  return (
    <Stack sx={{ height:"100%", maxHeight:"100vh",width:"100%"}}>
      {/* header chat */}
      <Header {...current_conversation.user}/>

      {/* chat content */}

      <Box
        ref={messageListRef}
        width={"100%"}
        sx={{
          position: "relative",
          flexGrow: 1,
          overflowY: "scroll",
          overflowX :"hidden",
          backgroundColor:
            theme.palette.mode === "light"
              ? "#fff"
              : theme.palette.background,

          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        }}
      >
        <SimpleBarStyle timeout={500} clickOnTrack={false}>
          <Message menu={true} isMobile={isMobile} />
        </SimpleBarStyle>
      </Box>


      {/* Footer chat */}
      <Footer />
    </Stack>
  );
};

export default Convensation;
