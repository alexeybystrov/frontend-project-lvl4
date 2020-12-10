import React from 'react';

const Channels = ({ channels }) => (
  <ul className="nav flex-column nav-pills nav-fill">
    {channels.map(({ name }) => <li className="nav-item" key={name}>{name}</li>)}
  </ul>
);

export default Channels;
