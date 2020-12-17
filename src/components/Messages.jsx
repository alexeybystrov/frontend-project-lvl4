import React from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import * as actions from '../actions/index.js';
import UserContext from '../UserContext.js';

const mapStateToProps = (state) => {
  const { currentChannelId, messages } = state;
  return { currentChannelId, messages };
};

const actionCreators = {
  sendNewMessage: actions.sendNewMessage,
};

const Messages = ({ currentChannelId, messages, sendNewMessage }) => {
  const handleSubmit = ({ username }) => async (values, formikActions) => {
    console.log(username);
    const payload = { body: values.body, username };
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
      .map(({ body, username, id }) => (
        <div className="text-break" key={id}>
          <b>{username}</b>
          {`: ${body}`}
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
          <UserContext.Consumer>
            {(username) => (
              <Formik
                initialValues={{ body: '' }}
                onSubmit={handleSubmit(username)}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="form-group">
                      <div className="input-group">
                        <Field name="body" aria-label="body" className="mr-2 form-control" />
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
            )}
          </UserContext.Consumer>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, actionCreators)(Messages);
