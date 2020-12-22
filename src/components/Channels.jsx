import React from 'react';
import { connect } from 'react-redux';
import {
  Dropdown, Button, ButtonGroup, Nav,
} from 'react-bootstrap';
import * as actions from '../actions/index.js';

const mapStateToProps = (state) => {
  const { currentChannelId, channels } = state;
  return { currentChannelId, channels };
};

const actionCreators = {
  setCurrentChannelId: actions.setCurrentChannelId,
  openModal: actions.openModal,
};

const Channels = ({
  currentChannelId, channels, setCurrentChannelId, openModal,
}) => {
  const handleAddChannel = () => {
    const payload = {
      isOpened: true,
      type: 'addChannel',
      extra: null,
    };
    openModal(payload);
  };

  const handleRemoveChannel = (id) => () => {
    const payload = {
      isOpened: true,
      type: 'removeChannel',
      extra: id,
    };
    openModal(payload);
  };

  const handleSetCurrentChannelId = (id) => () => {
    setCurrentChannelId({ id });
  };

  const setVariant = (id) => (id === currentChannelId ? 'primary' : 'light');

  const renderRegularButton = (id, name) => (
    <Nav.Link as={Button} variant={setVariant(id)} onClick={handleSetCurrentChannelId(id)} className="mb-2 text-left" block>
      {name}
    </Nav.Link>
  );

  const renderRemovableButton = (id, name) => (
    <Dropdown as={ButtonGroup} className="d-flex mb-2">
      <Nav.Link as={Button} variant={setVariant(id)} onClick={handleSetCurrentChannelId(id)} className="text-left flex-grow-1">
        {name}
      </Nav.Link>
      <Dropdown.Toggle split variant={setVariant(id)} className="flex-grow-0" />
      <Dropdown.Menu>
        <Dropdown.Item href="#" onClick={handleRemoveChannel(id)}>Remove</Dropdown.Item>
        <Dropdown.Item href="#">Rename</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  const buttonRenderMapping = {
    false: renderRegularButton,
    true: renderRemovableButton,
  };

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button type="button" className="ml-auto p-0 btn btn-link" onClick={handleAddChannel}>+</button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.map(({ removable, id, name }) => (
          <Nav.Item as="li" key={id}>
            {buttonRenderMapping[removable](id, name)}
          </Nav.Item>
        ))}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, actionCreators)(Channels);
