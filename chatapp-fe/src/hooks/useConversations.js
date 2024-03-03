import { useDispatch, useSelector } from "react-redux";
import { getConversationsApi, startConversationApi } from "../service/ConversationsService";
import conversation, {
  addConversation,
  fetchConversations,
  setCurrentConversation,
  updateConversation,
  updateConversationThunk,
} from "../Redux/slices/conversation";
import { SelectConversation, selectConversation } from "../Redux/slices/app";
import { useEffect, useRef } from "react";
import { useApp } from "./useApp";

export const useConversations = () => {
  const dispatch = useDispatch();
 
  const {showSnackbar} = useApp()

  /**
   * get conversations of user
   */
  const getConversations = async () => {
    try {
      const response = await getConversationsApi();

      if (response.status === 200) {
        console.log("response conversation", response);
        dispatch(fetchConversations({conversations : response.data}))
       
      }
    } catch (err) {
      
        console.log("err conversation", err);

     
    }
    
  };
      
  

  return {

    getConversations,
 
  };
};
