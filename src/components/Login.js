import React from 'react';
import { Modal, Form, Button, FloatingLabel } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from "../actions/auth";

class Login extends React.Component {

  state = {
    username: "",
    password: ""
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const newUser = { username, password };
    this.props.login(newUser);
    this.props.onHide();
  }

  render() {
    return (
      <Modal
        {...this.props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Title id="example-modal-sizes-title-sm">
          Welcome back
        </Modal.Title>
        <Modal.Body>
          <Form>
            <FloatingLabel
              controlId="floatingInput"
              label="Username"
              className="mb-3"
            >
              <Form.Control type="text" placeholder="Username" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control type="password" placeholder="Password" />
            </FloatingLabel>
            <Button type="submit">Sign in</Button>
          </Form>
        </Modal.Body>
      </Modal>

    )
  }
}

Login.propTypes = {
  login: PropTypes.func,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);