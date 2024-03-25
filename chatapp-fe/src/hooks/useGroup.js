import {
  addMembersApi,
  createGroupApi,
  getGroupApi,
  getGroupsApi,
  leaveGroupApi,
  removeMemberApi,
} from "../service/GroupService";

import { useApp } from "./useApp";
import { useDispatch } from "react-redux";

import { socket } from "../Stomp";
import {
  addGroup,
  addMessagesThunk,
  appendMembers,
  fetchGroups,
  selectConversation,
  setCurrentConversation,
  updateConversationThunk,
  updateGroupThunk,
} from "../Redux/slices/conversation";
import { useState } from "react";
import { togglesidebar } from "../Redux/slices/app";
const useGroup = () => {
  const { showSnackbar } = useApp();

  const dispatch = useDispatch();

  const [channelSubscribe, setChannelSubscribe] = useState([]);
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
   * get groups of user
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
   * get group current
   * @param {*} id
   */
  const getGroup = async (id) => {
    try {
      const response = await getGroupApi(id);

      console.log("get group ", response);
      if (response.status === 200) {
        dispatch(setCurrentConversation(response.data));
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
  const subcribeChannels = (groups, user) => {
    channelSubscribe.forEach((e) => {
      e.unsubscribe();
    });
    const channels = [];

    console.log("log onconnect");
    groups.forEach((element) => {
      const channel = socket.subscribe(element.channel, (message) => {
        const data = JSON.parse(message.body);

        if (data.type === "NOTIFICATION") {
          dispatch(updateGroupThunk(data.conversation, getGroup));
        }

        if (data.sender.id !== user || data.type === "NOTIFICATION") {
          dispatch(addMessagesThunk(data));
          dispatch(updateConversationThunk(data));
        }
      });
      channels.push(channel);
    });

    setChannelSubscribe(channels);
  };

  /**
   * addmeber
   * @param {*} groupId
   * @param {*} members
   */
  const addMembers = async (groupId, members) => {
    try {
      const response = await addMembersApi(groupId, members);

      if (response.status === 200) {
        console.log("add member response ", response);

        const newMembers = [];

        const data = response.data;
        members.forEach((e, i) => {
          const obj = { ...e, memberId: data[i] };
          newMembers.push(obj);
        });
        dispatch(appendMembers({ members: newMembers }));
        showSnackbar({
          severity: "success",
          message: "Add members successfully",
        });
      }
    } catch (err) {
      console.log("add members error ", err);
      showSnackbar({
        severity: "error",
        message: "Add members fail",
      });
    }
  };

  /**
   * remove member
   * @param {*} id
   */
  const removeMember = async (id, groupId) => {
    try {
      const response = await removeMemberApi(id, groupId);

      if (response.status === 200) {
        // dispatch(deleteMember(id));
        showSnackbar({
          severity: "success",
          message: "Remove members successfully",
        });
      }
    } catch (err) {
      console.log("remove members error ", err);
      showSnackbar({
        severity: "error",
        message: "Remove members fail",
      });
    }
  };

  /**
   * leave group
   * @param {*} id
   * @param {*} groupid
   */
  const leaveGroup = async (id, groupId) => {
    try {
      const response = await leaveGroupApi(id, groupId);

      if (response.status === 200) {
        // dispatch(deleteMember(id));
        showSnackbar({
          severity: "success",
          message: "Leave group successfully",
        });

        dispatch(selectConversation({ chatType: null, conversation: null }));
        dispatch(togglesidebar());
        getGroups();
      }
    } catch (err) {
      console.log("leave group error ", err);
      showSnackbar({
        severity: "error",
        message: "Laeve group fail",
      });
    }
  };

  return {
    createGroup,
    getGroups,
    subcribeChannels,
    addMembers,
    removeMember,
    leaveGroup,
  };
};

export default useGroup;
