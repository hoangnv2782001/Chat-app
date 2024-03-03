import axios from "../utils/axios";

export const sendRequestFriend = async (id) => {
  return await axios.get(`/friends/${id}`);
};

export const getFriendsApi = async () => {
    return await axios.get(`/friends`);
};

export const getFriendRequestApi = async () => {
  return await axios.get(`/friends/request`);
};

export const acceptRequestApi = async (id) => {
  return await axios.put(`/friends/${id}`);
};


export const sendRequestApi = async (id) => {
  return await axios.post(`/friends/${id}`);
};


export const rejectRequestApi = async (id) => {
  return await axios.delete(`/friends/${id}`);
};


