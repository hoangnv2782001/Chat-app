import axios from "../utils/axios";

export const createGroupApi = async (group) => {
  return await axios.post(`/group`,group);
};

export const getGroupsApi = async () => {
  return await axios.get(`/group`);
};

export const getGroupApi = async (id) => {
  return await axios.get(`/group/${id}`);
};

export const addMembersApi = async (groupId,members) => {
  return await axios.post(`/group/${groupId}/members`,members);
};

export const removeMemberApi = async (id,groupId) => {
  return await axios.put(`/group/${groupId}/members/${id}`);
};

export const leaveGroupApi = async (id,groupId) => {
  return await axios.delete(`group/${groupId}/members/${id}`);
};