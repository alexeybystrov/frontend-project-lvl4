// import { Field } from 'formik';
import React from 'react';
import Channels from './Channels.jsx';
import Chat from './Chat.jsx';

const App = ({ channels }) => (
  <div className="row h-100 pb-3">
    <Channels channels={channels} />
    <Chat />
  </div>
);
export default App;
