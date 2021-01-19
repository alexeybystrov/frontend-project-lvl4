import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { Modal } from 'react-bootstrap';
import cn from 'classnames';
import * as yup from 'yup';
import axios from 'axios';
import routes from '../routes.js';
import { closeModal } from '../slices/modalSlice.js';
import { setCurrentChannelId } from '../slices/channelsInfoSlice.js';
import { showToast } from '../slices/networkErrorsSlice.js';

const ModalRename = () => {
  const modal = useSelector((state) => state.modal);
  const { channels } = useSelector((state) => state.channelsInfo);
  const dispatch = useDispatch();
  const inputElement = useRef(null);

  const currentChannelName = channels.find(({ id }) => id === modal.extra.channelId).name;

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.select();
    }
  }, []);

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleSubmit = async (values) => {
    const payload = { name: values.body, id: modal.extra.channelId };
    const url = routes.channelPath(payload.id);
    const data = { data: { attributes: payload } };
    try {
      dispatch(closeModal());
      const response = await axios.patch(url, data);
      dispatch(setCurrentChannelId(response.data.data));
    } catch (e) {
      dispatch(showToast(e));
    }
  };

  const validate = (value) => {
    const channelNames = channels.map(({ name }) => name);
    const schema = yup
      .string()
      .required('Required')
      .min(3, 'Must be 3 to 20 characters')
      .max(20, 'Must be 3 to 20 characters')
      .trim('No leading and trailing whitespace allowed')
      .strict()
      .notOneOf(channelNames, 'The channel already exists');

    try {
      schema.validateSync(value);
    } catch (err) {
      return err.errors;
    } return undefined;
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
          validateOnBlur={false}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <div className="form-group">
                <Field
                  name="body"
                  className={cn('mb-2 form-control', { 'is-invalid': errors.body && touched.body })}
                  innerRef={inputElement}
                  validate={validate}
                />
                {errors.body && touched.body && <div className="d-block mb-2 invalid-feedback">{errors.body}</div>}
                {isSubmitting && <div className="d-block mb-2 text-muted">Renaming channel...</div>}
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

export default ModalRename;
