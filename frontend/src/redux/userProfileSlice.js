import { createSlice } from "@reduxjs/toolkit";

const userProfileSlice = createSlice({
  name: "userProfile", // ✅ Corrected name
  initialState: { value: false }, // ✅ Proper structure
  reducers: {
    setUserProfile: (state, action) => {
      state.value = action.payload; // ✅ Correct state update
    },
  },
});

export const { setUserProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;
