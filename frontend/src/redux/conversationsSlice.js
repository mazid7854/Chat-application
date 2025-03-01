import { createSlice } from "@reduxjs/toolkit";

const conversationSlice = createSlice({
  name: "conversations",
  initialState: { conversations: [] },
  reducers: {
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
    addConversation: (state, action) => {
      state.conversations.push(action.payload);
    },
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
  },
});

export const { setConversations, addConversation, setSelectedConversation } =
  conversationSlice.actions;
export default conversationSlice.reducer;
