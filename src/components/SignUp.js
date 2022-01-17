import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from "../actions/authActions";

class SignUp extends React.Component {

  state = {
    username: "",
    password: ""
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const newUser = { username, password };
    this.props.register(newUser);
    this.setState({ username: "", password: "" });
  }

  render() {
    return (
      <div className="sign-up">
        <form onSubmit={this.onSubmit} className="signup-form">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            className="form-input"
            value={this.state.username}
            onChange={(e) => this.setState({ username: e.target.value })}
          />
          <label htmlFor="password">Password</label>
          <input
            id="current-password"
            type="password"
            className="form-input"
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          <input
            type="submit"
            value="Sign Up"
            className="btn"
          />
        </form>
      </div>
    )
  }
}

SignUp.propTypes = {
  register: PropTypes.func
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { register })(SignUp);