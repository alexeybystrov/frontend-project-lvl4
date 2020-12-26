import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { Modal } from 'react-bootstrap';
import * as actions from '../actions/index.js';

const actionCreators = {
  closeModal: actions.closeModal,
  addNewChannel: actions.addNewChannel,
};

const ModalAdd = ({ closeModal, addNewChannel }) => {
  const inputElement = useRef(null);

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  });

  const handleCloseModal = () => {
    closeModal();
  };

  const handleSubmit = async (values) => {
    const payload = { name: values.body };
    try {
      await addNewChannel(payload);
      closeModal();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Add channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ body: '' }}
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
                {isSubmitting && <div className="feedback">Creating channel...</div>}
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

export default connect(null, actionCreators)(ModalAdd);
