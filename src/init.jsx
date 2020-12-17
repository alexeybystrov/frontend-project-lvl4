import ReactDOM from 'react-dom';
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import cookies from 'js-cookie';
import { fake } from 'faker';
import App from './components/App.jsx';
import UserContext from './UserContext.js';
// import * as actions from './actions/index.js';
import rootReducer from './reducers/index.js';

if (!cookies.get('username')) {
  const username = fake('{{name.lastName}} {{name.firstName}}');
  cookies.set('username', username);
}

export default (gon) => {
  const preloadedState = gon;

  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  // store.dispatch(actions.setInitialState(gon));

  ReactDOM.render(
    <Provider store={store}>
      <UserContext.Provider value={{ username: cookies.get('username') }}>
        <App />
      </UserContext.Provider>
    </Provider>, document.getElementById('chat'),
  );
};
