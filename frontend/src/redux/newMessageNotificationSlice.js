import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newMessageNotification: false,
};

const newMessageNotificationSlice = createSlice({
  name: "newMessageNotification",
  initialState,
  reducers: {
    setNewMessageNotification: (state, action) => {
      state.newMessageNotification = action.payload;
    },
  },
});

export const { setNewMessageNotification } =
  newMessageNotificationSlice.actions;
export default newMessageNotificationSlice.reducer;
