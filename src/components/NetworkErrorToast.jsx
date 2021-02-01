import React from 'react';
import { Toast } from 'react-bootstrap';

const NetworkErrorToast = (props) => {
  const { toastState: [show, setShow] } = props;

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
        onClose={() => setShow(false)}
        show={show}
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
          Network Error
        </Toast.Body>
      </Toast>
    </div>
  );
};

export default NetworkErrorToast;
