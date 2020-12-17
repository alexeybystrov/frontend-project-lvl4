import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import * as actions from '../actions/index.js';

const mapStateToProps = (state) => {
  const { currentChannelId, channels } = state;
  return { currentChannelId, channels };
};

const actionCreators = {
  setCurrentChannelId: actions.setCurrentChannelId,
};

const Channels = ({ currentChannelId, channels, setCurrentChannelId }) => {
  // console.log(channels);
  const handleSetCurrentChannelId = (id) => () => {
    setCurrentChannelId({ id });
  };

  const buttonClass = (id) => cn(
    'nav-link btn-block mb-2 text-left btn',
    `btn-${currentChannelId === id ? 'primary' : 'light'}`,
  );

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button type="button" className="ml-auto p-0 btn btn-link">+</button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.map(({ id, name }) => (
          <li className="nav-item" key={id}>
            <button type="button" className={buttonClass(id)} onClick={handleSetCurrentChannelId(id)}>
              {name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, actionCreators)(Channels);
