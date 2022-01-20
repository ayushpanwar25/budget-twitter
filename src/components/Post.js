import React from 'react';
import { connect } from 'react-redux';
import nl2br from 'react-nl2br';
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
        <div className="post-body-text">
          {nl2br(this.props.post.text)}
        </div>
        <div className="post-footer">
          <div className="post-info">
            {isAuth ? `${this.props.post.author}` : 'Anonymous'},&nbsp;
            <span className="post-date">
              {formatDistanceToNowStrict(new Date(this.props.post.posted), { addSuffix: true })}
            </span>
          </div>
          <div className="post-options">
            {this.props.isAuth && <PostOptions className="showOnHover" post={this.props.post} />}
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