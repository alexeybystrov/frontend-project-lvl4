// import { Field } from 'formik';
import React, { useState } from 'react';
import Channels from './Channels.jsx';
import MessagesList from './MessagesList.jsx';
import MessagesForm from './MessagesForm.jsx';
import ParentModal from './ParentModal.jsx';
import NetworkErrorToast from './NetworkErrorToast.jsx';

const App = () => {
  const toastState = useState(false);

  return (
    <div className="row h-100 pb-3">
      <Channels />
      <div className="col h-100">
        <div className="d-flex flex-column h-100">
          <MessagesList />
          <MessagesForm toastState={toastState} />
        </div>
      </div>
      <ParentModal toastState={toastState} />
      <NetworkErrorToast toastState={toastState} />
    </div>
  );
};
export default App;
