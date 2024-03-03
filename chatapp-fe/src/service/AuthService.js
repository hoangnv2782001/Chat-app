import axios from "../utils/axios";

export const loginApi = async (values) => {
  return await axios.post(
    "/auth/login",

    { ...values },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
};

export const registerApi = async (values) => {
  return await axios.post(
    "/auth/register",

    {
      ...values,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const verifyApi = async (values) => {
  return await axios.post(
    "/auth/register/verification",

    {
      ...values,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const forgotPasswordApi = async (email) => {
  return await axios.post(`/auth/password/forgot?email=${email}`);
};

export const resetPasswordApi = async (values) => {
  return await axios.post(
    "/auth/password/reset",

    {
      ...values,
    }
  );
};
