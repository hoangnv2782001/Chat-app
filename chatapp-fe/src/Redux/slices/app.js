import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { Logout } from "./auth";

// Giá tri khởi tạo của sidebar state
const initialState = {
  user: null,
  sidebar: {
    open: false,
    type: "CONTACT",
  },
  snackbar: {
    open: null,
    message: null,
    severity: null,
  },

  users: [],
  friends: [],
  friendRequests: [],

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
  name: "app",
  initialState,
  reducers: {
    fetchCallLogs(state, action) {
      state.call_logs = action.payload.call_logs;
    },
    fetchUser(state, action) {
      state.user = action.payload;
    },
    updateUser(state, action) {
      state.user = action.payload.user;
    },
    // Toggle sidebar
    togglesidebar(state) {
      state.sidebar.open = !state.sidebar.open;
    },
    updateSidebarType(state, action) {
      state.sidebar.type = action.payload.type;
    },
    updateTab(state, action) {
      state.tab = action.payload.tab;
    },

    openSnackBar(state, action) {
      console.log(action.payload);
      state.snackbar.open = true;
      state.snackbar.severity = action.payload.severity;
      state.snackbar.message = action.payload.message;
    },
    closeSnackBar(state) {
      console.log("This is getting executed");
      state.snackbar.open = false;
      state.snackbar.message = null;
    },
    fetchUsers(state, action) {
      state.users = action.payload.users;
    },

    fetchFriends(state, action) {
      state.friends = action.payload;
    },
    fetchRequestFriends(state, action) {
      state.friendRequests = action.payload;
    },
    clearApp(state, action) {
      state.user = null;
      state.users = [];
      state.friendRequests = [];
 
      state.friends = [];
    
    },

 
  },
});

/**
 * reducer đươc tao tự đông bởi slice
 * ngoài ra ta còn có slice.actions : chứa các hàm để khởi tao action
 */
export default slice.reducer;

export const {
  fetchUsers,
  fetchFriends,
  fetchRequestFriends,
  openSnackBar,
  closeSnackBar,
  fetchUser,

  clearApp,

} = slice.actions;

/**
 * mo side bar
 * @returns
 */
export function ToggleSidebar() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.togglesidebar());
  };
}

/**
 * update loai side bar hien thi
 * @param {*} type
 * @returns
 */
export function UpdateSidebarType(type) {
  return async (dispatch, getState) => {
    dispatch(
      slice.actions.updateSidebarType({
        type,
      })
    );
  };
}

/**
 * hiem thi message thong bao
 * @param {*} values info register pass
 * @returns
 */
export function ShowSnackbar({ severity, message }) {
  return async (dispatch, getState) => {
    dispatch(
      slice.actions.openSnackBar({
        message,
        severity,
      })
    );
    setTimeout(() => {
      dispatch(slice.actions.closeSnackBar());
    }, 4000);
  };
}

/**
 * đóng thông bád
 * @param {*} values info register pass
 * @returns
 */
export function CloseSnackbar() {
  return async (dispatch, getState) => {
    dispatch(slice.actions.closeSnackBar());
  };
}


/**
 * fetch data
 * @param {*}
 * @returns
 */
export function FetchUsers() {
  return async (dispatch, getState) => {
    await axios
      .get(
        "/users",

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      )
      .then(function (response) {
        console.log("usserr : ", response);
        dispatch(
          slice.actions.fetchUsers({
            users: response.data,
          })
        );
      })
      .catch(function (error) {});
  };
}

/**
 * fetch data
 * @param {*}
 * @returns
 */
export function FetchFriends() {
  return async (dispatch, getState) => {
    await axios
      .get(
        "/users",

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      )
      .then(function (response) {
        dispatch(
          slice.actions.updateFriends({
            friends: response.data,
          })
        );
      })
      .catch(function (error) {});
  };
}

// /**
//  * fetch data
//  * @param {*}
//  * @returns
//  */
// export function FetchRequestFriends() {
//   return async (dispatch, getState) => {
//     await axios
//       .get(
//         "/requestFriends",

//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${getState().auth.token}`,
//           },
//         }
//       )
//       .then(function (response) {
//         dispatch(
//           slice.actions.updateRequestFriends({
//             requestFriends: response.data.requestFriends,
//           })
//         );
//       })
//       .catch(function (error) {});
//   };
// }

export const FetchUserProfile = () => {
  return async (dispatch, getState) => {
    axios
      .get("/users/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().auth.token}`,
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        dispatch(slice.actions.fetchUser(response.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(Logout());
      });
  };
};

export const updateRequestThunk = (id) => {
  return async (dispatch, getState) => {
    const { friendRequests } = getState().app;
    dispatch(fetchRequestFriends(friendRequests.filter((e) => e.id !== id)));
  };
};


export const sendRequestThunk = (id) => {
  
  return async (dispatch, getState) => {
    const { users } = getState().app;
    const newUsers = users.filter((e) => e.id !== id)
    console.log("send request id ",id,users,newUsers)
    dispatch(fetchUsers({users :newUsers}));
  };
};
