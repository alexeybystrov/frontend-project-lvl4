import ReactDOM from 'react-dom';
import React from 'react';

import Channels from './Channels.jsx';

export default (gon) => {
  const { channels } = gon;
  const mountNode = document.getElementById('react-root');

  ReactDOM.render(
    <Channels channels={channels} />,
    mountNode,
  );
};
