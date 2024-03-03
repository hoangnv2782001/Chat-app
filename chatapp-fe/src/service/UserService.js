import axios from "../utils/axios";

export const updateUser = async (field,value) => {
  return await axios.put(`/users/${field}?${field}=${value}`);
};