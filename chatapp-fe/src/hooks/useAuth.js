import { useNavigate } from "react-router-dom";
import {
  forgotPasswordApi,
  loginApi,
  registerApi,
  resetPasswordApi,
  verifyApi,
} from "../service/AuthService";
import { useApp } from "./useApp";
import { useDispatch } from "react-redux";
import { logIn } from "../Redux/slices/auth";
import { socket } from "../Stomp";

export const useAuth = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { showSnackbar } = useApp();
  /**
   * login
   * @param {*} data
   */
  const login = async (data) => {
    try {
      const response = await loginApi(data);
      if (response.status === 200) {
        showSnackbar({ severity: "success", message: "Login is success" });

        localStorage.setItem("token", response.data.token);
        dispatch(
          logIn({
            isLoggedIn: true,
            token: response.data.token,
          })
        );
        if (socket && !socket.connected) {
          socket.activate();
        }
        navigate("/app");
      }
    } catch (err) {
      console.log("login error", err);
      dispatch(
        showSnackbar({
          severity: "error",
          message: "Email or Password is incorrect",
        })
      );
    }
  };
  /**
   * register new accout
   * @param {*} data
   */

  const register = async (data) => {
    try {
      const response = await registerApi(data);

      if (response.status === 201) {
        navigate(`/auth/verify?email=${data.email}`);
      }
    } catch (err) {
      dispatch(
        showSnackbar({
          severity: "error",
          message: err?.data.message,
        })
      );
    }
  };
  /**
   * verify account
   * @param {*} data
   */
  const verifyAccount = async (data) => {
    try {
      const response = await verifyApi(data);

      if (response.status === 200) {
        dispatch(
          logIn({
            isLoggedIn: true,
            token: response.data.token,
          })
        );

        showSnackbar({ severity: "success", message: "Verify success" });

        // store userid
        localStorage.setItem("token", response.data.token);

        navigate("/app");
      }
    } catch (err) {
      console.log("verify error");
      showSnackbar({ severity: "error", message: "Otp is invalid" });
    }
  };

  const forgotPassword = async (data) => {
    try {
      const response = await forgotPasswordApi(data);

      if (response.status === 200) {
        showSnackbar({ severity: "success", message: response.data.message });
      }
    } catch (err) {
      showSnackbar({ severity: "error", message: err.data?.message });
    }
  };

  
  const resetPassword = async (data) => {
    try {
      const response = await resetPasswordApi(data);

      if (response.status === 200) {
        showSnackbar({ severity: "success", message: response.data.message });
        navigate("/auth/login")
      }
    } catch (err) {
      showSnackbar({ severity: "error", message: err.data?.message });
    }
  };

  return { login, register, verifyAccount,forgotPassword,resetPassword };
};
