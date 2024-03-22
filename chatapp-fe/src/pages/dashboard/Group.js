import {
  Box,

  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";



import { useTheme } from "@mui/material/styles";

import NoChatSvg from "../../assets/Illustration/NoChat.js";

import GroupChat from "../../components/group/GroupChat.js";
import { useDispatch, useSelector } from "react-redux";
import Convensation from "../../components/Conversation";
import useGroup from "../../hooks/useGroup.js";
import { fetchCurrentMessages, selectConversation } from "../../Redux/slices/conversation.js";
import Contact from "../../components/Contact.js";
/**
 * Hiển thị khung chat group tương tự khung chat vs bạn
 * Gòm các thành phàn :
 *    Title
 *    Search
 *    Create group
 *    Pinned chat
 *    all chats
 * @returns {component}
 */
const Group = () => {
  const theme = useTheme();
 
  const { sidebar } = useSelector((state) => state.app);
  const { chatType,groups,current_conversation } = useSelector((state) => state.conversation);
  const { user } = useSelector((state) => state.app);
  const {subcribeChannels} = useGroup()
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchCurrentMessages({ messages: [] }));
    dispatch(selectConversation({ chatType: "group" ,conversation : null}));
    subcribeChannels(groups,user?.id)
  },[])

  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>
      {/* của sổ chat */}

      <GroupChat />
      <Box
        sx={{
          height: "100%",
          width: sidebar.open ? "calc(100vw - 780px)" : "calc(100vw - 460px)",
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F0F4FA"
              : theme.palette.background.paper,
        }}
      >
        {chatType === "group" && current_conversation ? (
          <Convensation />
        ) : (
          <Stack
            spacing={2}
            sx={{ height: "100%", width: "100%" }}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <NoChatSvg />
            <Typography variant="subtitle2">
              Select a conversation or start new one
            </Typography>
          </Stack>
        )}
      </Box>
       {sidebar.open && <Contact {...current_conversation}/>}
    </Stack>
  );
};

export default Group;
