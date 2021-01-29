import _ from 'lodash';
import { createSlice } from '@reduxjs/toolkit';

const channelsInfoSlice = createSlice({
  name: 'channels',
  initialState: null,
  reducers: {
    receiveNewChannel: (state, { payload }) => {
      state.channels.push(payload);
    },
    removeChannel: (state, { payload }) => {
      const removedChannelId = payload;
      _.remove(state.channels, ({ id }) => id === removedChannelId);
      if (state.currentChannelId === removedChannelId) {
        _.set(state, 'currentChannelId', 1);
      }
    },
    renameChannel: (state, { payload }) => {
      const renamedChannelId = payload.id;
      const channelNewName = payload.name;
      const channel = state.channels.find(({ id }) => id === renamedChannelId);
      channel.name = channelNewName;
    },
    setCurrentChannelId: (state, { payload }) => {
      _.set(state, 'currentChannelId', payload);
    },
  },
});

export const {
  receiveNewChannel, removeChannel, renameChannel, setCurrentChannelId,
} = channelsInfoSlice.actions;
export default channelsInfoSlice.reducer;
