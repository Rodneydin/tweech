import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    fetchMessagesStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchMessagesSuccess: (state, action) => {
      state.isLoading = false;
      state.messages = action.payload;
    },
    fetchMessagesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // Add more reducers for updating, deleting, or sending messages
  },
});

export const {
  fetchMessagesStart,
  fetchMessagesSuccess,
  fetchMessagesFailure, 
} = messagesSlice.actions;

export default messagesSlice.reducer;
