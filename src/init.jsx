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
import { receiveNewChannel, removeChannel, renameChannel } from './slices/channelsSlice.js';
import rootReducer from './slices/index.js';

export default (preloadedState) => {
  if (!cookies.get('username')) {
    cookies.set('username', fake('{{name.firstName}} {{name.lastName}}'));
  }
  const username = cookies.get('username');

  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  const socket = io();
  socket.on('newMessage', (newMessage) => {
    store.dispatch(receiveNewMessage(newMessage));
  });
  socket.on('newChannel', (newChannel) => {
    store.dispatch(receiveNewChannel(newChannel));
  });
  socket.on('removeChannel', (data) => {
    store.dispatch(removeChannel(data));
  });
  socket.on('renameChannel', (data) => {
    store.dispatch(renameChannel(data));
  });

  ReactDOM.render(
    <Provider store={store}>
      <UserContext.Provider value={{ username }}>
        <App />
      </UserContext.Provider>
    </Provider>, document.getElementById('chat'),
  );
};
