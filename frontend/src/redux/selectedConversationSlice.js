import { createSlice } from "@reduxjs/toolkit";

const selectedConversationSlice = createSlice({
  name: "selectedConversation",
  initialState: { selectedConversation: null }, // ✅ Ensure initial state is set
  reducers: {
    setSelectedConversation: (state, action) => {
      state.selectedConversation = action.payload; // ✅ Updating state correctly
    },
  },
});

export const { setSelectedConversation } = selectedConversationSlice.actions;
export default selectedConversationSlice.reducer; // ✅ Must be exported as default
