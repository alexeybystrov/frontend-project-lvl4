import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import * as actions from '../actions/index.js';

const mapStateToProps = (state) => {
  const { modal } = state;
  return { modal };
};

const actionCreators = {
  closeModal: actions.closeModal,
  removeChannel: actions.removeChannel,
};

const ModalRemove = ({ closeModal, removeChannel, modal }) => {
  const handleCloseModal = () => {
    closeModal();
  };

  const handleRemoveChannel = async () => {
    const payload = { id: modal.extra.channelId };
    try {
      await removeChannel(payload);
      closeModal();
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
