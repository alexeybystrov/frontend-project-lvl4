import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { closeModal } from '../slices/modalSlice.js';
import ModalAdd from './ModalAdd.jsx';
import ModalRemove from './ModalRemove.jsx';
import ModalRename from './ModalRename.jsx';

const ParentModal = (props) => {
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const { toastState } = props;

  const modalMapping = {
    addChannel: <ModalAdd toastState={toastState} />,
    removeChannel: <ModalRemove toastState={toastState} />,
    renameChannel: <ModalRename toastState={toastState} />,
  };

  return (
    <Modal show={modal.isOpened} onHide={handleCloseModal}>
      {modalMapping[modal.type]}
    </Modal>
  );
};

export default ParentModal;
