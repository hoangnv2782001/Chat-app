import {
  Stack,
  Box,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";

import { useTheme, styled } from "@mui/material/styles";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import {
  Image,
  LinkSimple,
  PaperPlaneTilt,
  Smiley,

} from "phosphor-react";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useConversation } from "../../hooks/useConversation";
/**
 * Footer cua phần chat bao gồm :
 *   Input
 *   File button
 *   emojin button
 *   Send button
 * State :
 *    openPicker : xacs đinh trang thái đóng mở picker
 * @returns {Component}
 */
const Footer = () => {
  const theme = useTheme();



  // const { current_conversation } = useSelector((state) => state.conversation);
  const {chatType,current_conversation} = useSelector(state=>state.conversation)


  const { sendMessage ,sendFile} = useConversation();

 
  const { sidebar, user } = useSelector((state) => state.app);

  const [openPicker, setOpenPicker] = React.useState(false);

  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  function handleEmojiClick(emoji) {
    const input = inputRef.current;

    if (input) {
      const selectionStart = input.selectionStart;
      const selectionEnd = input.selectionEnd;

      setValue(
        value.substring(0, selectionStart) +
          emoji +
          value.substring(selectionEnd)
      );

      // Move the cursor to the end of the inserted emoji
      input.selectionStart = input.selectionEnd = selectionStart + 1;
    }
  }

  const isValidMessage = () => {
    return !!value;
  };

  const handleSendMessage = () => {
    console.log(value);
    const message = {
      content: linkify(value),
      conversation: current_conversation.id,
      sender: user,
      receiver:chatType ==='private' ? current_conversation.user.id : current_conversation?.id,
      time: new Date().toISOString(),
      type: containsUrl(value) ? "LINK" : "TEXT",
    };

    sendMessage(message,chatType,current_conversation);

    setValue("");
  };



  const handleOnChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {

      const type = checkFileType(event.target.files[0])

      console.log("send message type",type)

      const message = {
        content: '',
        conversation: current_conversation.id,
        sender: user,
        receiver: chatType ==='private' ? current_conversation.user.id : current_conversation?.id,
        time: new Date().toISOString(),
        type: type,
      };

      sendFile(event.target.files[0],message,chatType)
    }
  };


  const checkFileType = (file)=>{


    return file && file['type'].split('/')[0] === 'image' ? "IMAGE" :"FILE";

  }

  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: "transparent !important",
      }}
    >
      <Box
        p={1}
        width={"100%"}
        sx={{
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F8FAFF"
              : theme.palette.background,
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Stack direction="row" alignItems={"center"} spacing={2}>
          <Stack sx={{ width: "100%" }}>
            <Box
              style={{
                zIndex: 10,
                position: "fixed",
                display: openPicker ? "inline" : "none",
                bottom: 81,
                right: sidebar.open ? 420 : 100,
              }}
            >
              <Picker
                theme={theme.palette.mode}
                data={data}
                onEmojiSelect={(emoji) => {
                  handleEmojiClick(emoji.native);
                }}
              />
            </Box>
            {/* Chat Input */}
            <ChatInput
              inputRef={inputRef}
              value={value}
              setValue={setValue}
              openPicker={openPicker}
              setOpenPicker={setOpenPicker}
              handleOnChange = {handleOnChange}
            />
          </Stack>
          <Box
            sx={{
              height: 48,
              width: 48,
              backgroundColor: theme.palette.primary.main,
              borderRadius: 1.5,
            }}
          >
            <Stack
              sx={{ height: "100%" }}
              alignItems={"center"}
              justifyContent="center"
            >
              <IconButton onClick={isValidMessage() ? handleSendMessage : ""}>
                <PaperPlaneTilt color="#ffffff" />
              </IconButton>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
/**
 * Custom textfield
 */

const StyleInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    paddingTop: "12px",
    paddingBottom: "12px",
  },
}));

/**
 * Tao speed dial
 * Hiển thi ô chat cùng với option:
 *    Link : chứa các action
 *    Emojin : chứa các emojin
 * State :
 *    action : trang thai hiển thi các action
 * @param{callback} setOpenPicker : callback dung để set lai state cho openPicker
 * @returns {Component }
 */
const ChatInput = ({
  openPicker,
  setOpenPicker,
  setValue,
  value,
  inputRef,
  handleOnChange
}) => {
  const [openActions, setOpenActions] = React.useState(false);
  const fabRef = React.useRef(null);

  const pickerRef = useRef(null);

  const imageRef = useRef(null);

  const fileRef = useRef(null);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     console.log("event cclick",event,openActions,openPicker)

  //     if (!fabRef.current.contains(event.target)) {
  //       setOpenActions(false);
  //     }
  //     if (openPicker) {
  //       setOpenPicker(false);
  //     }
  //   };

  //   // Thêm event listener cho sự kiện click trên toàn trang web
  //   document.addEventListener("click", handleClickOutside);

  //   return () => {
  //     // Xóa event listener khi component bị unmount
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, []);

 


  const onChooseImage = () => {
    imageRef.current.click();
  };

  const onChooseFile = () => {
    fileRef.current.click();
  };

  return (
    <Stack direction={"row"} alignItems={"center"} spacing={2}>
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        onClick = {onChooseImage}
        sx={{
          p: 1,
          borderRadius: "3px",
          ":hover": {
            backgroundColor: "#d6dbe1",
          },
        }}

        
      >
        <input
          type="file"
          ref={imageRef}
          accept="image/*"
          onChange={handleOnChange}
          style={{ display: "none" }}
        />
        <Image size={24} />
      </Stack>

      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        onClick={onChooseFile}
        sx={{
          p: 1,
          borderRadius: "3px",
          ":hover": {
            backgroundColor: "#d6dbe1",
          },
        }}
      >
       <input
          type="file"
          ref={fileRef}
          onChange={handleOnChange}
          
          style={{ display: "none" }}
        />
        {" "}
        <LinkSimple size={24} />
      </Stack>
      <StyleInput
        inputRef={inputRef}
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        fullWidth
        placeholder="Write a message..."
        variant="filled"
        InputProps={{
          disableUnderline: true,
          // startAdornment: (
          //   <Stack sx={{ width: "max-content" }}>
          //     <Stack
          //       sx={{
          //         position: "relative",
          //         display: openActions ? "inline-block" : "none",
          //       }}
          //       ref={fabRef}
          //     >
          //       {Actions.map((el) => (
          //         <Tooltip placement="right" title={el.title}>
          //           <Fab
          //             onClick={() => {
          //               setOpenActions(!openActions);
          //               console.log("ac tion", openActions, openPicker);
          //             }}
          //             sx={{
          //               position: "absolute",
          //               top: -el.y,
          //               backgroundColor: el.color,
          //             }}
          //             aria-label="add"
          //           >
          //             {el.icon}
          //           </Fab>
          //         </Tooltip>
          //       ))}
          //     </Stack>

          //     <InputAdornment>
          //       <IconButton
          //         onClick={() => {
          //           setOpenActions(!openActions);
          //         }}
          //       >
          //         <LinkSimple />
          //       </IconButton>
          //     </InputAdornment>
          //   </Stack>
          // ),
          endAdornment: (
            <Stack sx={{ position: "relative" }}>
              <InputAdornment>
                <IconButton
                  onClick={() => {
                    setOpenPicker(!openPicker);
                  }}
                >
                  <Smiley />
                </IconButton>
              </InputAdornment>
            </Stack>
          ),
        }}
      />
    </Stack>
  );
};

function linkify(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(
    urlRegex,
    (url) => `<a href="${url}" target="_blank">${url}</a>`
  );
}

function containsUrl(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return urlRegex.test(text);
}



export default Footer;
