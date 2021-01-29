import _ from 'lodash';
import { createSlice } from '@reduxjs/toolkit';

const channelsInfoSlice = createSlice({
  name: 'channels',
  initialState: null,
  reducers: {
    receiveNewChannel: (state, { payload }) => {
      const newChannel = payload.data.attributes;
      state.channels.push(newChannel);
    },
    removeChannel: (state, { payload }) => {
      const removedChannelId = payload.data.id;
      _.remove(state.channels, ({ id }) => id === removedChannelId);
      if (state.currentChannelId === removedChannelId) {
        _.set(state, 'currentChannelId', 1);
      }
    },
    renameChannel: (state, { payload }) => {
      const renamedChannelId = payload.data.id;
      const channelNewName = payload.data.attributes.name;
      const channel = state.channels.find(({ id }) => id === renamedChannelId);
      channel.name = channelNewName;
    },
    setCurrentChannelId: (state, { payload }) => {
      _.set(state, 'currentChannelId', payload.id);
    },
  },
});

export const {
  receiveNewChannel, removeChannel, renameChannel, setCurrentChannelId,
} = channelsInfoSlice.actions;
export default channelsInfoSlice.reducer;
