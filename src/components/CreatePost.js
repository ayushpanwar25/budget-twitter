import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { create } from "../actions/posts";

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
        <textarea
          placeholder="What's on your mind?"
          className="text-field"
          id="post-text"
          rows='5'
          value={this.state.text}
          onChange={(e) => this.setState({ text: e.target.value })}
        />
        {/*<input
          type="file"
          name="image"
          value="" />*/}
        <button
          type="submit"
          className="submit-btn">&quot;Tweet&quot;</button>
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { create })(CreatePost);