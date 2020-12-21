import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import {
  SplitButton, Dropdown, Button, ButtonGroup, Nav,
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
    openModal();
  };

  const handleSetCurrentChannelId = (id) => () => {
    setCurrentChannelId({ id });
  };

  const setVariant = (id) => (id === currentChannelId ? 'primary' : 'light');

  const renderRegularButton = (id, name) => (
    <Nav.Item as="li" key={id}>
      <Nav.Link as={Button} variant={setVariant(id)} onClick={handleSetCurrentChannelId(id)} className="mb-2 text-left" block>
        {name}
      </Nav.Link>
    </Nav.Item>
  );

  const renderRemovableButton = (id, name) => (
    <Nav.Item as="li" key={id}>
      <Dropdown as={ButtonGroup} className="d-flex mb-2">
        <Button variant={setVariant(id)} onClick={handleSetCurrentChannelId(id)} className="text-left flex-grow-1 nav-link">
          {name}
        </Button>
        <Dropdown.Toggle split variant={setVariant(id)} className="flex-grow-0" />
        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Remove</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Rename</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav.Item>
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
        {channels.map(({ id, name, removable }) => buttonRenderMapping[removable](id, name))}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, actionCreators)(Channels);
