import React, { useContext, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import cn from 'classnames';
import * as yup from 'yup';
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

  const validate = (value) => {
    const schema = yup
      .string()
      .required('Required')
      .trim('No leading and trailing whitespace allowed');

    try {
      schema.validateSync(value);
    } catch (err) {
      return err.errors;
    } return undefined;
  };

  return (
    <div className="mt-auto">
      <Formik
        initialValues={{ body: '' }}
        onSubmit={handleSubmit}
        validateOnBlur={false}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <div className="form-group">
              <div className="input-group">
                <Field
                  name="body"
                  className={cn('mr-2 form-control', { 'is-invalid': errors.body })}
                  innerRef={inputElement}
                  validate={validate}
                />
                <button
                  aria-label="submit"
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
                {errors.body && <div className="d-block mb-2 invalid-feedback">{errors.body}</div>}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default connect(mapStateToProps, actionCreators)(MessagesForm);
