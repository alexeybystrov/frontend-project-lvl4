import { createReducer } from '@reduxjs/toolkit';
import * as actions from '../actions/index.js';

const channels = createReducer([], (builder) => {
  builder
    // .addCase(actions.setInitialState, (state, { payload }) => payload.channels)
    .addCase(actions.addNewChannelSuccess, (state, { payload }) => {
      const {
        id, name, removable,
      } = payload.data.attributes;
      const newChannel = {
        id,
        name,
        removable,
      };
      state.push(newChannel);
    });
});

const messages = createReducer([], (builder) => {
  builder
    // .addCase(actions.setInitialState, (state, { payload }) => payload.messages)
    .addCase(actions.sendNewMessageSuccess, (state, { payload }) => {
      const {
        body, username, channelId, id,
      } = payload.data.attributes;
      const newMessage = {
        body,
        username,
        channelId,
        id,
      };
      state.push(newMessage);
    });
});

const currentChannelId = createReducer('', (builder) => {
  builder
    // .addCase(actions.setInitialState, (state, { payload }) => payload.currentChannelId)
    .addCase(actions.setCurrentChannelId, (state, { payload }) => payload.id);
});

const modal = createReducer(
  { isOpened: false, type: null, extra: null },
  (builder) => {
    builder
      .addCase(actions.openModal, (state) => ({ ...state, isOpened: true }))
      .addCase(actions.closeModal, (state) => ({ ...state, isOpened: false }));
  },
);

export default {
  channels, messages, currentChannelId, modal,
};
