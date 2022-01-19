import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostOptions from './PostOptions';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'
import './Post.css';

class Post extends React.Component {

  static propTypes = {
    post: PropTypes.object,
    isAuth: PropTypes.bool
  }

  render() {
    const { isAuth } = this.props;
    return (
      <div className="post">
        {this.props.isAuth && <PostOptions className="showOnHover" post={this.props.post} />}
        <div className="post-body-text">
          {this.props.post.text}
        </div>
        <hr></hr>
        <div className="post-footer">
          <div className="post-author">
            {isAuth ? `${this.props.post.author}` : 'Anonymous'}
          </div>
          <div className="post-date">
            {formatDistanceToNowStrict(new Date(this.props.post.posted), { addSuffix: true })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Post);