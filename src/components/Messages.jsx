import React from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import * as actions from '../actions/index.js';

const mapStateToProps = (state) => {
  const { currentChannelId, messages } = state;
  return { currentChannelId, messages };
};

const actionCreators = {
  sendNewMessage: actions.sendNewMessage,
};

const Messages = ({ currentChannelId, messages, sendNewMessage }) => {
  const handleSubmit = async (values, formikActions) => {
    const payload = { message: values.body, userName: 'user.name' };
    try {
      await sendNewMessage(currentChannelId, payload);
      formikActions.resetForm();
    } catch (e) {
      console.error(e);
    }
    console.log(messages);
  };

  const renderMessages = () => (
    messages
      .filter(({ channelId }) => channelId === currentChannelId)
      .map(({ message, userName, id }) => (
        <div className="text-break" key={id}>
          <b>{userName}</b>
          {`: ${message}`}
        </div>
      ))
  );

  return (
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        <div id="messages-box" className="chat-messages overflow-auto mb-3">
          {renderMessages()}
        </div>
        <div className="mt-auto">
          <Formik
            initialValues={{ body: '' }}
            onSubmit={handleSubmit}
          >
            {(props) => (
              <Form>
                <div className="form-group">
                  <div className="input-group">
                    <Field
                      name="body"
                      aria-label="body"
                      className="mr-2 form-control"
                    />
                    <button
                      aria-label="submit"
                      type="submit"
                      className="btn btn-primary"
                      disabled={props.isSubmitting}
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
      </div>
    </div>
  );
};

export default connect(mapStateToProps, actionCreators)(Messages);
