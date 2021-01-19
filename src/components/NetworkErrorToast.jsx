import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Toast } from 'react-bootstrap';
import { closeToast } from '../slices/networkErrorsSlice.js';

const NetworkErrorToast = () => {
  const { isOpened, text } = useSelector((state) => state.networkErrorToast);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeToast());
  };

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: 'relative',
        minHeight: '100px',
      }}
    >
      <Toast
        onClose={() => handleCloseModal()}
        show={isOpened}
        delay={3000}
        autohide
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 'max-content',
        }}
      >
        <Toast.Body className="text-danger">
          {text}
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default NetworkErrorToast;
