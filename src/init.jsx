import ReactDOM from 'react-dom';
import React from 'react';

import App from './components/App.jsx';

export default (gon) => {
  const { channels } = gon;
  const mountNode = document.getElementById('chat');

  ReactDOM.render(
    <App channels={channels} />,
    mountNode,
  );
};
