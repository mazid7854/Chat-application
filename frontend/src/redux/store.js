import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import conversationReducer from "./conversationsSlice.js";
import selectedConversationReducer from "./selectedConversationSlice.js"; // ✅ Import

const store = configureStore({
  reducer: {
    user: userReducer,
    conversations: conversationReducer,
    selectedConversation: selectedConversationReducer, // ✅ Must be included here
  },
});

export default store;
