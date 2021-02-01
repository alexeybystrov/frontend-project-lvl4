import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import routes from '../routes.js';
import { closeModal } from '../slices/modalSlice.js';

const ModalRemove = (props) => {
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const { toastState: [, setShowToast] } = props;
  const handleRemoveChannel = async () => {
    const payload = { id: modal.extra.channelId };
    const url = routes.channelPath(payload.id);
    const data = { data: { params: payload } };
    try {
      dispatch(closeModal());
      await axios.delete(url, data);
    } catch (e) {
      setShowToast(true);
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

export default ModalRemove;
