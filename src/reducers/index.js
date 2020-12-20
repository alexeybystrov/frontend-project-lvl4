import { createReducer } from '@reduxjs/toolkit';
import * as actions from '../actions/index.js';

const channels = createReducer({}, (builder) => {
  builder
    .addCase(actions.setInitialState, (state, { payload }) => payload.channels);
});

const messages = createReducer([], (builder) => {
  builder
    .addCase(actions.setInitialState, (state, { payload }) => payload.messages)
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
    .addCase(actions.setInitialState, (state, { payload }) => payload.currentChannelId)
    .addCase(actions.setCurrentChannelId, (state, { payload }) => payload.id);
});

const modal = createReducer(
  { isOpened: false, type: null, extra: null },
  (builder) => {
    builder
      .addCase(actions.toggleModal, (state) => {
        const { isOpened } = state;
        return { ...state, isOpened: !isOpened };
      });
  },
);

export default {
  channels, messages, currentChannelId, modal,
};
