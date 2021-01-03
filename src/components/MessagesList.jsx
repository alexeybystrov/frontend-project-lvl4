import React from 'react';
import { useSelector } from 'react-redux';

const MessagesList = () => {
  const { currentChannelId, messages } = useSelector((state) => state);

  return (
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
};

export default MessagesList;
