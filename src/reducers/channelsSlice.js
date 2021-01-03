import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: '',
  reducers: {
    receiveNewChannel: (state, { payload }) => {
      const newChannel = payload.data.attributes;
      state.push(newChannel);
    },
    removeChannel: (state, { payload }) => {
      const removedChannelId = payload.data.id;
      return state.filter(({ id }) => id !== removedChannelId);
    },
    renameChannel: (state, { payload }) => {
      const renamedChannelId = payload.data.id;
      const channelNewName = payload.data.attributes.name;
      const channel = state.find(({ id }) => id === renamedChannelId);
      channel.name = channelNewName;
    },
  },
});

export const { receiveNewChannel, removeChannel, renameChannel } = channelsSlice.actions;
export default channelsSlice.reducer;
