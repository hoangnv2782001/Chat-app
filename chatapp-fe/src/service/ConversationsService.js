import axios from "../utils/axios";

export const startConversationApi = async (id) => {
  return await axios.get(`/conversations/${id}`);
};

export const createConversationApi = async (id) => {
  return await axios.post(`/conversations/${id}`);
};

export const deleteConversationApi = async (id) => {
  return await axios.delete(`/conversations/${id}`);
};

export const getConversationsApi = async () => {
  return await axios.get(`/conversations`);
};

export const getMessagesConversation = async (type,id) => {
  return await axios.get(`/messages/${type}/${id}`);
};
