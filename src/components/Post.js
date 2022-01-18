import React from 'react';
import PropTypes from 'prop-types';
import './Post.css';

class Post extends React.Component {

  static propTypes = {
    post: PropTypes.object
  }

  render() {
    return (
      <div className="post">
        <div className="post-body-text">
          {this.props.post.text}
        </div>
        <div className="post-footer">
          <div className="post-author">
            {this.props.post.author}
          </div>
          <div className="post-date">
            {this.props.post.posted}
          </div>
        </div>
      </div>
    );
  }
}

export default Post;