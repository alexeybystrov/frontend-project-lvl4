import React, { useContext, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import cn from 'classnames';
import * as yup from 'yup';
import axios from 'axios';
import routes from '../routes.js';
import UserContext from '../UserContext.js';

const MessagesForm = () => {
  const { currentChannelId } = useSelector((state) => state.channelsInfo);
  const { username } = useContext(UserContext);
  const inputElement = useRef(null);

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, []);

  const handleSubmit = async (values, formikActions) => {
    const payload = { body: values.body, username };
    const url = routes.channelMessagesPath(currentChannelId);
    const data = { data: { attributes: payload } };
    try {
      await axios.post(url, data);
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

export default MessagesForm;
