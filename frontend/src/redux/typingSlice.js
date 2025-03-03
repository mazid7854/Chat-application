import { createSlice } from "@reduxjs/toolkit";

const typingSlice = createSlice({
  name: "typing",
  initialState: {
    typingUsers: {},
  },
  reducers: {
    setUserTyping: (state, action) => {
      state.typingUsers[action.payload] = true;
    },
    setUserStoppedTyping: (state, action) => {
      delete state.typingUsers[action.payload];
    },
  },
});

export const { setUserTyping, setUserStoppedTyping } = typingSlice.actions;
export default typingSlice.reducer;
