import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationState {
  logs: any[];
  unread: boolean;
}

const initialState: NotificationState = {
  logs: [],
  unread: false, // Indica si hay nuevas notificaciones
};

export const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addLog: (state, action: PayloadAction<any>) => {
      state.logs.unshift(action.payload);
      state.unread = true;
    },
    markAsRead: (state) => {
      state.unread = false;
    },
  },
});

export const { addLog, markAsRead } = notificationSlice.actions;
export default notificationSlice.reducer;
