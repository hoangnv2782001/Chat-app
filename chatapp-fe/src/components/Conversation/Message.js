import { Box, Stack } from "@mui/material";


import {
  DocxMessage,
  LinkMessage,
  MediaMessage,
  ReplyMessage,
  TextMessage,

} from "./MessageTypes";
import {  useSelector } from "react-redux";
/**
 * Hiển thi khung chat
 * @param {Boolean} menu
 * @returns {Component}
 */
const Message = ({ menu }) => {


  const { messages } = useSelector(
    (state) => state.conversation
  );
  const {id} = useSelector(
    (state) => state.app?.user
     );
  return (
    <Box p={3} sx={{backgroundColor:"#fff"}}>
      <Stack spacing={0.5} >
        {/* xử lí message theo type */}
        {messages &&
          messages.map((message) => {
            switch (message?.type) {
              case "FILE":
                return <DocxMessage message={message} menu={menu} id ={id} />;
              case "LINK":
                return <LinkMessage message={message} menu={menu} id ={id} />;
              case "IMAGE":
                return <MediaMessage message={message} menu={menu} id ={id} />;
              case "reply":
                return <ReplyMessage message={message} menu={menu} id ={id} />;
              case "TEXT":
                //Default tin nhan là text
                return <TextMessage message={message} menu={menu} id ={id} />;
              default:
                return null;
            }
          })}
      </Stack>
    </Box>
  );
};

export default Message;
