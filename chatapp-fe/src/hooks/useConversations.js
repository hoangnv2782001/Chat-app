import { useDispatch } from "react-redux";
import { getConversationsApi } from "../service/ConversationsService";
import  {

  fetchConversations,
 
} from "../Redux/slices/conversation";

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
