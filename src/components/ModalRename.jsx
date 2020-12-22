import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { Modal } from 'react-bootstrap';
import * as actions from '../actions/index.js';

const mapStateToProps = (state) => {
  const { modal, channels } = state;
  return { modal, channels };
};

const actionCreators = {
  closeModal: actions.closeModal,
  renameChannel: actions.renameChannel,
};

const ModalRename = ({
  closeModal, renameChannel, modal, channels,
}) => {
  const currentChannelName = channels.find(({ id }) => id === modal.extra.channelId).name;
  console.log(currentChannelName);

  const inputElement = useRef(null);

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
      inputElement.current.select();
    }
  });

  const handleCloseModal = () => {
    closeModal();
  };

  const handleSubmit = async (values) => {
    const payload = { name: values.body, id: modal.extra.channelId };
    try {
      await renameChannel(payload);
      closeModal();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Rename channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ body: currentChannelName }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group">
                <Field
                  name="body"
                  className="mb-2 form-control"
                  innerRef={inputElement}
                  required
                />
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="mr-2 btn btn-secondary"
                    onClick={handleCloseModal}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </>
  );
};

export default connect(mapStateToProps, actionCreators)(ModalRename);
