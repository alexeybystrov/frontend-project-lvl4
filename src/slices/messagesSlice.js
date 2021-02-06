import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelsInfoSlice.js';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: null,
  reducers: {
    receiveNewMessage: (state, { payload }) => {
      const newMessage = payload;
      state.push(newMessage);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeChannel, (state, { payload }) => {
        const removedChannelId = payload;
        return state.filter((message) => message.channelId !== removedChannelId);
      });
  },
});

export const { receiveNewMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
