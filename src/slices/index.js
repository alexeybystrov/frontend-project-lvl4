import { combineReducers } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';
import currentChannelIdReducer from './currentChannelIdSlice.js';
import modalReducer from './modalSlice.js';
import networkErrorsReducer from './networkErrorsSlice.js';

export default combineReducers({
  channels: channelsReducer,
  messages: messagesReducer,
  currentChannelId: currentChannelIdReducer,
  modal: modalReducer,
  networkErrors: networkErrorsReducer,
});
