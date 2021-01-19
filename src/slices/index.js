import { combineReducers } from '@reduxjs/toolkit';
import channelsInfoReducer from './channelsInfoSlice.js';
import messagesReducer from './messagesSlice.js';
import modalReducer from './modalSlice.js';
import networkErrorsReducer from './networkErrorsSlice.js';

export default combineReducers({
  channelsInfo: channelsInfoReducer,
  messages: messagesReducer,
  modal: modalReducer,
  networkErrorToast: networkErrorsReducer,
});
