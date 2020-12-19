import React, { useContext, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import * as actions from '../actions/index.js';
import UserContext from '../UserContext.js';

const mapStateToProps = (state) => {
  const { currentChannelId } = state;
  return { currentChannelId };
};

const actionCreators = {
  sendNewMessage: actions.sendNewMessage,
};

const MessagesForm = ({ currentChannelId, sendNewMessage }) => {
  const { username } = useContext(UserContext);

  const inputElement = useRef(null);

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  });

  const handleSubmit = async (values, formikActions) => {
    const payload = { body: values.body, username };
    try {
      await sendNewMessage(currentChannelId, payload);
      formikActions.resetForm();
    } catch (e) {
      console.error(e);
    }
    inputElement.current.focus();
  };

  return (
    <div className="mt-auto">
      <Formik
        initialValues={{ body: '' }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <div className="input-group">
                <Field
                  name="body"
                  aria-label="body"
                  className="mr-2 form-control"
                  innerRef={inputElement}
                />
                <button
                  aria-label="submit"
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
                <div className="d-block invalid-feedback">&nbsp;</div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default connect(mapStateToProps, actionCreators)(MessagesForm);
