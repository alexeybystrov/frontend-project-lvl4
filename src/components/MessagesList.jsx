import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  const { currentChannelId, messages } = state;
  return { currentChannelId, messages };
};

const MessagesList = ({ currentChannelId, messages }) => (
  <div id="messages-box" className="chat-messages overflow-auto mb-3">
    {messages
      .filter(({ channelId }) => channelId === currentChannelId)
      .map(({ body, username, id }) => (
        <div className="text-break" key={id}>
          <b>{username}</b>
          {`: ${body}`}
        </div>
      ))}
  </div>
);

export default connect(mapStateToProps)(MessagesList);
