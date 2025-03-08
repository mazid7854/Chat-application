import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import conversationReducer from "./conversationsSlice.js";
import selectedConversationReducer from "./selectedConversationSlice.js"; // ✅ Import
import socketReducer from "./socketSlice.js";
import messageReducer from "./messageSlice";
import newMessageNotificationReducer from "./newMessageNotificationSlice.js";
import typingReducer from "./typingSlice";
import userProfileReducer from "./userProfileSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    conversations: conversationReducer,
    selectedConversation: selectedConversationReducer,
    socket: socketReducer,
    messages: messageReducer,
    newMessageNotification: newMessageNotificationReducer,
    typing: typingReducer,
    userProfile: userProfileReducer,
  },
});

export default store;
