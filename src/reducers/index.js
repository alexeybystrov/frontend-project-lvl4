import { createReducer } from '@reduxjs/toolkit';
import * as actions from '../actions/index.js';

const channels = createReducer([], (builder) => {
  builder
    // .addCase(actions.setInitialState, (state, { payload }) => payload.channels)
    .addCase(actions.addNewChannelSuccess, (state, { payload }) => {
      const newChannel = payload.data.attributes;
      state.push(newChannel);
    });
});

const messages = createReducer([], (builder) => {
  builder
    // .addCase(actions.setInitialState, (state, { payload }) => payload.messages)
    .addCase(actions.sendNewMessageSuccess, (state, { payload }) => {
      const newMessage = payload.data.attributes;
      state.push(newMessage);
    });
});

const currentChannelId = createReducer('', (builder) => {
  builder
    // .addCase(actions.setInitialState, (state, { payload }) => payload.currentChannelId)
    .addCase(actions.setCurrentChannelId, (_state, { payload }) => payload.id);
});

const modalInitialState = { isOpened: false, type: null, extra: null };
const modal = createReducer(modalInitialState, (builder) => {
  builder
    .addCase(actions.openModal, (state, { payload }) => payload)
    .addCase(actions.closeModal, () => modalInitialState);
});

export default {
  channels, messages, currentChannelId, modal,
};
