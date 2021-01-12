import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Dropdown, Button, ButtonGroup, Nav,
} from 'react-bootstrap';
import { setCurrentChannelId } from '../slices/currentChannelIdSlice.js';
import { openModal } from '../slices/modalSlice.js';

const Channels = () => {
  const { currentChannelId, channels } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleAddChannel = () => {
    const payload = {
      isOpened: true,
      type: 'addChannel',
      extra: null,
    };
    dispatch(openModal(payload));
  };

  const handleRemoveChannel = (channelId) => () => {
    const payload = {
      isOpened: true,
      type: 'removeChannel',
      extra: { channelId },
    };
    dispatch(openModal(payload));
  };

  const handleRenameChannel = (channelId) => () => {
    const payload = {
      isOpened: true,
      type: 'renameChannel',
      extra: { channelId },
    };
    dispatch(openModal(payload));
  };

  const handleSetCurrentChannelId = (id) => () => {
    dispatch(setCurrentChannelId({ id }));
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
        <Dropdown.Item href="#" onClick={handleRenameChannel(id)}>Rename</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
    <div className="col-auto border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button type="button" className="ml-auto p-0 btn btn-link" onClick={handleAddChannel}>+</button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.map(({ removable, id, name }) => (
          <Nav.Item as="li" key={id}>
            {removable ? renderRemovableButton(id, name) : renderRegularButton(id, name)}
          </Nav.Item>
        ))}
      </ul>
    </div>
  );
};

export default Channels;
