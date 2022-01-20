import React from 'react';
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
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} className="input-form">
        <input
          id="new-username"
          type="text"
          className="text-field"
          placeholder="Username"
          value={this.state.username}
          onChange={(e) => this.setState({ username: e.target.value })}
        />
        <input
          id="new-password"
          type="password"
          className="text-field"
          placeholder="Password"
          value={this.state.password}
          onChange={(e) => this.setState({ password: e.target.value })}
        />
        <button
          type="submit"
          className="submit-btn">Sign in</button>
      </form>
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