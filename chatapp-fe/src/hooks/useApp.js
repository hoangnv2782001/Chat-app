import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadAvatarApi } from "../service/FileService";
import { closeSnackBar, fetchUser, openSnackBar } from "../Redux/slices/app";
import { updateUser } from "../service/UserService";

export const useApp = () => {
  const dispatch = useDispatch();
  
  const {user} = useSelector(state=>state.app)
  /**
   * update avatar
   * @param {*} avatar 
   * @param {*} setLoadingAvatar 
   */
  const updateAvatar = async (avatar,setLoadingAvatar) => {
    try {
        const reponse = await updateUser("avatar",avatar);

        if(reponse.status === 200){
           dispatch(fetchUser({...user,img:avatar}));
           showSnackbar({severity:"success",message:"Change avatr successfully!"})
           setLoadingAvatar(false)
        }
    } catch (err) {
        showSnackbar({ severity: "error", message: "Something went wrong!" })
        setLoadingAvatar(false)
    }
  };

  /**
   * show snack bar
   * @param {*} param0 
   */

  const showSnackbar = async ({ severity, message }) => {
    dispatch(openSnackBar({ severity, message }));
    setTimeout(() => {
      dispatch(closeSnackBar());
    }, 4000);
  };

  return {
    showSnackbar,
    updateAvatar
  };
};
