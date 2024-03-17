import { combineReducers } from "redux";

import storage from "redux-persist/lib/storage";

import appReducer from "./slices/app";
import authReducer from "./slices/auth";
import conversationReducer from "./slices/conversation";



// combine nhieu reducer cua cac slice khac nhau
const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  conversation: conversationReducer,

});

export { rootReducer };
