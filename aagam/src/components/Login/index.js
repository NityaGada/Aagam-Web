import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const Login = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Your login form goes here */}
        <p>Put your login form components here</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Login;