import { useDispatch, useSelector } from "react-redux";
import {
  acceptRequestApi,
  getFriendRequestApi,
  getFriendsApi,
  rejectRequestApi,
  sendRequestApi,
} from "../service/FriendService";
import {
  fetchFriends,
  fetchRequestFriends,
  fetchUsers,
  sendRequestThunk,
  updateRequestThunk,
} from "../Redux/slices/app";
import { useApp } from "../hooks/useApp";
import { useState } from "react";
export const useFriend = () => {
  const dispatch = useDispatch();

  const { showSnackbar } = useApp();

  const [friendRequestLoading, setFriendRequestLoading] = useState(true);
  const [friendLoading, setFriendLoading] = useState(true);

  const getFriends = async () => {
    try {
      const response = await getFriendsApi();

      if (response.status === 200) {
        dispatch(fetchFriends(response.data));
        setFriendLoading(false);
      }
    } catch (err) {
      dispatch(fetchFriends([]));
      console.log("error friends ", err);
      setFriendLoading(false);
    }
  };

  const getFriendRequests = async () => {
    try {
      const response = await getFriendRequestApi();

      if (response.status === 200) {
        dispatch(fetchRequestFriends(response.data));
        setFriendRequestLoading(false);
      }
    } catch (err) {
      dispatch(fetchRequestFriends([]));
      console.log("error friends ", err);
      setFriendRequestLoading(false);
    }
  };

  const acceptRequest = async (id) => {
    try {
      const response = await acceptRequestApi(id);

      if (response.status === 200) {
        dispatch(updateRequestThunk(id));
        showSnackbar({
          severity: "success",
          message: "Accept friend request success",
        });
      }
    } catch (err) {
      // dispatch(fetchRequestFriends([]));
      console.log("error friends ", err);
      showSnackbar({ severity: "error", message: "Something went wrong" });
    }
  };

  const sendRequest = async (id) => {
    try {
      const response = await sendRequestApi(id);
      console.log("send request successfuly!!!!", response);

      if (response.status === 200) {
        console.log("send request successfuly!!!!", response.data);
        dispatch(sendRequestThunk(id));
        showSnackbar({
          severity: "success",
          message: "Send request success",
        });
      }
    } catch (err) {
      console.log(err);
      showSnackbar({ severity: "error", message: "Something went wrong" });
    }
  };

  const rejectRequest = async (id) => {
    try {
      const response = await rejectRequestApi(id);
      console.log("reject request successfuly!!!!", response);

      if (response.status === 200) {
        console.log("reject request successfuly!!!!", response.data);
        dispatch(updateRequestThunk(id));
        showSnackbar({
          severity: "success",
          message: "Reject request success",
        });
      }
    } catch (err) {
      console.log(err);
      showSnackbar({ severity: "error", message: "Something went wrong" });
    }
  };
  return {
    getFriends,
    getFriendRequests,
    acceptRequest,
    sendRequest,
    rejectRequest,
    friendLoading,
    friendRequestLoading,
  };
};
