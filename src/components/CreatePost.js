import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { create } from "../actions/posts";
import { TextField, Button } from '@mui/material';

class CreatePost extends React.Component {

  static propTypes = {
    create: PropTypes.func,
    user: PropTypes.object
  };

  state = {
    text: ""
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const { text } = this.state;
    const { id, username } = this.props.user;
    const newPost = { username, id, text };
    this.props.create(newPost);
    this.setState({ text: "" });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} className="input-form">
        <TextField
          id="post-text"
          label="Text"
          variant="outlined"
          value={this.state.text}
          onChange={(e) => this.setState({ text: e.target.value })} />
        <Button className="submit-btn"
          type="submit"
          variant="contained"
        >&quot;TWEET&quot;</Button>
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { create })(CreatePost);