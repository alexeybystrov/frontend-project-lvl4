import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

// export const setInitialState = createAction('SET_INITIAL_STATE');

export const setCurrentChannelId = createAction('SET_CURRENT_CHANNEL_ID');

export const sendNewMessageSuccess = createAction('MESSAGE_SEND_SUCCESS');

export const sendNewMessage = (channelId, payload) => async (/* dispatch */) => {
  const url = routes.channelMessagesPath(channelId);
  const data = { data: { attributes: payload } };
  /* const response =  */await axios.post(url, data);
  // console.log('lala', response.data);
  // dispatch(sendNewMessageSuccess(response.data));
};

export const openModal = createAction('MODAL_OPEN');
export const closeModal = createAction('MODAL_CLOSE');

export const addNewChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');

export const addNewChannel = (payload) => async (dispatch) => {
  const url = routes.channelsPath();
  const data = { data: { attributes: payload } };
  const response = await axios.post(url, data);
  dispatch(setCurrentChannelId(response.data.data));
};
