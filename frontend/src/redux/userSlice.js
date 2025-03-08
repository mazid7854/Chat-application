import { createSlice } from "@reduxjs/toolkit";

// Load user from localStorage
const storedUser = JSON.parse(localStorage.getItem("user")) || null;

const userSlice = createSlice({
  name: "user",
  initialState: { user: storedUser }, // Use stored user if available
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Save to localStorage
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user"); // Remove from localStorage on logout
    },
    updateUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Save to localStorage
    },
  },
});

export const { login, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;
