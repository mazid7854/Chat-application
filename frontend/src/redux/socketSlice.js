import { createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client";

const initialState = {
  socket: null,
  onlineUsers: [],
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    disconnectSocket: (state) => {
      if (state.socket) {
        state.socket.close();
      }
      state.socket = null;
      state.onlineUsers = [];
    },
  },
});

export const { setSocket, setOnlineUsers, disconnectSocket } =
  socketSlice.actions;
export default socketSlice.reducer;
