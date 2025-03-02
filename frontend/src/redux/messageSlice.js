import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: {}, // Stores messages per conversation: { conversationId: [messages] }
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessagesInRedux: (state, action) => {
      const { conversationId, messages } = action.payload;

      // Ensure messages is an array before setting it
      if (Array.isArray(messages)) {
        state.messages[conversationId] = [...messages]; // Store messages properly
      } else {
        console.error(
          "setMessagesInRedux: Expected an array, received:",
          messages
        );
        state.messages[conversationId] = []; // Fallback to empty array
      }
    },
    addMessage: (state, action) => {
      const { conversationId, newMessage } = action.payload;

      // Ensure conversation ID exists before pushing new messages
      if (!state.messages[conversationId]) {
        state.messages[conversationId] = [];
      }
      state.messages[conversationId].push(newMessage);
    },
    clearMessages: (state, action) => {
      const { conversationId } = action.payload;
      if (state.messages[conversationId]) {
        delete state.messages[conversationId]; // Remove messages when switching chats
      }
    },
  },
});

export const { setMessagesInRedux, addMessage, clearMessages } =
  messageSlice.actions;
export default messageSlice.reducer;
