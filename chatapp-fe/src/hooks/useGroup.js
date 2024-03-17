import React from "react";
import { createGroupApi, getGroupsApi } from "../service/GroupService";

import { useApp } from "./useApp";
import { useDispatch } from "react-redux";

import { socket } from "../Stomp";
import {
  addGroup,
  addMessages,
  addMessagesThunk,
  fetchGroups,
  updateConversationThunk,
} from "../Redux/slices/conversation";
const useGroup = () => {
  const { showSnackbar } = useApp();

  const dispatch = useDispatch();
  /**
   * create group
   * @param {*} data
   */
  const createGroup = async (group) => {
    try {
      const response = await createGroupApi(group);

      if (response.status === 200) {
        console.log("create group ", group);
        dispatch(addGroup({ ...group, id: response.data }));
        showSnackbar({
          severity: "success",
          message: "Create group successfully",
        });
      }
    } catch (err) {
      console.log("create group error");
      showSnackbar({
        severity: "error",
        message: "Create group unsuccessfully",
      });
      // throw Err
    }
  };

  /**
   *
   */
  const getGroups = async () => {
    try {
      const response = await getGroupsApi();
      if (response.status === 200) {
        dispatch(fetchGroups({ groups: response.data }));
      }
    } catch (err) {
      showSnackbar({
        severity: "error",
        message: "Something went wrong!!",
      });
    }
  };

  /**
   * subcrobe channle group
   * @param {*} channels 
   * @param {*} user 
   */
  const subcribeChannels = (channels, user) => {
    channels.forEach((element) => {
      socket.subscribe(element.channel, (message) => {
        const data = JSON.parse(message.body);
        console.log("receiver group message",data,data.sender.id === user)
        
        if(data.sender.id !== user){
          dispatch(addMessagesThunk(data));
          dispatch(updateConversationThunk(data));
        }
      });
    });
  };

  return { createGroup, getGroups, subcribeChannels };
};

export default useGroup;
