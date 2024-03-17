import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  conversations: [],
  groups: [],
  messages: [],
  chatType: null,
  current_conversation: null,
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

    fetchCurrentMessages(state, action) {
      state.messages = action.payload.messages;
    },
    addMessages(state, action) {
      state.messages.push(action.payload.message);
    },
    selectConversation(state, action) {
      state.chatType = action.payload.chatType;
      state.current_conversation = action.payload.conversation;
    },
    setCurrentConversation(state,action){
      state.current_conversation = action.payload;
    },
    clearConversation(state, action) {
      state.conversations = [];
      state.messages = [];
      state.chatType = null;
      state.current_conversation = null
      state.groups = []
    },
    fetchGroups(state, action) {
      state.groups = action.payload.groups;
    },

    addGroup(state, action) {
        const group = action.payload;

        state.groups.unshift(group);
    },

    updateGroup(state, action) {
      const group = action.payload;

      const newGroups = state.groups.filter(
        (e) => e.id !== group.id
      );

      state.groups = [group, ...newGroups];
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
  updateConversation,
  clearConversation,
  addGroup,
  fetchGroups,
  updateGroup,
  clearGroup,
  selectConversation,
  setCurrentConversation
} = slice.actions;

// export const updateGroupThunk = (message) => {
//   return async (dispatch, getState) => {
//     const { groups} = getState().group;

//     console.log("list group ", groups);
//     const group = groups.find((e) => {
//       return e.id === message.group;
//     });

//     if (group) {
//       const newGroup = {
//         ...group,
//         lastMessage: {
//           ...message,
//           sender: message.sender.id ,
//           seen: false,
//         },
//       };
//       dispatch(updateGroup(newGroup));
//       return;
//     }

//     // console.log(currentGroup);

//     // const newGroup = {
//     //   id: message.group,
//     //   user: currentGroup?.user
//     //     ? currentGroup?.user
//     //     : message.sender,
//     //   lastMessage: {
//     //     ...message,
//     //     seen: false,
//     //   },
//     // };
//     // dispatch(addGroup({ group: newGroup }));
//   };
// };


/**
 * redux thunk update conversation
 * @param {*} conversation
 * @returns
 */
export const updateConversationThunk = (message) => {
  return async (dispatch, getState) => {
    const { conversations,groups,current_conversation,chatType } = getState().conversation;
   
    

    const currentConversations = chatType === 'private' ? conversations : groups;

    console.log("list conversation ", currentConversations);
    const conversation = currentConversations.find((e) =>  e.id === message.conversation);

    if (conversation) {
      const newConversation = {
        ...conversation,
        lastMessage: {
          ...message,
          sender: message.sender.id ,
          seen: false,
        },
      };
      chatType === 'private' ? dispatch(updateConversation(newConversation)) : dispatch(updateGroup(newConversation))
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

    if (message.sender.id === current_conversation?.user?.id || message.conversation === current_conversation?.id) {
      dispatch(addMessages({ message : {...message,sender: message.sender.id} }));

      console.log("hu ha");

      if (!current_conversation?.id) {
        dispatch(
          setCurrentConversation({
            id: message.conversation,
            user: current_conversation.user,
          })
        );
      }
    }
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
