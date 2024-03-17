import axios from "../utils/axios";

export const createGroupApi = async (data) => {
  return await axios.post(`/group`,data);
};


export const getGroupsApi = async () => {
  return await axios.get(`/group`);
};