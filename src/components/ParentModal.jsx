import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import * as actions from '../actions/index.js';
import ModalAdd from './ModalAdd.jsx';
import ModalRemove from './ModalRemove.jsx';
import ModalRename from './ModalRename.jsx';

const mapStateToProps = (state) => {
  const { modal } = state;
  return { modal };
};

const actionCreators = {
  closeModal: actions.closeModal,
};

const CommonModal = ({ modal, closeModal }) => {
  const handleCloseModal = () => {
    closeModal();
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

export default connect(mapStateToProps, actionCreators)(CommonModal);
