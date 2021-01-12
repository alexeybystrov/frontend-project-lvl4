import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { closeModal } from '../slices/modalSlice.js';
import ModalAdd from './ModalAdd.jsx';
import ModalRemove from './ModalRemove.jsx';
import ModalRename from './ModalRename.jsx';

const ParentModal = () => {
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const modalMapping = {
    addChannel: <ModalAdd />,
    removeChannel: <ModalRemove />,
    renameChannel: <ModalRename />,
  };

  return (
    <Modal show={modal.isOpened} onHide={handleCloseModal}>
      {modalMapping[modal.type]}
    </Modal>
  );
};

export default ParentModal;
