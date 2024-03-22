import axios from "../utils/axios";

export const createGroupApi = async (group) => {
  return await axios.post(`/group`,group);
};


export const getGroupsApi = async () => {
  return await axios.get(`/group`);
};

export const addMembersApi = async (groupId,members) => {
  return await axios.post(`/group/${groupId}/members`,members);
};

export const removeMemberApi = async (id) => {
  return await axios.delete(`/group/members/${id}`);
};