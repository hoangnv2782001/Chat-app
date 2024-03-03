import { createSlice } from "@reduxjs/toolkit";

import axios from "../../utils/axios";
import { ShowSnackbar, clearApp } from "./app";
import { clearConversation } from "./conversation";

import { socket } from "../../Stomp";
// Giá tri khởi tạo của loggin state
const initialState = {
  isLoggedIn: true,
  token: "",
  isLoading: false,
  email: "",
  error: false,
};

/**
 * Tao ra môt slice sử dung createSlice
 * Slice giup đơn giản hoá viêc tao các actions, creation action và reducer
 * @Param {Object}:
 *  @property name : tên slice
 *  @property initialState : giá tri khởi tao cuuả state
 *  @property reducers : các function câp nhât state
 */
const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateIsLoading(state, action) {
      state.isLoading = action.payload.isLoading;
    },
    logIn(state, action) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },

    signOut(state, action) {
      state.isLoggedIn = false;
      state.token = "";
    },

    updateRegisterEmail(state, action) {
      state.email = action.payload.email;
    },
  },
});

export const {logIn} = slice.actions
/**
 * reducer đươc tao tự đông bởi slice
 * ngoài ra ta còn có slice.actions : chứa các hàm để khởi tao creation action
 */
export default slice.reducer;

/**
 * Call api login
 * @param {*} values : login inffo
 * @returns
 */
export function Login(values) {
  return async (dispatch, getState) => {
    await axios
      .post(
        "/auth/login",

        { ...values },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then(function (response) {
        localStorage.setItem("token", response.data.token);
        dispatch(
          slice.actions.logIn({
            isLoggedIn: true,
            token: response.data.token,
          })
        );
        if(socket && !socket.connected){
          socket.activate()
        }

        // store userid
        // window.localStorage.setItem("user_id", response.data.id);

        dispatch(
          ShowSnackbar({ severity: "success", message: response.data.message })
        );
      })
      .catch(function (error) {
        console.log("login error : ", error);
        dispatch(ShowSnackbar({ severity: "error", message: error.message }));
      });
  };
}

/**
 * Logout clear token
 * @returns
 */
export function Logout() {
  return async (dispatch, getState) => {
    console.log("sign out!!!!!!!!!!!!!!!!!");
    dispatch(slice.actions.signOut());
    dispatch(clearApp());
    dispatch(clearConversation());
    localStorage.removeItem("token")
    // store userid
    // window.localStorage.removeItem("user_id");
  };
}

/**
 * Xử lí forgot password
 * @param {*} values info forgot pass
 * @returns
 */
export function ForgotPassword(values) {
  return async (dispatch, getState) => {
    await axios
      .post(
        "/auth/password/forgot",
        {},
        {
          params: values,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

/**
 * Xử lí forgot password
 * @param {*} values info forgot pass
 * @returns
 */
export function NewPassword(values) {
  return async (dispatch, getState) => {
    await axios
      .post(
        "/auth/password/reset",

        {
          ...values,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        dispatch(
          slice.actions.logIn({
            isLoggedIn: true,
            token: response.data.token,
          })
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

/**
 * Xử lí register
 * @param {*} values info register pass
 * @returns
 */
export function Register(values) {
  return async (dispatch, getState) => {
    dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }));
    await axios
      .post(
        "/auth/register",

        {
          ...values,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        dispatch(slice.actions.updateRegisterEmail({ email: values.email }));
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: false })
        );
      })
      .catch(function (error) {
        dispatch(
          slice.actions.updateIsLoading({ isLoading: false, error: true })
        );
      })
      .finally(function () {
        if (!getState().auth.error) {
          // window.location.href = "/auth/verify";
        }
      });
  };
}

/**
 * Xử lí register
 * @param {*} values info register pass
 * @returns
 */
export function VerifyEmail(values) {
  return async (dispatch, getState) => {
    await axios
      .post(
        "/auth/register/verification",

        {
          ...values,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        dispatch(
          slice.actions.logIn({
            isLoggedIn: true,
            token: response.data.token,
          })
        );

        // store userid
        // window.localStorage.setItem("user_id", response.data.id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}
