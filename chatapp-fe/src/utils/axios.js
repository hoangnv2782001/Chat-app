import axios from "axios";

import { BASE_URL } from "../config";
import { getValueFromLocalStorage } from "./helper";

// init instance to call api with base url
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Context-Type": "application/json",
  },
});

// handle response
axiosInstance.interceptors.response.use(
  (response) => response,
  //   when occur errr , return promise reject data if resonse !=null or "Something went wrong"
  (error) =>
    Promise.reject(
      (error) || "Something went wrong"
    )
);

axiosInstance.interceptors.request.use(
  function (request) {
    console.log("request send", request.url);
    const access_token = getValueFromLocalStorage("token");
    // const access_token = "qwrtuop";
    
      if (request.headers && access_token) {
        request.headers["Authorization"] = `Bearer ${access_token}`;
        console.log("info ",request.headers,request.baseURL)
        // const newHeaders = {
        //   ...request.headers,
        //   Authorization: ,
        // };
        // // Đính header mới vào lại request trước khi được gửi đi
        // // request = {
        // //   ...request,
        // //   headers: newHeaders,
        // // };
      }
  
    return request;
  },
  function (error) {
    // Thực hiện kịch bản gì đó khi yêu cầu bị lỗi

    console.log("request send error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
