import React from 'react';
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
      <form onSubmit={this.onSubmit} className="input-form">
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
      </form>
    )
  }
}

SignUp.propTypes = {
  signup: PropTypes.func
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { signup })(SignUp);