import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import conversationReducer from "./conversationsSlice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    conversations: conversationReducer,
  },
});

export default store;
