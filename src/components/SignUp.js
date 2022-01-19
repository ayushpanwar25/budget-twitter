import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signup } from "../actions/auth";
import { TextField, Button } from '@mui/material';

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
        <TextField
          id="username"
          label="Username"
          variant="filled"
          value={this.state.username}
          onChange={(e) => this.setState({ username: e.target.value })}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          variant="filled"
          value={this.state.password}
          onChange={(e) => this.setState({ password: e.target.value })}
        />
        <Button
          type="submit"
          variant="contained"
        >SIGN UP</Button>
      </form>
    )
  }
}

SignUp.propTypes = {
  signup: PropTypes.func
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { signup })(SignUp);