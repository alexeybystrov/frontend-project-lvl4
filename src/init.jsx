import ReactDOM from 'react-dom';
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import cookies from 'js-cookie';
import { fake } from 'faker';
import io from '../node_modules/socket.io/client-dist/socket.io.js';
import App from './components/App.jsx';
import UserContext from './UserContext.js';
import { receiveNewMessage } from './slices/messagesSlice.js';
import { receiveNewChannel, removeChannel, renameChannel } from './slices/channelsInfoSlice.js';
import rootReducer from './slices/index.js';

export default (initialState) => {
  if (!cookies.get('username')) {
    cookies.set('username', fake('{{name.firstName}} {{name.lastName}}'));
  }
  const username = cookies.get('username');

  const preloadedState = {
    channelsInfo: {
      channels: initialState.channels,
      currentChannelId: initialState.currentChannelId,
    },
    messages: initialState.messages,
  };

  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  const socket = io();
  socket.on('newMessage', (data) => {
    const { data: { attributes: newMessage } } = data;
    store.dispatch(receiveNewMessage(newMessage));
  });
  socket.on('newChannel', (data) => {
    const { data: { attributes: newChannel } } = data;
    store.dispatch(receiveNewChannel(newChannel));
  });
  socket.on('removeChannel', (data) => {
    const { data: { id: removedChannelId } } = data;
    store.dispatch(removeChannel(removedChannelId));
  });
  socket.on('renameChannel', (data) => {
    const { data: { attributes: renamedChannel } } = data;
    store.dispatch(renameChannel(renamedChannel));
  });

  ReactDOM.render(
    <Provider store={store}>
      <UserContext.Provider value={{ username }}>
        <App />
      </UserContext.Provider>
    </Provider>, document.getElementById('chat'),
  );
};
