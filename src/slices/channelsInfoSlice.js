import _ from 'lodash';
import { createSlice, combineReducers } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: null,
  reducers: {
    receiveNewChannel: (state, { payload }) => {
      const newChannel = payload.data.attributes;
      state.push(newChannel);
    },
    removeChannel: (state, { payload }) => {
      const removedChannelId = payload.data.id;
      _.remove(state, ({ id }) => id === removedChannelId);
    },
    renameChannel: (state, { payload }) => {
      const renamedChannelId = payload.data.id;
      const channelNewName = payload.data.attributes.name;
      const channel = state.find(({ id }) => id === renamedChannelId);
      channel.name = channelNewName;
    },
  },
});

const currentChannelIdSlice = createSlice({
  name: 'currentChannelId',
  initialState: null,
  reducers: {
    setCurrentChannelId: (state, { payload }) => payload.id,
  },
});

const channelsInfo = combineReducers({
  channels: channelsSlice.reducer,
  currentChannelId: currentChannelIdSlice.reducer,
});

export const { receiveNewChannel, removeChannel, renameChannel } = channelsSlice.actions;
export const { setCurrentChannelId } = currentChannelIdSlice.actions;
export default channelsInfo;
