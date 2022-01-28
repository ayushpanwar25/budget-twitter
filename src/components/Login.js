import { React, useState } from 'react';
import { Modal, Form, Button, FloatingLabel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { login } from "../actions/auth";

function Login(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    const user = { username, password };
    props.login(user);
    if (props.isauthenticated) {
      props.onHide();
    }
  }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Title id="example-modal-sizes-title-sm">
        Welcome back
      </Modal.Title>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Username"
              defaultValue={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off" />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off" />
          </FloatingLabel>
          <Button variant="secondary" type="submit">Sign in</Button>
          {!props.isauthenticated && <p style={{ color: "red", paddingTop: "1rem" }}>{props.loginresponse}</p>}
        </Form>
      </Modal.Body>
    </Modal >
  )
}

const mapStateToProps = (state) => ({
  loginresponse: state.auth.loginResponse,
  isauthenticated: +state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);