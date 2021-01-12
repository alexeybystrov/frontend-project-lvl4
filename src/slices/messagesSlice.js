import { createSlice/* , createAsyncThunk */ } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice.js';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: null,
  reducers: {
    receiveNewMessage: (state, { payload }) => {
      const newMessage = payload.data.attributes;
      state.push(newMessage);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeChannel, (state, { payload }) => {
        const removedChannelId = payload.data.id;
        return state.filter((message) => message.channelId !== removedChannelId);
      });
  },
});

export const { receiveNewMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
