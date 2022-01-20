import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { login } from "../actions/auth";
//import './Login.css';

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
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          value={this.state.username}
          onChange={(e) => this.setState({ username: e.target.value })}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="outlined"
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