import { React, useState } from 'react';
import { Modal, Form, Button, FloatingLabel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { signup } from "../actions/auth";

function SignUp(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    const newUser = { username, password };
    props.signup(newUser);
  }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Title id="example-modal-sizes-title-sm">
        Register
      </Modal.Title>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Username"
              defaultValue={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="new-username" />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password" />
          </FloatingLabel>
          <Button variant="secondary" type="submit">Sign Up</Button>
          <p style={{ paddingTop: "1rem" }}>{props.signupresponse}</p>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

const mapStateToProps = (state) => ({
  signupresponse: state.auth.signupResponse
});

export default connect(mapStateToProps, { signup })(SignUp);