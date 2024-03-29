import { useDispatch } from "react-redux";
import { socket } from "../Stomp";
import {
  addMessages,

  fetchCurrentMessages,
  removeConversationThunk,
  selectConversation,
  setCurrentConversation,
  updateConversationThunk,
} from "../Redux/slices/conversation";
import { useState } from "react";
import {
  createConversationApi,
  deleteConversationApi,
  getMessagesConversation,
  startConversationApi,
} from "../service/ConversationsService";


import { uploadFileApi } from "../service/FileService";
import { ShowSnackbar } from "../Redux/slices/app";

export const useConversation = () => {


  const dispatch = useDispatch();

  const getMessages = async (type,id) => {
    try {
      const response = await getMessagesConversation(type,id);

      if (response.status === 200) {
        dispatch(fetchCurrentMessages({ messages: response.data }));
      }
    } catch (err) {
      console.log("get message error ", err);
      dispatch(fetchCurrentMessages({ messages: [] }));
    }
  };

  /**
   * send message
   * @param {*} message
   */
  const sendMessage = async (message,chatType,currentConversation) => {
    console.log("message id conversation ", !message.conversation);
    if (!message.conversation) {
      const id = await createConversation(currentConversation);

      message.conversation = id;
    }
    console.log("message send", message);

    socket.publish({
      destination: `/app/message.${chatType}`,
      body: JSON.stringify(message),
    }); 

    dispatch(addMessages({ message }));
    dispatch(updateConversationThunk(message));
  };

  /**
   * create conversation
   * @returns
   */

  const createConversation = async (currentConversation) => {
    try {
      const response = await createConversationApi(
        currentConversation?.user?.id
      );

      if (response.status === 200) {
        dispatch(
          setCurrentConversation({
            id: response.data,
            user: currentConversation?.user,
          })
        );

        return response.data;
      }
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * start conversation get id if not exits
   * @param {*} user
   */
  const startConversation = async (user) => {
    try {
      const response = await startConversationApi(user?.id);
      console.log("start conversation custom")
      if (response.status === 200) {
        console.log("response start conversation", response);
        dispatch(
          selectConversation({
            chatType: "private",
            conversation: { id: response.data, user },
          })
        );

        getMessages(response.data);
      }
    } catch (err) {
      console.log("err conversation", user,err);
      if (err.status === 404) {
        dispatch(
          selectConversation({
            chatType: "private",
            conversation: { id: null, user },
          })
        );
        dispatch(fetchCurrentMessages({ messages: [] }));
        // getMessages
      }
    }
  };

  /**
   * send file
   * @param {*} file
   * @param {*} message
   */
  const sendFile = async (file, message,chatType) => {
    try {
      const response = await uploadFileApi(file);

      if (response.status === 200) {
        console.log("image send", response);
        const file = response.data;

        message.content = file;

        sendMessage(message,chatType);
      }
    } catch (err) {
      // if (err.status === 404) {
      //   console.log("err conversation", err);

      //   dispatch(setCurrentConversation({ id: null, user }));
      //   dispatch(SelectConversation({ chatType: "private" }));
      //   // getMessages
      // }
      dispatch(
        ShowSnackbar({ severity: "error", message: "Something went wrong!" })
      );

      console.log("error send image", err);
    }
  };

  const deleteConversation = async (id) => {
    try {
      const response = await deleteConversationApi(id);
      if (response.status === 200) {
        // dispatch(setCurrentConversation(null));

        dispatch(removeConversationThunk(id));
        dispatch(
          ShowSnackbar({
            severity: "success",
            message: "Delete conversation successfully!",
          })
        );
      }
    } catch (err) {
      dispatch(
        ShowSnackbar({ severity: "error", message: "Something went wrong!" })
      );
    }
  };

  return {
    startConversation,
    sendMessage,
    getMessages,
    sendFile,
    deleteConversation,
  };
};
