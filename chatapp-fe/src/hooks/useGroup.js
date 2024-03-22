import {
  addMembersApi,
  createGroupApi,
  getGroupsApi,
  removeMemberApi,
} from "../service/GroupService";

import { useApp } from "./useApp";
import { useDispatch } from "react-redux";

import { socket } from "../Stomp";
import {
  addGroup,
  addMessagesThunk,
  appendMembers,
  deleteMember,
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
        console.log("receiver group message", data, data.sender.id === user);

        if (data.sender.id !== user) {
          dispatch(addMessagesThunk(data));
          dispatch(updateConversationThunk(data));
        }
      });
    });
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
        dispatch(appendMembers({ members }));
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
  const removeMember = async (id) => {
    try {
      const response = await removeMemberApi(id);

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



  return { createGroup, getGroups, subcribeChannels, addMembers, removeMember };
};

export default useGroup;
