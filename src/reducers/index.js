import { createReducer } from '@reduxjs/toolkit';
import _ from 'lodash';
import * as actions from '../actions/index.js';

const channels = createReducer({}, (builder) => {
  builder
    .addCase(actions.setInitialState, (state, { payload }) => {
      const byId = _.keyBy(payload.channels, 'id');
      const allIds = payload.channels.map((item) => item.id);
      return { byId, allIds };
    });
});

const messages = createReducer([], (builder) => {
  builder
    .addCase(actions.setInitialState, (state, { payload }) => payload.messages)
    .addCase(actions.sendNewMessageSuccess, (state, { payload }) => {
      // console.log(payload);
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

export default { channels, messages, currentChannelId };
