import React from 'react';
import { useSelector } from 'react-redux';

const MessagesList = () => {
  const { currentChannelId } = useSelector((state) => state.channelsInfo);
  const messages = useSelector((state) => state.messages
    .filter(({ channelId }) => channelId === currentChannelId));

  return (
    <div id="messages-box" className="chat-messages overflow-auto mb-3">
      {messages
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
