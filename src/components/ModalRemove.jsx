import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import routes from '../routes.js';
import { closeModal } from '../reducers/modalSlice.js';
import { setCurrentChannelId } from '../reducers/currentChannelIdSlice.js';

const mapStateToProps = (state) => {
  const { modal } = state;
  return { modal };
};

const actionCreators = {
  closeModal,
  setCurrentChannelId,
};

const ModalRemove = ({ closeModal, setCurrentChannelId, modal }) => {
  const handleCloseModal = () => {
    closeModal();
  };

  const handleRemoveChannel = async () => {
    const payload = { id: modal.extra.channelId };
    const url = routes.channelPath(payload.id);
    const data = { data: { params: payload } };
    try {
      await axios.delete(url, data);
      closeModal();
      setCurrentChannelId({ id: 1 });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Remove channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure?
        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="mr-2 btn btn-secondary"
            onClick={handleCloseModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-danger"
            onClick={handleRemoveChannel}
          >
            Confirm
          </button>
        </div>
      </Modal.Body>
    </>
  );
};

export default connect(mapStateToProps, actionCreators)(ModalRemove);
