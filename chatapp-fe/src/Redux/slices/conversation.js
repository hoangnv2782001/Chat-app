import { createSlice } from "@reduxjs/toolkit";
import { faker } from "@faker-js/faker";
import { AWS_S3_REGION, S3_BUCKET_NAME } from "../../config";
import { act } from "react-dom/test-utils";
import axios from "../../utils/axios";
import { ShowSnackbar, selectConversation } from "./app";

const user_id = window.localStorage.getItem("user_id");

const initialState = {
  conversations: [],
  current_conversation: null,
  messages: [],
};

const slice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    fetchConversations(state, action) {
      state.conversations = action.payload.conversations;
    },

    updateConversation(state, action) {
      const conversation = action.payload;

      const newConversations = state.conversations.filter(
        (e) => e.id !== conversation.id
      );

      state.conversations = [conversation, ...newConversations];
    },
    addConversation(state, action) {
      const conversation = action.payload.conversation;

      state.conversations.unshift(conversation);

      // state.conversations.push(conversation);

      // console.log("push ", state.conversations);
    },
    setCurrentConversation(state, action) {
      state.current_conversation = action.payload;
    },
    fetchCurrentMessages(state, action) {
      state.messages = action.payload.messages;
    },
    addMessages(state, action) {
      state.messages.push(action.payload.message);
    },
    clearConversation(state, action) {
      state.conversations = [];
      state.messages = [];
      state.current_conversation = null;
    },
  },
});

// Reducer,
export default slice.reducer;

export const {
  addConversation,
  fetchConversations,
  addMessages,
  fetchCurrentMessages,
  setCurrentConversation,

  updateConversation,
  clearConversation
} = slice.actions;

// ----------------------------------------------------------------------

export const FetchConversations = () => {
  return async (dispatch, getState) => {
    await axios
      .get(
        "/conversations",

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().auth.token}`,
          },
        }
      )
      .then(function (response) {
        console.log("conversation : ", response.data);
        dispatch(
          dispatch(
            slice.actions.fetchConversations({
              conversations: response.data,
            })
          )
        );
      })
      .catch(function (error) {
        console.log("error : ", error);
      });
  };
};
/**
 * redux thunk update conversation
 * @param {*} conversation
 * @returns
 */
export const updateConversationThunk = (message) => {
  return async (dispatch, getState) => {
    const { conversations, current_conversation } = getState().conversation;

    console.log("list conversation ", conversations);
    const conversation = conversations.find((e) => {
      console.log("conversation id", e.id === message.conversation, e);
      return e.id === message.conversation;
    });

    if (conversation) {
      const newConversation = {
        ...conversation,
        lastMessage: {
          ...message,
          sender: message.sender.id ,
          seen: false,
        },
      };
      dispatch(updateConversation(newConversation));
      return;
    }

    console.log(current_conversation);

    const newConversation = {
      id: message.conversation,
      user: current_conversation?.user
        ? current_conversation?.user
        : message.sender,
      lastMessage: {
        ...message,
        seen: false,
      },
    };

    console.log("new conversation", newConversation);

    dispatch(addConversation({ conversation: newConversation }));
  };
};

/**
 * add message thunk
 * @param {*} message
 * @returns
 */
export const addMessagesThunk = (message) => {
  return async (dispatch, getState) => {
    console.log("add message", message);

    const { current_conversation } = getState().conversation;

    if (message.sender.id === current_conversation?.user?.id) {
      dispatch(addMessages({ message }));

      console.log("hu ha");

      if (!current_conversation?.id) {
        dispatch(
          setCurrentConversation({
            id: message.conversation,
            user: current_conversation.user,
          })
        );
      }
    } else dispatch(updateConversationThunk(message));
  };
};

/**
 * remove conversation redux thunk
 * @param {*} id
 * @returns
 */
export const removeConversationThunk = (id) => {
  return async (dispatch, getState) => {
    const { conversations } = getState().conversation;
    const newConversations = conversations.filter((e) => {
      return e.id !== id;
    });
    dispatch(selectConversation({ chatType: null }));
    dispatch(fetchConversations({ conversations: newConversations }));
  };
};
