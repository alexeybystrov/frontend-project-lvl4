import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { Modal } from 'react-bootstrap';
import * as actions from '../actions/index.js';

const mapStateToProps = (state) => {
  const { modal } = state;
  return { modal };
};

const actionCreators = {
  toggleModal: actions.toggleModal,
};

const CommonModal = ({ toggleModal, modal }) => {
  const inputElement = useRef(null);

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  });

  const handleToggle = () => {
    toggleModal();
  };

  const handleSubmit = () => {};

  return (
    <Modal show={modal.isOpened} onHide={handleToggle}>
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
                />
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="mr-2 btn btn-secondary"
                    onClick={handleToggle}
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
    </Modal>
  );
};

export default connect(mapStateToProps, actionCreators)(CommonModal);
