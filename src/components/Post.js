import React from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';

class Post extends React.Component {
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