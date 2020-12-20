// import { Field } from 'formik';
import React from 'react';
import Channels from './Channels.jsx';
import MessagesList from './MessagesList.jsx';
import MessagesForm from './MessagesForm.jsx';
import CommonModal from './CommonModal.jsx';

const App = () => (
  <div className="row h-100 pb-3">
    <Channels />
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <MessagesList />
        <MessagesForm />
      </div>
    </div>
    <CommonModal />
  </div>
);
export default App;
