import ReactDOM from 'react-dom';
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import cookies from 'js-cookie';
import { fake } from 'faker';
import io from '../node_modules/socket.io/client-dist/socket.io.js';
import App from './components/App.jsx';
import UserContext from './UserContext.js';
import * as actions from './actions/index.js';
import rootReducer from './reducers/index.js';

export default (preloadedState) => {
  if (!cookies.get('username')) {
    const username = fake('{{name.firstName}} {{name.lastName}}');
    cookies.set('username', username);
  }

  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });
  // store.dispatch(actions.setInitialState(gon));

  const socket = io();
  socket.on('newMessage', (newMessage) => {
    store.dispatch(actions.sendNewMessageSuccess(newMessage));
  });
  socket.on('newChannel', (newChannel) => {
    store.dispatch(actions.addNewChannelSuccess(newChannel));
  });
  socket.on('removeChannel', (data) => {
    store.dispatch(actions.removeChannelSuccess(data));
  });
  socket.on('renameChannel', (data) => {
    store.dispatch(actions.renameChannelSuccess(data));
  });

  ReactDOM.render(
    <Provider store={store}>
      <UserContext.Provider value={{ username: cookies.get('username') }}>
        <App />
      </UserContext.Provider>
    </Provider>, document.getElementById('chat'),
  );
};
