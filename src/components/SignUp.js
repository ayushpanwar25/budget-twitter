import React from 'react';
import { Modal, Form, Button, FloatingLabel } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signup } from "../actions/auth";

class SignUp extends React.Component {

  state = {
    username: "",
    password: ""
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const newUser = { username, password };
    this.props.signup(newUser);
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
          Register
        </Modal.Title>
        <Modal.Body>
          <Form>
            <FloatingLabel
              controlId="floatingInput"
              label="Username"
              className="mb-3"
            >
              <Form.Control type="text" placeholder="Username" autoComplete="off" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control type="password" placeholder="Password" autoComplete="off" />
            </FloatingLabel>
            <Button type="submit">Sign Up</Button>
          </Form>
          {/*<form onSubmit={this.onSubmit} className="input-form">
            <input
              id="current-username"
              type="text"
              className="text-field"
              placeholder="Username"
              value={this.state.username}
              onChange={(e) => this.setState({ username: e.target.value })}
            />
            <input
              id="current-password"
              type="password"
              className="text-field"
              placeholder="Password"
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
            <button
              type="submit"
              className="submit-btn">Sign Up</button>
    </form>*/}
        </Modal.Body>
      </Modal>
    )
  }
}

SignUp.propTypes = {
  signup: PropTypes.func
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { signup })(SignUp);